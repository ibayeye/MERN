import { generateSelectAmount, priceFormat } from "../utils";
import { FaTrash } from "react-icons/fa6";

const CartListItems = ({ cartItem }) => {
  const { cartId, name, price, image, amount, stock } = cartItem;

//   console.log(stock);
  return (
    <article
      className="mb-12 flex flex-colgap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
      key={cartId}
    >
      <img
        src={image}
        alt={image}
        className="h-24 w-24 rounded-lg sm:w-32 sm:h-32 object-cover"
      />
      <div className="sm:ml-16 sm:w-48">
        <h2 className="capitalize">{name}</h2>
        <span className="font-bold">Jumlah {amount} Product</span>
      </div>
      <p className="font-bold sm:ml-auto">{priceFormat(price)}</p>
      <div className="sm:ml-12">
        <div className="form-control max-w-xs">
          <select
            name="amount"
            className="select select-bordered sm:w-full"
            value={amount}
            onChange={() => console.log("test")}
          >
            {generateSelectAmount(stock)}
          </select>
        </div>
        <button className="mt-2 btn-secondary btn-block btn">
            <FaTrash/>
        </button>
      </div>
    </article>
  );
};

export default CartListItems;
