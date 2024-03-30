import { Box, Button, Card, CardBody, Divider, Flex, Heading, Image, Stack, Text, useColorMode } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom"
import ProductDetialsSkeleton from "../components/ProductDetialsSkeleton";
import { BsArrowLeft } from "react-icons/bs";
import imgFallBack from "../assets/9.jpeg"
import { useDispatch } from "react-redux";
import { addToCart } from "../app/features/cartSlice";


const ProductPage = () => {

  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const getProductList = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products/${id}?populate=thumbnail,categories&select=title,price,description`
    );
    return data;
  };

  const { isLoading, data } = useQuery(["products", id], getProductList);
  const goBack = () => navigate(-1);

  useEffect (() => {
    document.title = `Product ${data?.data?.attributes?.title} Page`;
  }, [data?.data?.attributes?.title]);

  if (isLoading) return (
    <Box maxW="sm" mx={"auto"} my={20}>
      <ProductDetialsSkeleton />
    </Box>
  );

  const addToCartHandler = () => {
    dispatch(addToCart(data.data));
  }

  return (
    <>
      <Flex
        alignItems={"center"}
        maxW="sm"
        mx={"auto"}
        my={7}
        fontSize={"lg"}
        cursor={"pointer"}
        onClick={goBack}
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg:"#383838",
        }}
      >
        <BsArrowLeft />
        <Text ml={2}>Back</Text>
      </Flex>
      <Card maxW="sm" mx={"auto"} mb={20} border={"1px solid #a8b5c8"} bg={"none"}>
        <CardBody>
          <Image 
            src={`${import.meta.env.VITE_SERVER_URL}${data?.data?.attributes?.thumbnail?.data?.attributes?.url}`}
            alt={data?.data?.attributes?.title}
            borderRadius={"lg"}
            h={"200px"}
            w={"full"}
            fallbackSrc={imgFallBack}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" textAlign={"center"} mb={3}>
              {data?.data?.attributes?.title}
            </Heading>
            <Text textAlign={"center"}>
              {data?.data?.attributes?.description}
            </Text>
            <Text color={"blue.200"} fontSize={"2xl"} textAlign={"center"}>
              {data?.data?.attributes?.category?.data?.attributes?.title}
            </Text>
            <Text color="purple.600" fontSize="3xl" textAlign={"center"} >
              {data?.data?.attributes?.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <Button
          variant="solid"
          colorScheme="purple"
          w={"full"}
          size={"lg"}
          my={5}
          bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
          color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
          p={8}
          textTransform={"uppercase"}
          onClick={addToCartHandler}
          _hover={{
            bg: colorMode !== "light"? "#e6f3fd" : "#9f7aea",
            color: colorMode === "light"? "#e6f3fd" : "#9f7aea",
            border: 'transparent',
          }}
        >
            Add To Card
          </Button>
      </Card>
    </>
  )
}

export default ProductPage
