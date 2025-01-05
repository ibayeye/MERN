import customAPI from "../api";
import CardProduct from "../components/CardProduct";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ request }) => {
  const { data } = await customAPI.get("/product");

  const products = data.data;
  return { products };
};
const HomeView = () => {
  const { products } = useLoaderData();
  return (
    <>
      <div className="border-b border-primary pb-5">
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
