import { Text, Flex, Container, HStack, Button} from '@chakra-ui/react';
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { Link } from 'react-router-dom';
import { CiSquarePlus, CiDark , CiLight} from "react-icons/ci";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const buttonColor = useColorModeValue('gray.400', 'gray.600');
  const textColor = useColorModeValue("gray.900", 'gray.100');
  const gradientStart = 'cyan.400';
  const gradientEnd = 'blue.500';


return <Container maxW={'1140px'} px={4}>
  <Flex 
    h={16}
    alignItems={'center'}
    justifyContent={'space-between'}
    flexDir={{
      base: 'column',
      sm: 'row'
    }}
    >
      <Text
        fontSize={{base: '22', sm: '28'}}
        fontWeight={'bold'}
        textTransform={'uppercase'}
        textAlign={'center'}
        bgGradient={'to-r'}
        gradientFrom={gradientStart}
        gradientTo={gradientEnd}
        bgClip={'text'}
      >
        <Link to={'/'}>Product Store</Link>
      </Text>
      <HStack spacing={2} alignItems={'center'}>
        <Link to={'/create'} >
          <Button  bg={buttonColor} color={textColor}>
            <CiSquarePlus fontSize={20} />
          </Button>
        </Link>
        <Button onClick={toggleColorMode} bg={buttonColor} color={textColor}>
          {colorMode === 'light' ? <CiDark /> : <CiLight />}
        </Button>
      </HStack>
  </Flex>
</Container>;
};

export default Navbar;