import asyncHandler from "../middleware/asyncHandler.js"

export const createOrder = asyncHandler(async (req, res) => {

    return res.status(201).json({
        message: "Berhasil order produk",
    })
})

export const allOrder = asyncHandler(async (req, res) => {

    return res.status(200).json({
        message: "Berhasil menampilkan semua order produk",
    })
})

export const detailOrder = asyncHandler(async (req, res) => {

    return res.status(200).json({
        message: "Berhasil menampilkan detail order produk",
    })
})

export const currentOrder = asyncHandler(async (req, res) => {

    return res.status(200).json({
        message: "Berhasil menampilkan current order produk",
    })
})