import prisma from "../config/db.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import { encrypt, decrypt } from "../utils/crypto.js";


//  upload function
const uploadFile = (file, userId) => {
  return new Promise((resolve, reject) => {

    //  Detect file type
    let fileType = "other";

    if (file.mimetype.startsWith("image/")) {
      fileType = "image";
    } else if (file.mimetype.startsWith("video/")) {
      fileType = "video";
    } else if (file.mimetype === "application/pdf") {
      fileType = "pdf";
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `documents/${userId}`,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.log("UPLOAD ERROR ", error);
          reject(error);
        } else {
          resolve({
            ...result,
            fileType, 
          });
        }
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
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


    

    // file encript
      const encriptedFile = await encrypt(uploadResult.secure_url);

      

    

    //  Save in DB
    const document = await prisma.document.create({
      data: {
        fileName,
        fileUrl: encriptedFile,
        fileType: uploadResult.resource_type === 'raw' ? 'PDF' : uploadResult.resource_type,
        category,
        userId,
      },
    });

    res.status(201).json({
      message: "Document uploaded successfully",
      document,
    });

  } catch (error) {
    // console.log("ERROR ", error);
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
    // console.log(" ERROR ", error);
    res.status(500).json({ error: error.message });
  }
};

// get  document by id controller
export const getDocumentById = async (req, res) => {
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

    // file decript
    const decriptedFile = await decrypt(document.fileUrl);

    

    res.status(200).json({
      message: "Document fetched successfully",
      document: {
        ...document,
        fileUrl: decriptedFile,
      },
    });
  } catch (error) {
    // console.log(" ERROR ", error);
    res.status(500).json({ error: error.message });
  }
};

// get document by user_id controller
export const getDocumentByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if(userId !== req.user.id){
      return res.status(401).json({ message: "Unauthorized" });
    }

    if(!userId){
      return res.status(400).json({ message: "User ID is required" });
    }

    const documents = await prisma.document.findMany({
      where: { userId },
    });

    const updatedDocs = documents.map((doc) => ({
      ...doc,
      fileUrl: doc.fileUrl ? decrypt(doc.fileUrl) : null,
    }));

    res.status(200).json(updatedDocs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// edit document controller
export const editDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { fileName, fileType, category } = req.body;
    const file = req.file;
    
    
    
   if (!fileName && !fileType && !category && !file) {
  return res.status(400).json({ message: "No data provided" });
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

    let encriptedFile = document.fileUrl;

    if (file) {
      const uploadResult = await uploadFile(file, userId);
      encriptedFile = await encrypt(uploadResult.secure_url);
    }

    const updatedDocument = await prisma.document.update({
      where: { id },
      data: {
        fileName: fileName || document.fileName,
        fileType: fileType || (file ? (encriptedFile.includes('.pdf') ? 'raw' : 'auto') : document.fileType), // Fallback logic
        category: category || document.category,
        fileUrl: encriptedFile,
      },
    });

    res.status(200).json({
      message: "Document updated successfully",
      document: updatedDocument,
    });
  } catch (error) {
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

    // delete from cloudinary
    await cloudinary.uploader.destroy(document.fileUrl);

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    // console.log(" ERROR ", error);
    res.status(500).json({ error: error.message });
  }
};
