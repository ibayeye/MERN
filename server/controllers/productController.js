import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js"

export const createProduct = asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body)

    return res.status(201).json({
        message: "Berhasil tambah produk",
        data: newProduct
    })
})

export const allProduct = asyncHandler(async (req, res) => {
    res.send("all product")
})

export const detailProduct = asyncHandler(async (req, res) => {
    res.send("detail product")
})

export const updateProduct = asyncHandler(async (req, res) => {
    res.send("update product")
})

export const deleteProduct = asyncHandler(async (req, res) => {
    res.send("delete product")
})

export const fileUpload = asyncHandler(async (req, res) => {
    res.send("file upload")
})