import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nama Produk harus diisi!"],
    unique: [true, "Nama sudah digunakan silahkan buat yang lain"],
  },
  price: {
    type: Number,
    required: [true, "Harga Produk harus diisi!"],
  },
  description: {
    type: String,
    required: [true, "Deskripsi Produk harus diisi!"],
  },
  image: {
    type: String,
    default: null,
  },
  category: {
    type: String,
    required: [true, "Kategori Produk harus diisi!"],
    enum: ["sepatu", "kameja", "baju", "celana"],
  },
  stock: {
    type: Number,
    default: 0,
  }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
