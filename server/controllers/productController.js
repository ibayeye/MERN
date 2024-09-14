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

    const queryObj = { ...req.query }

    const excludeField = ["page", "limit"]
    excludeField.forEach((element) => delete queryObj[element])

    let query = Product.find(queryObj)

    // Pagination
    const page = req.query.page * 1 || 1
    const limitData = req.query.limit * 1 || 30
    const skipData = (page - 1) * limitData

    query = query.skip(skipData).limit(limitData)

    if (req.query.page) {
        const numProduct = await Product.countDocuments()
        if (skipData >= numProduct) {
            res.status(404)
            throw new Error("Halaman tidak ditemukan")
        }
    }

    const data = await query

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
    const file = req.file;

    if (!file) {
        res.status(400)
        throw new Error("Tidak ada file yang diupload")
    }

    const imageFileName = file.filename;

    const pathImageFile = `/uploads/${imageFileName}`

    res.status(200).json({
        message: "Image berhasil diupload",
        image: pathImageFile,
    })
})