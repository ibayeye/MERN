import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { priceFormat } from "../utils";
import customAPI from "../api";

export const loader = (storage) => async () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Login untuk mengakses halaman ini!");
    return redirect("/login");
  }
  const { data } = await customAPI.get("/order/current/user");
  const orders = data?.data;
  console.log(orders);

  return { orders };
};
const OrderView = () => {
  const { orders } = useLoaderData();
  if (!orders.length) {
   return (
    <h1 className="text-center text-3xl font-bold mt-5">Order tidak ditemukan</h1>
   )
  }
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <td>No</td>
            <td>Order By</td>
            <td>Product</td>
            <td>Total</td>
            <td>Status Pembayaran</td>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => (
            <tr key={item._id} className="hover">
              <th>{index + 1}</th>
              <td>
                {item.firstName} {item.lastName}
              </td>
              <td>
                <ul className="list-desc">
                  {item.itemsDetails.map((itemProduct) => (
                    <li key={itemProduct.product}>
                      {itemProduct.name} <br />
                      <span className="font-bold">
                        Jumlah {itemProduct.quantity} Product
                      </span>{" "}
                      <br />
                      {priceFormat(itemProduct.price)}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{priceFormat(item.total)}</td>
              <td>
                {item.status === "pending" ? (
                  <span className="btn btn-info">Pending</span>
                ) : item.status === "success" ? (
                  <span className="btn btn-success">Success</span>
                ) : (
                  <span className="btn btn-error">Failed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderView;
