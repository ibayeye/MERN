import express from "express";
import { protectedMiddleware } from "../middleware/authMiddleware.js";
import { createProduct, allProduct, detailProduct, updateProduct, deleteProduct, fileUpload } from "../controllers/productController.js";

const router = express.Router();

// CRUD PRODUCT

// CREATE PRODUCT
// POST api/v1/product
// Middleware owner

router.post('/', createProduct)

// READ PRODUCT
// GET api/v1/product

router.get('/', allProduct)

// DETAIL PRODUCT
// GET api/v1/product/:id

router.get('/:id', detailProduct)

// UPDATE PRODUCT
// PUT api/v1/product/:id
// Middleware owner
router.put('/:id', updateProduct)

// DELETE PRODUCT
// DELETE api/v1/product/:id
// Middleware owner
router.delete('/:id', deleteProduct)

// FILE UPLOAD PRODUCT
// post api/v1/product/file-upload
// Middleware owner
router.post('/file-upload', fileUpload)


export default router;
