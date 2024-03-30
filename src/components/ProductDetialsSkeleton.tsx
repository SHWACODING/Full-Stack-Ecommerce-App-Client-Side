import { Box, Skeleton, SkeletonText } from "@chakra-ui/react"



const ProductDetialsSkeleton = () => {
  return (
    <Box bg={"gray.700"} p={5} rounded={'lg'}>
      <Skeleton height="200px" />
      <SkeletonText mt="4" noOfLines={1} spacing='4' mx={'auto'} maxW={'200px'} />
      <SkeletonText mt="4" noOfLines={3} spacing='4'  />
      <SkeletonText mt="4" noOfLines={1} spacing='4' mx={'auto'} maxW={'120px'} />
      <Skeleton mt="4" noOfLines={1} maxW={'120px'} rounded={"lg"} />
    </Box>
  )
}

export default ProductDetialsSkeleton
