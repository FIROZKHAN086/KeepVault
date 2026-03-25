import prisma from "../config/db.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";


//  upload function
const uploadFile = (file, userId) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `documents/${userId}`,
        resource_type: "auto", 
      },
      (error, result) => {
        if (error) {
          console.log("UPLOAD ERROR 👉", error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    //console.log(stream);
    

    // buffer → stream → cloudinary and Url
    streamifier.createReadStream(file.buffer).pipe(stream);
    //console.log(streamifier.createReadStream(file.buffer).pipe(stream));
    
  });
};

//  Upload document controller
export const uploadDocument = async (req, res) => {
  try {
    const file = req.file; 
    const { fileName, fileType, category } = req.body;
    const userId = req.user.id;

    if (!file) {
      return res.status(400).json({ message: "File is required" });
    }

    if (!fileName || !fileType || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //  check user exist
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    //  Upload to Cloudinary
    const uploadResult = await uploadFile(file, userId);

   // console.log(uploadResult);
    

    //  Save in DB
    const document = await prisma.document.create({
      data: {
        fileName,
        fileUrl: uploadResult.secure_url,
        fileType: uploadResult.resource_type,
        category,
        userId,
      },
    });

    res.status(201).json({
      message: "Document uploaded successfully",
      document,
    });

  } catch (error) {
    console.log("FULL ERROR 👉", error);
    res.status(500).json({ error: error.message });
  }
};


//  Get all documents
export const getDocuments = async (req, res) => {
  try {
    const userId = req.user.id;

    const documents = await prisma.document.findMany({
      where: { userId },
    });

    res.status(200).json(documents);
  } catch (error) {
    console.log("FULL ERROR 👉", error);
    res.status(500).json({ error: error.message });
  }
};

// edit document controller
export const editDocument = async (req, res) => {
  try {
    const { id } = req.params;
    // const {firebase_uid} = req.params;
    const { fileName, fileType, category } = req.body;
    
    
    if(!fileName || !fileType || !category){
      return res.status(400).json({ message: "All fields are required" });
    }

    const userId = req.user.id;

    const document = await prisma.document.findUnique({
      where: { id },
    });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (document.userId !== userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedDocument = await prisma.document.update({
      where: { id },
      data: {
        fileName,
        fileType,
        category,
      },
    });

    res.status(200).json({
      message: "Document updated successfully",
      document: updatedDocument,
    });
  } catch (error) {
    console.log("FULL ERROR 👉", error);
    res.status(500).json({ error: error.message });
  }
};


//  Delete document controller
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if(!id){
      return res.status(400).json({ message: "Document ID is required" });
    }
    if(!userId){
      return res.status(400).json({ message: "User ID is required" });
    }

    const document = await prisma.document.findUnique({
      where: { id },
    });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (document.userId !== userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await prisma.document.delete({
      where: { id },
    });

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.log("FULL ERROR 👉", error);
    res.status(500).json({ error: error.message });
  }
};
