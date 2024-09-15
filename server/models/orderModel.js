import mongoose from "mongoose";

const { Schema } = mongoose;

const singleProduct = Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
})

const orderSchema = new Schema({
    total: {
        type: Number,
        required: [true, "Total harus diisi!"],
    },
    itemsDetails: [singleProduct],
    user: {
        type: String,
        ref: "User",
        required: [true, "User harus diisi!"],
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
    },
    firstName: {
        type: String,
        required: [true, "Nama Depan harus diisi!"],
    },
    lastName: {
        type: String,
        required: [true, "Belakang harus diisi!"],
    },
    phone: {
        type: String,
        required: [true, "Nomor Telepon harus diisi!"],
    },
    email: {
        type: String,
        required: [true, "Email harus diisi!"],
    },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
