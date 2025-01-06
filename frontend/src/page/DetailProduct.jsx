import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customAPI from "../api";
import { FaPlus } from "react-icons/fa6";
import { generateSelectAmount, priceFormat } from "../utils";

const DetailProduct = () => {
  let { id } = useParams();
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState(1);
  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value))
  }

  const handleCard = () => {
    console.log(amount)
  }
  const productData = async () => {
    const { data } = await customAPI.get(`/product/${id}`);
    setProduct(data.data);
  };

  useEffect(() => {
    productData();
  }, []);
  return (
    <section>
      <div className="card lg:card-side bg-base-300 shadow-xl">
        <figure>
          <img
            src={product.image}
            alt={product.name}
            className="w-[400px] h-[500px] object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title lg:text-6xl">{product.name}</h2>
          <span className="lg:text-3xl mt-3 mb-3 text-accent font-bold">
            {priceFormat(product.price)}
          </span>
          <span className="badge badge-primary rounded-lg text-base p-4">
            {product.category}
          </span>
          <span className="mt-3 justify-end text-lg">
            Stock: {product.stock}
          </span>
          <p className="mt-3 text-lg max-w-md">{product.description}</p>
          <div className="card-actions justify-end mt-3">
            <div className="p-8 flex flex-col gap-y-4">
              <label className="form-control">
                <label className="label">
                  <span className="capitalize label-text">Amount</span>
                </label>
                <select name="amount" className="select select-bordered" onChange={handleAmount}>
                  {generateSelectAmount(product.stock)}
                </select>
              </label>
              <button className="btn btn-primary lg:btn-lg font-bold" onClick={handleCard}>
                <FaPlus /> Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailProduct;
