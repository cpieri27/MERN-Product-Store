import { useColorModeValue } from "@/components/ui/color-mode";
import { useProductStore } from "@/store/product";
import { Container, VStack, Heading, Box, Input, Button } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useState } from "react";

const CreatePage = () => {
    const boxColor = useColorModeValue('gray.200', 'gray.800');
    const textColor = useColorModeValue('gray.900', 'gray.100');

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

    return (
        <Container maxW={'container.sm'}>
            <VStack
                spacing={8}
            >
                <Heading as={'h1'} size={'2x1'} textAlign={'center'} mb={8}>
                    Create New Product
                </Heading>

                <Box 
                    w={'full'}
                    bg={boxColor}
                    p={6}
                    rounded={'lg'}
                    shadow={'md'}
                >
                    <VStack spacing={4}>
                        <Input 
                            placeholder={'Product Name'}
                            name='name'
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value})}
                            style={{ border: '1px solid', borderRadius: '4px' }}
                        />
                        <Input 
                            placeholder='Product Price'
                            name='price'
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value})}
                            style={{ border: '1px solid', borderRadius: '4px' }}
                        />
                        <Input 
                            placeholder='Product Image'
                            name='image'
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value})}
                            style={{ border: '1px solid', borderRadius: '4px' }}
                        />
                        <Button bg='blue' color={textColor} onClick={handleAddProduct} w='full'>
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>);
};

export default CreatePage;