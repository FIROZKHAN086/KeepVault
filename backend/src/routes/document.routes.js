import express from "express";
import { uploadDocument, getDocuments, editDocument, deleteDocument } from "../controllers/document.controller.js";
import multer from "multer";
import  {authMiddleware}  from "../middleware/auth.middleware.js";


const router = express.Router();



//  (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });


// creat new document
router.post("/upload",authMiddleware, upload.single("file"), uploadDocument);

// get all documents
router.get("/get",authMiddleware, getDocuments);

// edit document
router.put("/edit/:id",authMiddleware,upload.single("file"), editDocument);

// delete document
router.delete("/delete/:id",authMiddleware, deleteDocument);

export default router;