import { Card, CardBody } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Heading, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Link } from "react-router-dom";
import { IProduct } from "../interfaces/interface";

const ProductCard = ({ id, attributes }: IProduct) => {
  const { colorMode } = useColorMode();

  return (
    <Card border={"1px solid #a8b5c8"} bg={"none"}>
      <CardBody>
        <Image
          src={attributes?.thumbnail?.data?.attributes?.url}
          alt="Green double couch with wooden legs"
          // borderRadius='50%'
          // width={'200px'}
          // height={'200px'}
          boxSize={"200px"}
          borderRadius={"full"}
          mx={"auto"}
          // objectFit={"cover"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign={"center"} mb={3}>
            {attributes.title}
          </Heading>
          <Text color={"purple.400"} fontSize={"3xl"} textAlign={"center"}>
            {attributes.description}
          </Text>
          <Text color="purple.600" fontSize="3xl" textAlign={"center"}>
            {attributes.price}
          </Text>
          <Button
            as={Link}
            to={`/products/${id}`}
            bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
            color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
            size={"xl"}
            variant="outline"
            border={"none"}
            py={5}
            overflow={"hidden"}
            w={"full"}
            _hover={{
              bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
              color: colorMode === "light" ? "#e6f3fd" : "#9f7aea",
              border: "transparent",
            }}
            mt={6}
          >
            View Details
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
