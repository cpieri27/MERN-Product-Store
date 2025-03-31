import { Button, Container, Drawer, Flex, HStack, Input, Portal, Text, VStack } from '@chakra-ui/react';
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { Link } from 'react-router-dom';
import { CiSquarePlus, CiDark , CiLight} from "react-icons/ci";
import { useState } from 'react';
import { useProductStore } from "@/store/product";
import { toaster } from './ui/toaster';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const buttonColor = useColorModeValue('gray.400', 'gray.600');
  const textColor = useColorModeValue("gray.900", 'gray.100');
  const gradientStart = 'cyan.400';
  const gradientEnd = 'blue.500';

  const [newProduct, setNewProduct] = useState({
      name: '',
      price: '',
      image: '',
  });

  const { createProduct } = useProductStore()

  const handleAddProduct = async () => {
      const { success, message } = await createProduct(newProduct);

      if(!success) {
          toaster.create({
              description: message,
              type: 'error',
          });
      } else {
          toaster.create({
              description: message,
              type: 'success',
          });   
          
          setNewProduct({ name: "", price: "", image: ""});
      }

  };


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
            <Drawer.Root key={'top'} placement={'top'}>
                <Drawer.Trigger asChild>
                    <Button bg={buttonColor} color={textColor}>
                        <CiSquarePlus />
                    </Button>
                </Drawer.Trigger>
                <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner padding="4">
                        <Drawer.Content rounded="md">
                            <Drawer.Header>
                                <Drawer.Title>Create Product</Drawer.Title>
                            </Drawer.Header>
                            <Drawer.Body>
                                <VStack spacing={4}>
                                    <Input 
                                        placeholder={'Product Name'}
                                        name='name'
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value})}
                                        style={{ border: '1px solid', borderRadius: '4px' }}
                                    />
                                    <Input 
                                        placeholder="Product Price"
                                        name="price"
                                        value={newProduct.price}
                                        onChange={(e) => {
                                            const rawValue = e.target.value;
                                            const sanitizedValue = rawValue
                                            .replace(/[^0-9.]/g, '')     // remove non-numeric/non-dot chars
                                            .replace(/(\..*?)\..*/g, '$1'); // keep only the first dot
                                            setNewProduct({ ...newProduct, price: sanitizedValue });
                                        }}
                                        style={{ border: '1px solid', borderRadius: '4px' }}
                                    />
                                    <Input 
                                        placeholder='Product Image'
                                        name='image'
                                        value={newProduct.image}
                                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value})}
                                        style={{ border: '1px solid', borderRadius: '4px' }}
                                    />
                                </VStack>
                            </Drawer.Body>
                            <Drawer.Footer>
                                <Drawer.CloseTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </Drawer.CloseTrigger>
                                <Drawer.CloseTrigger asChild>
                                    <Button variant={'surface'} onClick={() => handleAddProduct()}>Create</Button>
                                </Drawer.CloseTrigger>
                            </Drawer.Footer>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root>

            <Button onClick={toggleColorMode} bg={buttonColor} color={textColor}>
            {colorMode === 'light' ? <CiDark /> : <CiLight />}
            </Button>
        </HStack>
    </Flex>
</Container>;
};

export default Navbar;