import customAPI from "../api";
import CardProduct from "../components/CardProduct";
import { useLoaderData } from "react-router-dom";
import Hero from "../components/Hero";
import { useSelector } from "react-redux";
import Admin from "./admin/Dashboard";

export const loader = async ({ request }) => {
  const { data } = await customAPI.get("/product?limit=3");

  const products = data.data;
  return { products };
};
const HomeView = () => {
  const { products } = useLoaderData();
  const user = useSelector((state) => state.userState.user);
  return (
    <>
      <div>
        <Hero />
      </div>
      <div className="border-b border-primary pb-5 mt-5">
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
