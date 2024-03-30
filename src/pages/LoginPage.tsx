/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormHelperText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { useDispatch } from 'react-redux';
import { selectLogin, userLogin } from "../app/features/loginSlice";
import { useAppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IAuth {
  isAuthenticated: boolean;
}

const LoginPage = ({ isAuthenticated }: IAuth) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(-1);
    }
  });

  const { loading } = useSelector(selectLogin);

  const dispatch = useAppDispatch();

  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });

  const [isEmail, setIsEmail] = useState(false);

  const [isPassword, setIsPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  // ** Handlers

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user.identifier && !user.password) {
      setIsEmail(true);
      setIsPassword(true);
      return;
    }
    if (!user.identifier) {
      setIsEmail(true);
      return;
    }

    if (!user.password) {
      setIsPassword(true);
      return;
    }

    setIsEmail(false);

    setIsPassword(false);

    dispatch(userLogin(user));

    setTimeout(() => {
      navigate("/");
    }, 2000);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // dispatch((userLogin as any)(user.identifier, user.password || ''));

    console.log(user);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} mb={10}>
            Sign in to your account
          </Heading>
          <Text fontSize={"lg"} color={"blue.400"}>
            Join To SHWACODE Company
          </Text>
        </Stack>
        <Box
          as={"form"}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          onSubmit={submitHandler}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                isInvalid={isEmail}
                name={"identifier"}
                errorBorderColor="crimson"
                value={user.identifier}
                onChange={onChangeHandler}
              />
              {isEmail ? (
                <FormHelperText color="red.500">
                  Email Is Required
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  isInvalid={isPassword}
                  name={"password"}
                  errorBorderColor="crimson"
                  value={user.password}
                  onChange={onChangeHandler}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPassword ? (
                <FormHelperText color="red.500">
                  Password Is Required
                </FormHelperText>
              ) : null}
            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                type="submit"
                bg={isEmail || isPassword ? "red.500" : "blue.400"}
                color={"white"}
                _hover={{
                  bg: isEmail || isPassword ? "red.600" : "blue.500",
                }}
                isLoading={loading}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
