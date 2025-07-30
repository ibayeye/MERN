import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AboutView from "./page/AboutView";
import CartView from "./page/CartView";
import HomeView from "./page/HomeView";
import OrderView from "./page/OrderView";
import ProductView from "./page/ProductView";
import LoginView from "./page/auth/LoginView";
import RegisterView from "./page/auth/RegisterView";
import PublicLayout from "./layout/PublicLayout";
import DetailProduct from "./page/DetailProduct";
import Checkoutview from "./page/CheckoutView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorView from "./page/ErrorView";
import RequireRole from "./components/RequireRole";
import UserLayout from "./layout/UserLayout";
import AdminLayout from "./layout/AdminLayout";
import ProductAdmin from "./page/admin/ProductAdmin";
import DashboardAdmin from "./page/admin/Dashboard";

import { loader as HomeLoader } from "./page/HomeView";
import { loader as ProductLoader } from "./page/ProductView";
import { loader as CheckoutLoader } from "./page/CheckoutView";
import { loader as OrderLoader } from "./page/OrderView";

import { action as LoginAction } from "./page/auth/LoginView";
import { action as RegisterAction } from "./page/auth/RegisterView";

import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <HomeView />,
        loader: HomeLoader,
      },
      {
        path: "products",
        element: <ProductView />,
        loader: ProductLoader,
      },
      {
        path: "product/:id",
        element: <DetailProduct />,
      },
      // {
      //   path: "orders",
      //   element: <OrderView />,
      //   loader: OrderLoader(store),
      // },
      // {
      //   path: "checkout",
      //   element: <Checkoutview />,
      //   loader: CheckoutLoader(store),
      // },
      {
        path: "cart",
        element: <CartView />,
      },
      {
        path: "about",
        element: <AboutView />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginView />,
    action: LoginAction(store),
  },
  {
    path: "/register",
    element: <RegisterView />,
    action: RegisterAction(store),
  },
  {
    path: "/",
    element: <RequireRole allowedRoles={["user"]} />,
    children: [
      {
        path: "",
        element: <UserLayout />,
        children: [
          {
            path: "checkout",
            element: <Checkoutview />,
            loader: CheckoutLoader(store),
          },
          {
            path: "orders",
            element: <OrderView />,
            loader: OrderLoader(store),
          },
        ],
      },
    ],
  },
  // Protected Admin Routes
  {
    path: "/admin",
    element: <RequireRole allowedRoles={["admin"]} />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <DashboardAdmin />,
          },
          {
            path: "products",
            element: <ProductAdmin />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
