import express from "express";
import { protectedMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import { createProduct, allProduct, detailProduct, updateProduct, deleteProduct, fileUpload } from "../controllers/productController.js";
import { upload } from "../utils/uploadFileHandler.js";

const router = express.Router();

// CRUD PRODUCT

// CREATE PRODUCT
// POST api/v1/product
// Middleware owner

router.post('/', protectedMiddleware, adminMiddleware, createProduct)

// READ PRODUCT
// GET api/v1/product

router.get('/', allProduct)

// DETAIL PRODUCT
// GET api/v1/product/:id

router.get('/:id', detailProduct)

// UPDATE PRODUCT
// PUT api/v1/product/:id
// Middleware owner
router.put('/:id', protectedMiddleware, adminMiddleware, updateProduct)

// DELETE PRODUCT
// DELETE api/v1/product/:id
// Middleware owner
router.delete('/:id', protectedMiddleware, adminMiddleware, deleteProduct)

// FILE UPLOAD PRODUCT
// post api/v1/product/file-upload
// Middleware owner
router.post('/file-upload', protectedMiddleware, adminMiddleware, upload.single('image'), fileUpload)


export default router;
