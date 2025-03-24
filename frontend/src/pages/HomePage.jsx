import { Container, Text, VStack, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useProductStore } from '@/store/product';
import ProductCard from '@/components/ProductCard';

const HomePage = () => {
  const gradientStart = 'cyan.400';
  const gradientEnd = 'blue.500';

  const {fetchProducts, products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log('products', products);

  return (
  <Container maxW='container.xl' py={12}>
    <VStack spacing={8}>
    <Text
        fontSize='xl'
        fontWeight={'bold'}
        textAlign={'center'}
        bgGradient={'to-r'}
        gradientFrom={gradientStart}
        gradientTo={gradientEnd}
        bgClip={'text'}
      >
        Current Products
      </Text>

      <SimpleGrid columns={{
        base: 1,
        md: 2,
        lg: 3
        }}
        spacing={10}
        gridRowGap={3}
        gridColumnGap={3}
        w={'full'}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product}/>
        ))}
      </SimpleGrid>
      
      {products.length === 0 && (
        <Text fontSize='large' textAlign={'center'} fontWeight='bold' color='gray.500'>
          No Products Found {" "}
          <Link to={'/create'}>
            <Text as='span' color='blue.500' _hover={{textDecoration: 'underline'}}>
              Create A Product
            </Text>
          </Link>
        </Text>
      )}
      
    </VStack>
  </Container>)
};

export default HomePage;