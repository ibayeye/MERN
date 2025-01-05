import React from "react";
import customAPI from "../api";
import { useLoaderData } from "react-router-dom";
import Filter from "../components/Filter";
import CardProduct from "../components/CardProduct";

export const loader = async ({ request }) => {
  const { data } = await customAPI.get("/product");

  console.log(request);

  const products = data.data;
  return { products };
};
const ProductView = () => {
  const { products } = useLoaderData();
  console.log(products);
  return (
    <>
      <Filter />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {products.map((item) => (
          <CardProduct key={item._id} item={item} />
        ))}
      </div>
    </>
  );
};

export default ProductView;
