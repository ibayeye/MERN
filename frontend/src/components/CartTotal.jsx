import { useSelector } from "react-redux";
import { priceFormat } from "../utils";

const CartTotal = () => {
    const { cartTotal } = useSelector((state) => state.cartState);
  return (
    <div className="card bg-base-300">
        <div className="card-body">
            <p className="flex justify-between text-sm">
                <span>Total Belanja</span>
                <span className="font-bold">{priceFormat(cartTotal)}</span>
            </p>
        </div>
      
    </div>
  )
}

export default CartTotal
