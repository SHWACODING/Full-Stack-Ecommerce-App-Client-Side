import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IItem, addItemToShoppingCart } from "../../utils";
import { IProduct } from "../../interfaces/interface";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

interface ICartSlice {
  cartProducts: IItem[];
}

const initialState: ICartSlice = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.cartProducts = addItemToShoppingCart({
        cartItem: action.payload,
        shoppingCartItems: state.cartProducts,
      });
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartProducts = state.cartProducts.filter(
        ({ id }: IItem) => id !== action.payload
      );
      toast({
        title: "Item Removed From Your Cart",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    },
    clearCart: (state) => {
      state.cartProducts = [];
      toast({
        title: "You Cart Is Empty Now !",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCart = ({ cart }: { cart: ICartSlice }) => cart;
export default cartSlice.reducer;
