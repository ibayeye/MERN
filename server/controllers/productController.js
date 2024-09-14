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
    const data = await Product.find();

    res.status(200).json({
        message: "Berhasil menampilkan semua produk",
        data
    })
})

export const detailProduct = asyncHandler(async (req, res) => {
    const paramsId = req.params.id

    const productData = await Product.findById(paramsId);

    if (!productData) {
        res.status(404)
        throw new Error("Produk tidak ditemukan")
    }

    res.status(200).json({
        message: "Detail produk berhasil ditampilkan",
        data: productData
    })
})

export const updateProduct = asyncHandler(async (req, res) => {
    const paramsId = req.params.id

    const updateProduct = await Product.findByIdAndUpdate(paramsId,
        req.body, {
            runValidators: false,
            new: true
        })

        res.status(201).json({
            message: "Update produk berhasil",
            data: updateProduct
        })
})

export const deleteProduct = asyncHandler(async (req, res) => {
    const paramsId = req.params.id
    
    const deleteProduct = await Product.findByIdAndDelete(paramsId)

    // if (!deleteProduct) {
    //     res.status(404)
    //     throw new Error("Produk tidak ditemukan, Delete produk gagal")
    // }

    res.status(200).json({
        message: "Delete produk berhasil",
        data: deleteProduct
    })
})

export const fileUpload = asyncHandler(async (req, res) => {
    res.send("file upload")
})