import React from "react";
import customAPI from "../api";
import { useLoaderData } from "react-router-dom";
import Filter from "../components/Filter";
import CardProduct from "../components/CardProduct";
import Pagination from "../components/Pagination";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const { data } = await customAPI.get("/product", { params: params });

  // console.log(request);
  // console.log(params);

  const products = data.data;
  const pagination = data.pagination;
  return { products, params, pagination };
};
const ProductView = () => {
  const { products, pagination } = useLoaderData();
  // console.log(products);
  return (
    <>
      <Filter />
      <h3 className="text-lg text-primary font-bold text-right my-3">
        Total Produk: {pagination.totalProduct}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {!products.length ? (
          <h1 className="text-3xl font-bold mt-5">Produk tidak ditemukan</h1>
        ) : (
          products.map((item) => <CardProduct key={item._id} item={item} />)
        )}
      </div>
      <div className="mt-5 flex justify-center">
        <Pagination />
      </div>
    </>
  );
};

export default ProductView;
