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
  const [loading, setLoading] = useState(false); // State untuk loading
  const [uploadProgress, setUploadProgress] = useState(""); // State untuk progress message

  const categories = [
    { value: "sepatu", label: "Sepatu" },
    { value: "kameja", label: "Kameja" },
    { value: "baju", label: "Baju" },
    { value: "celana", label: "Celana" },
  ];

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setUploadProgress("Membuat produk...");

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
        setUploadProgress("Mengupload gambar...");

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

        setUploadProgress("Menyimpan gambar...");

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

      setUploadProgress("Selesai!");

      // Reset form
      setName("");
      setPrice("");
      setCategory("");
      setStock("");
      setDescription("");
      setImage(null);
      setPreviewImage(null);

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Gagal tambah produk:", err);
      setUploadProgress("Gagal menambah produk");

      // Reset loading setelah 2 detik jika error
      setTimeout(() => {
        setLoading(false);
        setUploadProgress("");
      }, 2000);
    } finally {
      // Reset loading state
      setTimeout(() => {
        setLoading(false);
        setUploadProgress("");
      }, 1000);
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

  const handleClose = () => {
    if (!loading) {
      // Tidak bisa close saat loading
      onClose();
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
    if (isOpen && !loading) {
      // Reset form hanya jika tidak sedang loading
      setName("");
      setPrice("");
      setCategory("");
      setStock("");
      setDescription("");
      setImage(null);
      setPreviewImage(null);
      setUploadProgress("");
    }
  }, [isOpen, loading]);

  return (
    <Modal isOpen={isOpen}>
      <div className="w-full max-w-3xl p-4 rounded-md shadow-md">
        <h2 className="text-lg font-bold mb-2">Tambah Produk</h2>

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center rounded-md z-10">
            <span className="loading loading-spinner loading-lg text-white"></span>
            <p className="text-white mt-2 font-medium">{uploadProgress}</p>
          </div>
        )}

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
            loading ? "opacity-50" : ""
          }`}
        >
          <div className="flex flex-col gap-3">
            <FormInput
              label={"Nama Produk"}
              type="text"
              placeholder="Nama Produk"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            <FormInput
              label={"Harga Produk"}
              type="number"
              placeholder="Harga Produk"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={loading}
              style={{
                appearance: "textfield",
              }}
            />
            <FormTextarea
              label={"Deskripsi Produk"}
              placeholder="Deskripsi Produk"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-3">
            <FormSelect
              label={"Kategori Produk"}
              name="category"
              list={categories}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
            />
            <FormInput
              label={"Stok Produk"}
              type="number"
              placeholder="Stok Produk"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              disabled={loading}
            />
            <FormInputImage
              label={"Foto Produk"}
              type="file"
              onChange={handleFileChange}
              disabled={loading}
            />

            {previewImage && (
              <div>
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-32 w-full object-contain border rounded"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button className="btn" onClick={handleClose} disabled={loading}>
            Batal
          </button>
          <button
            className={`btn ${loading ? "btn-disabled" : "btn-success"}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Menyimpan...
              </>
            ) : (
              "Simpan"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddProductModal;
