import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AboutView from './page/AboutView'
import CartView from './page/CartView'
import HomeView from './page/HomeView'
import OrderView from './page/OrderView'
import ProductView from './page/ProductView'
import LoginView from './page/auth/LoginView'
import RegisterView from './page/auth/RegisterView'
import PublicLayout from "./layout/PublicLayout";
import DetailProduct from "./page/DetailProduct";
import Checkoutview from "./page/CheckoutView";

import { loader as HomeLoader } from "./page/HomeView"
import { loader as ProductLoader } from "./page/ProductView"

import { action as LoginAction } from "./page/auth/LoginView"
import { action as RegisterAction } from "./page/auth/RegisterView"

import { store } from "./store";

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout/>,
    children: [
      {
        index: true,
        element: <HomeView/>,
        loader: HomeLoader,
      },
      {
        path: "products",
        element: <ProductView/>,
        loader: ProductLoader,
      },
      {
        path: "product/:id",
        element: <DetailProduct/>
      },
      {
        path: "orders",
        element: <OrderView/>
      },
      {
        path: "checkout",
        element: <Checkoutview/>
      },
      {
        path: "cart",
        element: <CartView/>
      },
      {
        path: "about",
        element: <AboutView/>
      },
    ],
  },
  {
    path: "/login",
    element: <LoginView/>,
    action: LoginAction(store),
  },
  {
    path: "/register",
    element: <RegisterView/>,
    action: RegisterAction(store),
  }
])


function App() {
  return <RouterProvider router={router}/>
}

export default App;
