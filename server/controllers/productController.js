import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

export const createProduct = asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body)

    return res.status(201).json({
        message: "Berhasil tambah produk",
        data: newProduct
    })
})

export const allProduct = asyncHandler(async (req, res) => {

    const queryObj = { ...req.query }

    const excludeField = ["page", "limit", "name"]
    excludeField.forEach((element) => delete queryObj[element])

    let query
    if (req.query.name) {
        query = Product.find({
            name: { $regex: req.query.name, $options: 'i'}
        })
    } else {
        query = Product.find(queryObj)
    }


    // Pagination
    const page = req.query.page * 1 || 1
    const limitData = req.query.limit * 1 || 10
    const skipData = (page - 1) * limitData

    query = query.skip(skipData).limit(limitData)

    let countProduct = await Product.countDocuments(queryObj)

    if (req.query.page) {
        if (skipData >= countProduct) {
            res.status(404)
            throw new Error("Halaman tidak ditemukan")
        }
    }

    const data = await query
    const totalPage = Math.ceil(countProduct / limitData)

    res.status(200).json({
        message: "Berhasil menampilkan semua produk",
        data,
        pagination: {
            totalPage,
            page,
            totalProduct: countProduct
        }
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
    const stream = cloudinary.uploader.upload_stream({
        folder: 'uploads',
        allowed_formats: ['jpg', 'png', 'jpeg']
    },
    function(err, result){
        if(err){
            console.log(err)
            return res.status(500).json({
                message: 'Gagal upload gambar',
                error: err
            })
        }
        res.json({
            message: 'Berhasil upload gambar',
            url: result.secure_url
        })
    })
    streamifier.createReadStream(req.file.buffer).pipe(stream)
})