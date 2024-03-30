import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import TableSkeleton from "./TableSkeleton";
import {
  useCreateDashboardProductMutation,
  useDeleteDashboardProductsMutation,
  useGetDashboardProductsQuery,
  useUpdateDashboardProductsMutation,
} from "../app/services/products";
import { IProduct } from "../interfaces/interface";
import { AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import CustomAlertDialog from "../shared/AlertDialog";
import { useEffect, useState } from "react";
import CustomModel from "../shared/Model";
import { useSelector } from "react-redux";
import { selectNetwork } from "../app/features/networkSlice";

interface IMyProduct {
  id: number | null;
  attributes: {
    title: string | undefined;
    description: string | undefined;
    price: number | undefined;
    stock: number | undefined;
  };
}

const DashboardProductsTable = () => {
  const { isOnline } = useSelector(selectNetwork);

  const [clickedProductId, setClickedProductId] = useState<null | number>(null);

  const [thumbnail, setThumbnail] = useState<null | File>(null);

  const [productToEdit, setProductToEdit] = useState<IMyProduct | null>(null);

  const [productToCreate, setPorductToCreate] = useState<IMyProduct>({
    id: null,
    attributes: {
      title: "",
      description: "",
      price: 0,
      stock: 0,
    },
  });

  const { isLoading, data, error } = useGetDashboardProductsQuery({ page: 1 });

  console.log(isLoading, data, error);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isModelOpen,
    onOpen: onModelOpen,
    onClose: onModelClose,
  } = useDisclosure();

  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();

  const [removeProduct, { isLoading: isLoadingDestroy, isSuccess }] =
    useDeleteDashboardProductsMutation();

  const [
    updateProduct,
    { isLoading: isUpdating, isSuccess: isUpdatingSuccess },
  ] = useUpdateDashboardProductsMutation();

  const [
    createProduct,
    { isLoading: isCreating, isSuccess: isCreatingSuccess },
  ] = useCreateDashboardProductMutation();

  // ** Handlers __ Editing

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setProductToEdit({
      id: clickedProductId,
      attributes: {
        title: productToEdit?.attributes?.title,
        description: productToEdit?.attributes?.description,
        price: productToEdit?.attributes?.price,
        stock: productToEdit?.attributes?.stock,
        [name]: value,
      },
    });
  };

  console.log(productToEdit);

  const onChangePriceHandler = (value: string): void => {
    setProductToEdit({
      id: clickedProductId,
      attributes: {
        title: productToEdit?.attributes?.title,
        description: productToEdit?.attributes?.description,
        price: +value,
        stock: productToEdit?.attributes?.stock,
      },
    });
  };

  const onChangeStockHandler = (value: string): void => {
    setProductToEdit({
      id: clickedProductId,
      attributes: {
        title: productToEdit?.attributes?.title,
        description: productToEdit?.attributes?.description,
        price: productToEdit?.attributes?.price,
        stock: +value,
      },
    });
  };

  const onChangeThumbnailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setThumbnail(e.target.files[0]);
    }
  };

  const onSubmitHandler = () => {
    console.log(productToEdit);
    console.log(thumbnail);

    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        title: productToEdit?.attributes?.title,
        description: productToEdit?.attributes?.description,
        price: productToEdit?.attributes?.price,
        stock: productToEdit?.attributes?.stock,
      })
    );

    if (thumbnail) {
      formData.append("files.thumbnail", thumbnail);
    }

    updateProduct({ id: clickedProductId, body: formData });
  };

  // ** Handlers ___ Creating

  const onChangeCreateHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setPorductToCreate({
      id: productToCreate.id,
      attributes: {
        title: productToCreate.attributes.title,
        description: productToCreate.attributes.description,
        price: productToCreate.attributes.price,
        stock: productToCreate.attributes.stock,
        [name]: value,
      },
    });
  };

  const onChangePriceCreateHandler = (value: string) => {
    setPorductToCreate({
      id: clickedProductId,
      attributes: {
        title: productToCreate?.attributes?.title,
        description: productToCreate?.attributes?.description,
        price: +value,
        stock: productToCreate?.attributes?.stock,
      },
    });
  };

  const onChangeStockCreateHandler = (value: string) => {
    setPorductToCreate({
      id: clickedProductId,
      attributes: {
        title: productToCreate?.attributes?.title,
        description: productToCreate?.attributes?.description,
        price: productToCreate?.attributes?.price,
        stock: +value,
      },
    });
  };

  const onSubmitCreateHandler = () => {
    console.log(productToCreate);
    console.log(thumbnail);

    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        title: productToCreate?.attributes?.title,
        description: productToCreate?.attributes?.description,
        price: productToCreate?.attributes?.price,
        stock: productToCreate?.attributes?.stock,
      })
    );

    if (thumbnail) {
      formData.append("files.thumbnail", thumbnail);
    }

    createProduct(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      setClickedProductId(null);
      onClose();
    }
    if (isUpdatingSuccess) {
      setClickedProductId(null);
      onModelClose();
    }
    if (isCreatingSuccess) {
      setClickedProductId(null);
      onModelClose();
    }
  }, [isSuccess, isUpdatingSuccess, isCreatingSuccess, onClose, onModelClose]);

  if (isLoading || !isOnline) return <TableSkeleton />;

  return (
    <>
      <Flex direction={"column"} maxW="85%" mx={"auto"} my={6}>
        <Button
          rightIcon={<AiOutlinePlus />}
          colorScheme="green"
          onClick={() => {
            onCreateModalOpen();
          }}
          ml={"auto"}
          w={"fit-content"}
        >
          Create Product
        </Button>
        <TableContainer maxW="80%" mx={"auto"}>
          <Table variant="simple">
            <TableCaption>
              Total Entries : {data?.data?.length ?? 0}
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Thumbnail</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Stock</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.data?.map((product: IProduct) => (
                <Tr key={product.id}>
                  <Td>{product?.id}</Td>
                  <Td>{product?.attributes?.title}</Td>
                  <Td>
                    {
                      product?.attributes?.categories?.data?.[0]?.attributes
                        ?.title
                    }
                  </Td>
                  <Td>
                    <Image
                      borderRadius="full"
                      objectFit={"cover"}
                      boxSize="40px"
                      src={
                        product?.attributes?.thumbnail?.data?.attributes?.url
                      }
                      alt={product?.attributes?.title}
                    />
                  </Td>
                  <Td isNumeric>${product?.attributes?.price}</Td>
                  <Td isNumeric>{product?.attributes?.stock}</Td>
                  <Td>
                    <Button
                      as={RouterLink}
                      to={`/products/${product.id}`}
                      colorScheme="purple"
                      variant="solid"
                      mr={3}
                      onClick={() => {}}
                    >
                      <AiOutlineEye size={17} />
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="solid"
                      mr={3}
                      onClick={() => {
                        setClickedProductId(product.id);
                        onOpen();
                      }}
                    >
                      <BsTrash size={17} />
                    </Button>
                    <Button
                      colorScheme="blue"
                      variant="solid"
                      onClick={() => {
                        setClickedProductId(product.id);
                        setProductToEdit(product);
                        onModelOpen();
                      }}
                    >
                      <FiEdit2 size={17} />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Id</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Thumbnail</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Stock</Th>
                <Th>Action</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>

      <CustomAlertDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        title="Are You Sure ?"
        description="Do You Really Want To Remove This Product? This Process Cannot Be Redone."
        variant="solid"
        okText="Dlelte"
        isLoading={isLoadingDestroy}
        onOkHandler={() => removeProduct(clickedProductId)}
      />

      <CustomModel
        isOpen={isModelOpen}
        onClose={onModelClose}
        title="UPDATE PRODUCTS"
        okText="UPDATE"
        onOkClick={onSubmitHandler}
        isLoading={isUpdating}
      >
        <FormControl mb={3}>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Product Title"
            name="title"
            value={productToEdit?.attributes?.title}
            onChange={onChangeHandler}
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Product Description"
            name="description"
            value={productToEdit?.attributes?.description}
            onChange={onChangeHandler}
          />
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Price</FormLabel>
          <NumberInput
            name="price"
            defaultValue={productToEdit?.attributes?.price}
            precision={2}
            step={1}
            onChange={onChangePriceHandler}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Count In Stock</FormLabel>
          <NumberInput
            defaultValue={productToEdit?.attributes?.stock}
            precision={2}
            step={1}
            name="stock"
            onChange={onChangeStockHandler}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl mb={3}>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            id="thumbnail"
            type="file"
            h={"full"}
            p={2}
            accept="image/png, image/gif, image/jpeg"
            name="thumbnail"
            onChange={onChangeThumbnailHandler}
            // value={productToEdit?.attributes?.thumbnail}
          />
        </FormControl>
      </CustomModel>

      <CustomModel
        isOpen={isCreateModalOpen}
        onClose={onCreateModalClose}
        title="CREATE NEW PRODUCT"
        okText="CREATE"
        onOkClick={onSubmitCreateHandler}
        isLoading={isCreating}
      >
        <FormControl mb={3}>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Product Title"
            name="title"
            onChange={onChangeCreateHandler}
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Product Description"
            name="description"
            onChange={onChangeCreateHandler}
          />
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Price</FormLabel>
          <NumberInput
            name="price"
            precision={2}
            step={1}
            onChange={onChangePriceCreateHandler}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Count In Stock</FormLabel>
          <NumberInput
            precision={2}
            step={1}
            name="stock"
            onChange={onChangeStockCreateHandler}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl mb={3}>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            id="thumbnail"
            type="file"
            h={"full"}
            p={2}
            accept="image/png, image/gif, image/jpeg"
            name="thumbnail"
            onChange={onChangeThumbnailHandler}
          />
        </FormControl>
      </CustomModel>
    </>
  );
};

export default DashboardProductsTable;
