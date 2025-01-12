import asyncHandler from "../middleware/asyncHandler.js"
import Order from "../models/orderModel.js"
import Product from "../models/productModel.js"
import midtransClient from "midtrans-client"
import dotenv from "dotenv"

dotenv.config()

let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction: false,
    serverKey: process.env.SERVER_KEY
});

export const createOrder = asyncHandler(async (req, res) => {

    const { email, firstName, lastName, phone, cartItem } = req.body

    

    if (!cartItem || cartItem.length < 1) {
        res.status(400)
        throw new Error("Keranjang Masih Kosong")
    }

    let orderItem = []
    let orderMidtrans = []
    let total = 0

    for (const cart of cartItem) {
        const productData = await Product.findOne({ _id: cart.product })
        if (!productData) {
            res.status(404)
            throw new Error("id product tidak ditemukan")
        }
        const { name, price, _id } = productData
        const singleProduct = {
            quantity: cart.quantity,
            name,
            price,
            product: _id
        }
        const shortName = name.substring(0, 30)
        const singleProductMidtrans = {
            quantity: cart.quantity,
            name: shortName,
            price,
            id: _id
        }
        orderItem = [...orderItem, singleProduct]
        orderMidtrans = [...orderMidtrans, singleProductMidtrans]

        total += cart.quantity * price
    }

    const order = await Order.create({
        itemsDetails: orderItem,
        total,
        firstName,
        lastName,
        email,
        phone,
        user: req.user.id
    })


    let parameter = {
        "transaction_details": {
            "order_id": order._id,
            "gross_amount": total
        },
        "item_details": orderMidtrans,
        "customer_details": {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "phone": phone,
        }
    }


    const token = await snap.createTransaction(parameter)


    return res.status(201).json({
        order,
        total,
        message: "Berhasil order produk",
        token
    })
})

export const allOrder = asyncHandler(async (req, res) => {

    const orders = await Order.find()

    return res.status(200).json({
        data: orders,
        message: "Berhasil menampilkan semua order produk",
    })
})

export const detailOrder = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id)

    return res.status(200).json({
        data: order,
        message: "Berhasil menampilkan detail order produk",
    })
})

export const currentOrder = asyncHandler(async (req, res) => {

    const orders = await Order.find({ 'user': req.user.id })

    return res.status(200).json({
        data: orders,
        message: "Berhasil menampilkan current order produk",
    })
})

export const callbackPayment = asyncHandler(async (req, res) => {
    try {
        // Log request untuk debugging
        console.log('Callback payload:', JSON.stringify(req.body, null, 2));

        // Validasi request body
        if (!req.body) {
            console.error('Empty request body');
            return res.status(200).json({
                status: 'error',
                message: 'Empty request body'
            });
        }

        // Proses notifikasi Midtrans
        let statusResponse;
        try {
            statusResponse = await snap.transaction.notification(req.body);
            console.log('Midtrans response:', statusResponse);
        } catch (midtransError) {
            console.error('Midtrans notification error:', midtransError);
            return res.status(200).json({
                status: 'error',
                message: 'Failed to process Midtrans notification'
            });
        }

        const orderId = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status;
        const fraudStatus = statusResponse.fraud_status;

        console.log(`Processing order ${orderId} with status: ${transactionStatus}, fraud: ${fraudStatus}`);

        // Cari order di database
        let orderData;
        try {
            orderData = await Order.findById(orderId);
            if (!orderData) {
                console.error(`Order not found: ${orderId}`);
                return res.status(200).json({
                    status: 'error',
                    message: 'Order not found'
                });
            }
        } catch (dbError) {
            console.error('Database error:', dbError);
            return res.status(200).json({
                status: 'error',
                message: 'Database error'
            });
        }

        try {
            if (transactionStatus === 'capture' || transactionStatus === 'settlement') {
                if (fraudStatus === 'accept') {
                    const orderProduct = orderData.itemsDetails;

                    // Update stok produk
                    for (const itemProduct of orderProduct) {
                        const productData = await Product.findById(itemProduct.product);
                        if (!productData) {
                            console.error(`Product not found: ${itemProduct.product}`);
                            return res.status(200).json({
                                status: 'error',
                                message: `Product not found: ${itemProduct.product}`
                            });
                        }

                        productData.stock -= itemProduct.quantity;
                        await productData.save();
                        console.log(`Updated stock for product ${itemProduct.product}`);
                    }

                    orderData.status = "success";
                }
            } else if (['cancel', 'deny', 'expire'].includes(transactionStatus)) {
                orderData.status = "failed";
            } else if (transactionStatus === 'pending') {
                orderData.status = "pending";
            }

            // Simpan perubahan status order
            await orderData.save();
            console.log(`Order ${orderId} status updated to ${orderData.status}`);

            return res.status(200).json({
                status: 'success',
                message: 'Payment notification processed successfully',
                orderStatus: orderData.status
            });

        } catch (processError) {
            console.error('Error processing order:', processError);
            return res.status(200).json({
                status: 'error',
                message: 'Error processing order'
            });
        }

    } catch (error) {
        console.error('Uncaught error:', error);
        return res.status(200).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
});