import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultValue = {
    CartItems: [],
    numItemsInCart: 0,
    cartTotal: 0,
    orderTotal: 0
}

const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("cart")) || defaultValue
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: getCartFromLocalStorage(),
    reducers: {
        addItem: (state, action) => {
            const { product } = action.payload;
            const item = state.CartItems.find((i) => i.cartId === product.cartId);
            if (item) {
                item.amount += product.amount;
            } else {
                state.CartItems.push(product);
            }
            state.numItemsInCart += product.amount
            state.cartTotal += product.price * product.amount;
            state.orderTotal = state.cartTotal;

            localStorage.setItem('cart', JSON.stringify(state))

            toast.success("Product berhasil ditambahkan ke keranjang");
        },
        editItem: (state, action) => {
            const { cartId, amount } = action.payload;
            const itemProduct = state.CartItems.find((item) => item.cartId === cartId);

            state.numItemsInCart += amount - itemProduct.amount;
            state.cartTotal += itemProduct.price * (amount - itemProduct.amount);
            itemProduct.amount = amount;
            localStorage.setItem('cart', JSON.stringify(state))
            toast.info("Keranjang berhasil diubah")
        },
        removeItem: (state, action) => {
            const { cartId } = action.payload;
            const itemProduct = state.CartItems.find((item) => item.cartId === cartId);
            state.CartItems = state.CartItems.filter((item) => item.cartId !== cartId);

            state.numItemsInCart -= itemProduct.amount;
            state.cartTotal -= itemProduct.price * itemProduct.amount;

            localStorage.setItem('cart', JSON.stringify(state))
            toast.success("Keranjang berhasil dihapus")
        }
    }
})

export const { addItem, editItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer