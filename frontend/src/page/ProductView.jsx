import React from "react";
import customAPI from "../api";
import { useLoaderData } from "react-router-dom";
import Filter from "../components/Filter";
import CardProduct from "../components/CardProduct";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const { data } = await customAPI.get("/product", { params: params });

  console.log(request);
  console.log(params);

  const products = data.data;
  return { products, params };
};
const ProductView = () => {
  const { products } = useLoaderData();
  console.log(products);
  return (
    <>
      <Filter />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {!products.length ? (
          <h1 className="text-3xl font-bold mt-5">Produk tidak ditemukan</h1>
        ) : (
          products.map((item) => <CardProduct key={item._id} item={item} />)
        )}
      </div>
    </>
  );
};

export default ProductView;
