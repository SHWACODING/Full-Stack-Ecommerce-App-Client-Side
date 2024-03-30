import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export interface ICartItem {
  cartItem: IItem;
  shoppingCartItems: IItem[];
}

export interface IItem {
  id?: number;
  quantity?: number | undefined;
}

export const addItemToShoppingCart = ({
  cartItem,
  shoppingCartItems,
}: ICartItem) => {
  // ** IF Product Exist => Increse Quantity
  const existsItem = shoppingCartItems.find(
    (item: IItem) => item.id === cartItem.id
  );
  if (existsItem) {
    toast({
      title: "Added To You Cart",
      description: "This Item Already Exists, The quantity will be Increased",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    return shoppingCartItems.map((item: IItem) =>
      item.id === cartItem.id
        ? { ...item, quantity: (item.quantity ?? 0) + 1 }
        : item
    );
  }

  toast({
    title: "Added To You Cart",
    status: "success",
    duration: 2000,
    isClosable: true,
  });

  return [...shoppingCartItems, { ...cartItem, quantity: cartItem.quantity }];
};
