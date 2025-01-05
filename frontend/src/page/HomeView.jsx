import axios from "axios";
import customAPI from "../api";
import { useState, useEffect } from "react";
import CardProduct from "../components/CardProduct";

const HomeView = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await customAPI.get("/product?limit=3");
      setProducts(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="border-b border-primary pb-5" >
        <h2 className="text-2xl font-bold capitalize">List products</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {products.map((item) => (
          <CardProduct key={item._id} item={item} />
        ))}
      </div>
    </>
  );
};

export default HomeView;
