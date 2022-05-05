import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Text,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Icon,
  Tooltip
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { ColorModeSwitcher } from '../theme/ColorModeSwitcher';
import { AiTwotoneThunderbolt } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { CgArrowsExchange } from 'react-icons/cg';
import { BsCheckCircle } from 'react-icons/bs';
import { MdSupervisorAccount, MdTimeline } from 'react-icons/md';
import { BsBook } from 'react-icons/bs';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AccentPicker } from 'components/theme/Accent';
import { useLinkColor } from 'components/theme';
import { MotionBox } from 'components/shared/animations/motion';
import { AiFillHome } from 'react-icons/ai'
import { colors } from '../theme/colors';
import path from 'path';
import { FaGithub } from "react-icons/fa";

const webLinks = [
  { name: 'Home', path: '/'},
  { name: 'About', path: '/' },
  { name: 'Projects', path: '/' }
];

const mobileLinks = [
  { name: 'Projects', path: '/projects' },
  { name: 'Open Source', path: '/open-source' },
  { name: 'Blog', path: '/blog' },
  { name: 'Changelog', path: '/changelog' }
];

interface NavLinkProps {
  index?: number;
  name: string;
  path: string;
  linkColor: string;
  outline: string;
  onClose: () => void;
}

const NavLink = (props: NavLinkProps) => {
  const router = useRouter();
  const link = {
    bg: useColorModeValue('gray.200', 'gray.700'),
    color: useColorModeValue('blue.500', 'blue.200'),
    outline: 'dashed'
  };

  return (
    <NextLink href={props.path} passHref>
      <Link
        px={3}
        py={1}
        lineHeight="inherit"
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: link.bg,
          color: props.linkColor
        }}
        bg={router.pathname === props.path ? link.bg : 'transparent'}
        color={router.pathname === props.path ? props.linkColor : 'inherit'}
        outline={router.pathname === props.path ? link.outline : 'transparent'}
        onClick={() => props.onClose()}
      >
        {props.name}
      </Link>
    </NextLink>
  );
};

interface MenuLinkProps {
  name: string;
  path: string;
  color: string;
  bg: string;
  rPath: string;
  onClose: () => void;
}

const MenuLink = (props: MenuLinkProps) => {
  const iconsObj = {
    '/tech-stack': <Icon as={AiTwotoneThunderbolt} size={18} color={props.color} />,
    '/open-source': <Icon as={BsBook} size={18} color={props.color} />,
    '/achievements': <Icon as={BsCheckCircle} size={18} color={props.color} />,
    '/projects': <Icon as={MdTimeline} size={18} color={props.color} />,
    '/changelog': <Icon as={CgArrowsExchange} size={18} color={props.color} />
  };

  return (
    <NextLink href={props.path} passHref>
      <Link onClick={() => props.onClose()}>
        <MenuItem
          color={props.rPath === props.path && props.color}
          bg={props.rPath === props.path && props.bg}
          _hover={{ color: props.color, bg: props.bg }}
        >
          <HStack>
            {iconsObj[props.path]}
            <Text>{props.name}</Text>
          </HStack>
        </MenuItem>
      </Link>
    </NextLink>
  );
};

export default function TopNav() {
  const linkColor = useLinkColor();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const menuProps = {
    bg: useColorModeValue('gray.200', 'gray.700'),
    color: useColorModeValue('blue.500', 'blue.200')
  };

  return (
    <>
      <Box
        px={4}
        boxShadow={'lg'}
        position="fixed"
        width="100%"
        zIndex="55"
        css={{
          // para especificar el background de la cabecera, para ajustar el transparente
          backdropFilter: 'saturate(180%) blur(3px)',
          backgroundColor: useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)')
        }}
      >
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          w={['100%', '90%', '83%']}
          maxW={800}
          mx="auto"
        >
          <IconButton
            size={'md'}
            icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
            aria-label={'Open Menu'}
            display={['inherit', 'inherit', 'none']}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={8} alignItems={'center'}>
            <MotionBox shadow="md" rounded="full">
              <NextLink href={'/'} passHref>
                  <IconButton
                    size={"md"}
                    outlineColor={'gray.500'}
                    outline={'dashed'}
                    target="_blank"
                    aria-label={"Github account"}
                    _hover={{
                      textDecoration: "none",
                      bg: useColorModeValue("gray.200", "gray.900")
                    }}
                  >
                      <Tooltip label={'Home'} aria-label='A tooltip'>
                    <Avatar
                      background={'gray.100'}
                      as={Link}
                      size={'xs'}
                      showBorder={true}
                      src={'https://avatars.githubusercontent.com/u/81894363?v=4'}
                      />
                      </Tooltip>
                  </IconButton>
              </NextLink>
            </MotionBox>

            <Tooltip label={'Github account'} aria-label='A tooltip'
            >
              <IconButton
                as={Link}
                href={"https://github.com/CesarAcjotaMerma"}
                size={"md"}
                icon={<FaGithub />}
                outlineColor={'gray.500'}
                outline={'dashed'}
                target="_blank"
                aria-label={"Github account"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.900")
                }}
              />
            </Tooltip>

            
            </HStack>
            <HStack 
              as={'nav'} 
              spacing={10} 
              justifyContent={'center'}
              fontWeight="semibold"
              alignItems={'right'}
              display={{ base: 'none', md: 'flex' }}
            >
              {webLinks.map((link, index) => (
                <NavLink
                  key={index}
                  name={link.name}
                  path={link.path}
                  linkColor={linkColor}
                  outline={'dashed'}
                  onClose={onClose}              />
              ))}
            </HStack>
          <Flex alignItems={'left'}>
            <AccentPicker
              aria-label="Accent Color Picker"
              variant="ghost"
              zIndex={1}
              color={linkColor}
              outlineColor={'gray.500'}
              outline={'dashed'}
              mr={4}
            />
            <ColorModeSwitcher justifySelf="flex-end" />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box
            pb={4}
            w={['100%', '100%', '80%']}
            maxW={800}
            display={['inherit', 'inherit', 'none']}
          >
            <Stack as={'nav'} spacing={5} >
              {mobileLinks.map((link, index) => (
                <NavLink
                  key={index}
                  index={index}
                  name={link.name}
                  path={link.path}
                  linkColor={linkColor}
                  outline={'dashed'}
                  onClose={onClose}
                />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
