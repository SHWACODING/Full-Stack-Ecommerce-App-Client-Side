import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onCloseCartDrawerAction,
  selectGlobal,
} from "../app/features/globalSlice";
import CartDrawerItem from "./CartDrawerItem";
import { clearCart, selectCart } from "../app/features/cartSlice";
import { IProduct } from "../interfaces/interface";
import { IItem } from "../utils";

const CartDrawer = () => {
  const dispatch = useDispatch();

  const btnRef = useRef(null);

  const { isOpenCartDrawer } = useSelector(selectGlobal);
  const { cartProducts } = useSelector(selectCart);

  const onCloseCartDrawerHandler = () => dispatch(onCloseCartDrawerAction());

  return (
    <>
      <Drawer
        isOpen={isOpenCartDrawer}
        placement="right"
        onClose={onCloseCartDrawerHandler}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Shopping Cart</DrawerHeader>

          <Divider />

          <DrawerBody>
            {cartProducts.length ? (
              cartProducts.map((product: IItem) => (
                <CartDrawerItem key={product.id} {...(product as IProduct)} />
              ))
            ) : (
              <Text
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                mt={"50%"}
                fontSize={"xx-large"}
                color={"red.500"}
              >
                Your Cart Is Empty
              </Text>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              colorScheme="red"
              mr={3}
              onClick={() => dispatch(clearCart())}
            >
              Clear All
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
