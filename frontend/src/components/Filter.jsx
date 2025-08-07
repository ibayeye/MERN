import React from "react";
import { Form, Link } from "react-router-dom";
import FormInput from "./Form/FormInput";
import FormSelect from "./Form/FormSelect";
import { useLoaderData } from "react-router-dom";

const Filter = () => {
  const { params } = useLoaderData();
  const { name, category } = params;
  const categories = [
    { value: "sepatu", label: "Sepatu" },
    { value: "kameja", label: "Kameja" },
    { value: "baju", label: "Baju" },
    { value: "celana", label: "Celana" },
  ];
  return (
    <Form
      method="GET"
      className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-3 grid-cols-2 items-center"
    >
      <FormInput
        label="Search Product"
        type="search"
        name="name"
        // value={name}
        defaultValue={name}
      />
      <FormSelect
        label="select category"
        name="category"
        list={categories}
        defaultValue={category}
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
      <Link to="/products" className="btn btn-accent">
        Reset
      </Link>
    </Form>
  );
};

export default Filter;
