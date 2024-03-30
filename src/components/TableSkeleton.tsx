import { Box, Flex, Skeleton, Stack } from "@chakra-ui/react"



const TableSkeleton = () => {
  return (
    <Stack maxW="80%" mx="auto" my={10}>
      {Array.from(
        {
          length: 10,
        },
        (_, idx) => (
          <Flex
            key={idx}
            alignItems={"center"}
            justifyContent={"center"}
            border={"1px solid #333"}
            h={"50px"}
            rounded={"md"}
            p={2}
          >
            <Skeleton h="9px" w={"120px"} bg={"gray"} mr={7} />
            <Skeleton h="9px" w={"120px"} bg={"gray"} mr={7} />
            <Skeleton h="9px" w={"120px"} bg={"gray"} mr={7} />
            <Skeleton h="9px" w={"120px"} bg={"gray"} mr={7} />
            <Skeleton h="9px" w={"120px"} bg={"gray"} mr={7} />
            <Skeleton h="9px" w={"120px"} bg={"gray"} mr={7} />
            <Flex>
              <Skeleton h="30px" w={"50px"} startColor="purple.300" endColor="purple.500" mr={"4px"} />
              <Skeleton h="30px" w={"50px"} startColor="red.300" endColor="red.500" mr={"4px"} />
              <Skeleton h="30px" w={"50px"} startColor="blue.300" endColor="blue.500" />
            </Flex>
          </Flex>
        )
      )}
      <Box>
        <Skeleton h="15px" w={"250px"} bg={"gray"} mx={"auto"} />
      </Box>
    </Stack>
  )
}

export default TableSkeleton
