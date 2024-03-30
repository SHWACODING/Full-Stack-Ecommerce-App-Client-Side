'use client'

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  // useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
  Link,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom';
import CookieService from '../services/CookieService'
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../app/features/cartSlice';
import { onOpenCartDrawerAction } from '../app/features/globalSlice';

interface Props {
  children: React.ReactNode
}

const Links = ['About', 'Products', 'Dashboard'];

const NavLink = (props: Props) => {
  const { children } = props

  return (
    <Link
      to={children?.toString().toLowerCase()}
      as={RouterLink}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      {children}
    </Link>
  )
}

export default function Navbar() {

  const dispatch = useDispatch();

  const { cartProducts } = useSelector(selectCart);

  const { colorMode, toggleColorMode } = useColorMode();

  // const { isOpen, onOpen, onClose } = useDisclosure();

  const jsonWebToken = CookieService.get('jwt');


  const logoutHandler = () => {
    CookieService.remove('jwt');
    window.location.reload();
  }

  const onOpenCartDrawerHandler = () => dispatch(onOpenCartDrawerAction());

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

          <HStack spacing={8} alignItems={'center'}>
            <Box as={RouterLink} to={"/"}>SHWACODE</Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>

              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Button colorScheme='blue' onClick={onOpenCartDrawerHandler}>Cart ( { cartProducts.length } )</Button>

              {
                jsonWebToken 
                ?
                (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}>
                      <Avatar
                        size={'sm'}
                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                      />
                    </MenuButton>
                    <MenuList alignItems={'center'}>
                      <br />
                      <Center>
                        <Avatar
                          size={'2xl'}
                          src={'https://avatars.dicebear.com/api/male/username.svg'}
                        />
                      </Center>
                      <br />
                      <Center>
                        <p>Username</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem>Your Servers</MenuItem>
                      <MenuItem>Account Settings</MenuItem>
                      <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                  </Menu>                  
                ):
                (
                  <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
                    <Link as={RouterLink} to="/login" _hover={{textDecoration: 'none'}}>
                      <NavLink>Login</NavLink>
                    </Link>
                  </HStack>
                )
              }

            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}