import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import customAPI from "../../api";
import FormInput from "../Form/FormInput";
import FormTextarea from "../Form/FormTextarea";
import FormInputImage from "../Form/FormInputImage";
import FormSelect from "../Form/FormSelect";

const EditProductModal = ({ isOpen, onClose, onSuccess, productId }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const categories = [
    { value: "sepatu", label: "Sepatu" },
    { value: "kameja", label: "Kameja" },
    { value: "baju", label: "Baju" },
    { value: "celana", label: "Celana" },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      if (isOpen && productId) {
        setLoading(true);
        try {
          const { data } = await customAPI.get(`/product/${productId}`);
          const product = data.data;

          setName(product.name || "");
          setPrice(product.price || "");
          setCategory(product.category || "");
          setStock(product.stock || "");
          setDescription(product.description || "");
          setCurrentImageUrl(product.image || "");
          setLoading(false);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [isOpen, productId]);

  const handleSubmit = async () => {
    if (!productId) return;

    try {
      setLoading(true);
      const res = await customAPI.put(
        `/product/${productId}`,
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
    if (!isOpen) {
      setName("");
      setPrice("");
      setCategory("");
      setStock("");
      setDescription("");
      setImage(null);
      setPreviewImage(null);
      setCurrentImageUrl("");
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen}>
      <div className="w-full max-w-3xl p-4 rounded-md shadow-md">
        <h2 className="text-lg font-bold mb-2">Edit Produk</h2>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
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

              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-32 w-full object-contain"
                />
              ) : currentImageUrl ? (
                <img
                  src={currentImageUrl}
                  alt="Preview"
                  className="h-32 w-full object-contain"
                />
              ) : null}

              {/* {currentImageUrl && (
                <img
                  src={currentImageUrl}
                  alt="Preview"
                  className="h-32 w-full object-contain"
                />
              )} */}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button className="btn" onClick={onClose} disabled={loading}>
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

export default EditProductModal;
