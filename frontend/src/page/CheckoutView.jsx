import React, { useEffect } from "react";
import CartTotal from "../components/CartTotal";
import FormInput from "../components/Form/FormInput";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import customAPI from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cartSlice";

const insertSnapScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_CLIENT_MIDTRANS
    );
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};
const CheckoutView = () => {
  const user = useSelector((state) => state.userState.user);
  const carts = useSelector((state) => state.cartState.CartItems);
  const navigate = useNavigate();
  const dispacth = useDispatch();

  useEffect(() => {
    insertSnapScript();
  }, []);

  const handleCheckout = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData);

    const newArrayKeranjang = carts.map((item) => {
      return {
        product: item.productId,
        quantity: item.amount,
      };
    });

    try {
      const response = await customAPI.post("/order", {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        cartItem: newArrayKeranjang,
      });

      const snapToken = response.data.token;

      window.snap.pay(snapToken.token, {
        // Optional
        onSuccess: function (result) {
          console.log(result);
          dispacth(clearCart());
          navigate("/orders");
        },
        // Optional
        onPending: function (result) {
          console.log(result);
          alert("wating your payment!");
        },
        // Optional
        onError: function (result) {
          console.log(result);
          alert("Payment failed!");
        },
      });
      toast.success("Checkout Berhasil");
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };
  // console.log(user, carts);
  return (
    <>
      <div className="border-b border-primary pb-5 mt-5">
        <h2 className="text-2xl font-bold capitalize">Checkout</h2>
      </div>
      <div className="mt-8 grid gap-y-8 gap-x-2 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <form
            method="POST"
            className="bg-base-200 rounded-xl grid grid-y-5 p-5 items-center"
            onSubmit={handleCheckout}
          >
            <div className="grid grid-cols-2 gap-x-4">
              <FormInput label="first name" type="name" name="firstName" />
              <FormInput label="last name" type="name" name="lastName" />
            </div>
            <FormInput
              label="email"
              type="email"
              name="email"
              defaultValue={user.email}
            />
            <FormInput label="phone" type="name" name="phone" />
            <button className="btn btn-primary mt-8">Bayar</button>
          </form>
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotal />
        </div>
      </div>
    </>
  );
};

export default CheckoutView;
