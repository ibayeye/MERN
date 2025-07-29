import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const Hero = () => {
  const { products } = useLoaderData();
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            Selamat Datang di MERN Shop
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime modi
            sequi ducimus. Veritatis blanditiis reiciendis eos culpa alias.
            Ratione, ad?
          </p>
          <div className="mt-10">
            <Link to={"/products"} className="btn btn-primary text-lg">
              Lihat lebih banyak
            </Link>
          </div>
        </div>
        <div>
          <div className="hidden lg:carousel w-full max-w-xl space-x-4 rounded-box h-[350px]">
            {products.map((item, index) => (
              <div
                id={`item${index}`}
                className="carousel-item w-full"
                key={item._id}
              >
                <img src={item.image} className="w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="hidden lg:flex justify-center w-full py-2 gap-2">
            {products.map((_, index) => (
              <a href={`#item${index}`} key={index} className="btn btn-xs">
                {index + 1}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
