import asyncHandler from "../middleware/asyncHandler.js"

export const createProduct = asyncHandler(async (req, res) => {
    res.send("create product")
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