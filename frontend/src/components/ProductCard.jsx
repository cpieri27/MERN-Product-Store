import { Box, Button, Drawer, Heading, HStack, Image, Input, Portal, Text, VStack} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { MdOutlineDelete, MdOutlineEdit} from "react-icons/md";
import { useProductStore } from "@/store/product";
import { toaster } from "@/components/ui/toaster";
import { useState } from "react";

const ProductCard = ({product}) => {
    const textColor = useColorModeValue('cyan.400', 'cyan.500');
    const editButtonColor = useColorModeValue('cyan.300', 'cyan.700');
    const deleteButtonColor = useColorModeValue('red.300', 'red.700');
    const iconColor = useColorModeValue('gray.600', 'gray.400');

    const { deleteProduct, updateProduct} = useProductStore();
    const [updatedProduct, setUpdatedProduct] = useState(product);
    
    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);

        if (!success) {
            toaster.create({
                description: message,
                type: 'error'
        })}
        else {
            toaster.create({
                description: message,
                type: 'success'
        })}
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        // Clean the price: keep digits and the first decimal
        const rawPrice = updatedProduct.price;
        const cleanedPrice = parseFloat(
            rawPrice.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
        );
    
        const finalProduct = {
            ...updatedProduct,
            price: isNaN(cleanedPrice) ? '' : cleanedPrice.toFixed(2),
        };
    
        const { success, message } = await updateProduct(pid, finalProduct);
    
        if (!success) {
            toaster.create({
                description: message,
                type: 'error',
            });
        } else {
            toaster.create({
                description: message,
                type: 'success',
            });
        }
    };


    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{transform: 'translateY(-5px)', shadow: 'xl'}}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                    <Drawer.Root key={'top'} placement={'top'}>
                        <Drawer.Trigger asChild>
                            <Button color={iconColor} bg={editButtonColor}>
                                <MdOutlineEdit />
                            </Button>
                        </Drawer.Trigger>
                        <Portal>
                            <Drawer.Backdrop />
                            <Drawer.Positioner padding="4">
                                <Drawer.Content rounded="md">
                                    <Drawer.Header>
                                        <Drawer.Title>Update Product: {product.name}</Drawer.Title>
                                    </Drawer.Header>
                                    <Drawer.Body>
                                        <VStack spacing={4}>
                                            <Input 
                                                placeholder={'Product Name'}
                                                name='name'
                                                value={updatedProduct.name}
                                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value})}
                                                style={{ border: '1px solid', borderRadius: '4px' }}
                                            />
                                            <Input 
                                                placeholder={'Product Price'}
                                                name='price'
                                                value={updatedProduct.price}
                                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value})}
                                                style={{ border: '1px solid', borderRadius: '4px' }}
                                            />
                                            <Input 
                                                placeholder='Product Image'
                                                name='image'
                                                value={updatedProduct.image}
                                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value})}
                                                style={{ border: '1px solid', borderRadius: '4px' }}
                                            />
                                        </VStack>
                                    </Drawer.Body>
                                    <Drawer.Footer>
                                        <Drawer.CloseTrigger asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </Drawer.CloseTrigger>
                                        <Drawer.CloseTrigger asChild>
                                            <Button variant={'surface'} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
                                        </Drawer.CloseTrigger>
                                    </Drawer.Footer>
                                    
                                </Drawer.Content>
                            </Drawer.Positioner>
                        </Portal>
                    </Drawer.Root>
                    <Button color={iconColor} bg={deleteButtonColor} onClick={() => handleDeleteProduct(product._id)} >
                        <MdOutlineDelete />
                    </Button>
                </HStack>
            </Box>
        </Box>
    )
}

export default ProductCard