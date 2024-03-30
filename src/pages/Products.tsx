import { Grid } from "@chakra-ui/layout";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { IProduct } from "../interfaces/interface";
import { useQuery } from "react-query";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const ProductsPage = () => {

  const getProductsList = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/products?populate=thumbnail,category`
    );
    return data;
  };

  const {isLoading, data, error} = useQuery('products', () => getProductsList());

  if (isLoading) return (
        <Grid
          margin={30}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap={6}
        >
          {Array.from({ length: 20 }, (_, idx) => <ProductCardSkeleton key={idx} />)}
        </Grid>
  )

  if (error) return <h1>404.... Page Not Found..?</h1>

  return (
    <Grid
      margin={30}
      templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      gap={6}
    >
      {data.data.map((product: IProduct) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Grid>
  );
};

export default ProductsPage;
