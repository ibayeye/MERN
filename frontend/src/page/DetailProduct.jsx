import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customAPI from "../api";
import { FaPlus } from "react-icons/fa6";
import { generateSelectAmount, priceFormat } from "../utils";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice";

const DetailProduct = () => {
  let { id } = useParams();
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState(1);

  const dispatch = useDispatch();

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const productCart = {
    cartId: product._id + product.name,
    productId: product._id,
    image: product.image,
    name: product.name,
    price: product.price,
    stock: product.stock,
    amount,
  };

  const handleCart = () => {
    dispatch(addItem({ product: productCart }));
  };

  const productData = async () => {
    try {
      const { data } = await customAPI.get(`/product/${id}`);
      setProduct(data.data);

      // Reset amount jika stock berubah
      if (data.data.stock === 0) {
        setAmount(0);
      } else if (amount > data.data.stock) {
        setAmount(1);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    productData();
  }, []);

  // Cek apakah product sudah di-load
  if (!product) {
    return (
      <section className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </section>
    );
  }

  const isOutOfStock = product.stock === 0;

  return (
    <section>
      <div className="card lg:card-side bg-base-300 shadow-xl">
        <figure className="lg:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title lg:text-5xl">{product.name}</h2>
          <span className="lg:text-3xl mt-3 mb-3 text-accent font-bold">
            {priceFormat(product.price)}
          </span>
          <span className="badge badge-primary rounded-lg text-base p-4 capitalize">
            {product.category}
          </span>
          <span
            className={`mt-3 justify-end text-lg ${
              isOutOfStock ? "text-error font-semibold" : ""
            }`}
          >
            Stock: {product.stock} {isOutOfStock && "(Habis)"}
          </span>
          <p className="mt-3 text-lg max-w-md">{product.description}</p>
          <div className="card-actions justify-end mt-3">
            <div className=" flex flex-col gap-y-4">
              <label className="form-control">
                <label className="label">
                  <span className="capitalize label-text">Amount</span>
                </label>
                <select
                  name="amount"
                  className="select select-bordered"
                  onChange={handleAmount}
                  value={amount}
                  disabled={isOutOfStock}
                >
                  {isOutOfStock ? (
                    <option value={0}>Stok Habis</option>
                  ) : (
                    generateSelectAmount(product.stock)
                  )}
                </select>
              </label>
              <button
                className={`btn lg:btn-lg font-bold ${
                  isOutOfStock
                    ? "btn-disabled bg-gray-400 text-gray-600"
                    : "btn-primary"
                }`}
                onClick={handleCart}
                disabled={isOutOfStock}
              >
                <FaPlus />
                {isOutOfStock ? "Stok Habis" : "Keranjang"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailProduct;
