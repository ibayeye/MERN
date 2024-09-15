import express from "express";
import { createOrder, allOrder, detailOrder, currentOrder } from "../controllers/orderController.js";
import { protectedMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// hanya bisa diakses oleh user biasa
router.post('/', protectedMiddleware, createOrder)

// hanya bisa diakses oleh admin
router.get('/', protectedMiddleware, adminMiddleware, allOrder)

// hanya bisa diakses oleh admin
router.get('/:id', protectedMiddleware, adminMiddleware, detailOrder)

// hanya bisa diakses oleh user biasa
router.get('/current/user', protectedMiddleware, currentOrder)

export default router;
