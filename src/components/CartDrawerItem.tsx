import { Button, Divider, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { IProduct } from "../interfaces/interface";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../app/features/cartSlice";

const CartDrawerItem = ({
  id,
  attributes: {
    thumbnail: {
      data: {
        attributes: {
          formats: {
            small: { url },
          },
        },
      },
    },
    title,
    price,
  },
  quantity,
}: IProduct) => {
  const dispatch = useDispatch();

  return (
    <>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={3}
        py={2}
      >
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${url}`}
          alt={title}
          w={"80px"}
          h={"80px"}
          rounded={"full"}
          objectFit={"cover"}
          mr={5}
        />
        <Stack>
          <Text fontSize={"sm"}>{title}</Text>
          <Text fontSize={"sm"}>Price: $ {price}</Text>
          <Text fontSize={"sm"}>Quantity: {quantity}</Text>
        </Stack>
        <Stack>
          <Button
            leftIcon={<BsTrash />}
            variant="outline"
            colorScheme="red"
            size="xs"
            w="full"
            onClick={() => dispatch(removeFromCart(id))}
          >
            Remove
          </Button>
        </Stack>
      </Flex>
      <Divider />
    </>
  );
};

export default CartDrawerItem;
