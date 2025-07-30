import React from "react";
import FormAuth from "../../components/FormAuth";
import customAPI from "../../api";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { loginUsers } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
export const action =
  (store) =>
  async ({ request }) => {
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);

    try {
      const response = await customAPI.post("/auth/login", data);
      store.dispatch(loginUsers(response.data));
      if (response.data.data.role === "admin") {
        return redirect("/admin");
      } else {
        return redirect("/");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
      return null;
    }
  };

const LoginView = () => {
  return (
    <main>
      <FormAuth />
    </main>
  );
};

export default LoginView;
