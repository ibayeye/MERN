import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customAPI from "../api";
import { FaPlus } from "react-icons/fa6";

const DetailProduct = () => {
  let { id } = useParams();
  const [product, setProduct] = useState("");
  const productData = async () => {
    const { data } = await customAPI.get(`/product/${id}`);
    setProduct(data.data);
  };
  const priceFormat = (price) => {
    const rupiahFormat = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
    return rupiahFormat;
  };

  useEffect(() => {
    productData();
  }, []);
  return (
    <section>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src={product.image}
            alt={product.name}
            className="w-[400px] h-[500px] object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">New movie is released!</h2>
          <span className="text-3xl mt-3 text-accent font-bold">{priceFormat(product.price)}</span>
          <span className="badge badge-primary">{product.category}</span>
          <span className="mt-3 justify-end">{product.stock}</span>
          <p className="mt-3">{product.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary btn-lg">
              <FaPlus /> Keranjang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailProduct;
