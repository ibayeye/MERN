import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import customAPI from "../../api";
import FormInput from "../Form/FormInput";
import FormTextarea from "../Form/FormTextarea";
import FormInputImage from "../Form/FormInputImage";
import FormSelect from "../Form/FormSelect";

const AddProductModal = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const categories = [
    { value: "sepatu", label: "Sepatu" },
    { value: "kameja", label: "Kameja" },
    { value: "baju", label: "Baju" },
    { value: "celana", label: "Celana" },
  ];

  const handleSubmit = async () => {
    try {
      const res = await customAPI.post(
        "/product",
        {
          name,
          price,
          category,
          stock,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newProduct = res.data.data;
      const productId = newProduct._id;

      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const uploadRes = await customAPI.post(
          "/product/file-upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const imageUrl = uploadRes.data.url;
        console.log(uploadRes);

        await customAPI.put(
          `/product/${productId}`,
          { image: imageUrl },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Gagal tambah produk:", err);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
      setPreviewImage(null);
    }
  };

  useEffect(() => {
    if (!image) {
      setPreviewImage(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreviewImage(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setPrice("");
      setCategory("");
      setStock("");
      setDescription("");
      setImage(null);
      setPreviewImage(null);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen}>
      <div className="w-full max-w-3xl p-4 rounded-md shadow-md">
        <h2 className="text-lg font-bold mb-2">Tambah Produk</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <FormInput
              label={"Nama Produk"}
              type="text"
              placeholder="Nama Produk"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormInput
              label={"Harga Produk"}
              type="number"
              placeholder="Harga Produk"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{
                appearance: "textfield",
              }}
            />
            <FormTextarea
              label={"Deskripsi Produk"}
              placeholder="Deskripsi Produk"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <FormSelect
              label={"Kategori Produk"}
              name="category"
              list={categories}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <FormInput
              label={"Stok Produk"}
              type="number"
              placeholder="Stok Produk"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <FormInputImage
              label={"Foto Produk"}
              type="file"
              onChange={handleFileChange}
            />

            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="h-32 w-full object-contain"
              />
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button className="btn" onClick={onClose}>
            Batal
          </button>
          <button className="btn btn-success" onClick={handleSubmit}>
            Simpan
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddProductModal;
