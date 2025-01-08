import { useSelector } from "react-redux"
import CartListItems from "./CartListItems"

const CartList = () => {
    const carts = useSelector((state)=> state.cartState.CartItems)
  return (
    <div>
      {carts.map((item)=> {
        return <CartListItems cartItem={item} key={item.cartId}/>
      })}
    </div>
  )
}

export default CartList
