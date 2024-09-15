import asyncHandler from "../middleware/asyncHandler.js"
import Order from "../models/orderModel.js"
import Product from "../models/productModel.js"

export const createOrder = asyncHandler(async (req, res) => {

    const {email, firstName, lastName, phone, cartItem} = req.body

    if(!cartItem || cartItem.length < 0) {
        res.status(400)
        throw new Error ("Keranjang Masih Kosong")
    }

    let orderItem = []
    let total = 0

    for(const cart of cartItem){
        const productData = await Product.findOne({ _id: cart.product })
        if (!productData) {
            res.status(404)
            throw new Error ("id product tidak ditemukan")
        }
        const { name, price, _id } = productData
        const singleProduct = {
            quantity: cart.quantity,
            name,
            price,
            product: _id
        }
        orderItem = [...orderItem, singleProduct]

        total += cart.quantity * price
    }

    const order = await Order.create({
        itemsDetails: orderItem,
        total,
        firstName,
        lastName,
        email,
        phone,
        user : req.user.id
    })


    return res.status(201).json({
        order,
        total,
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