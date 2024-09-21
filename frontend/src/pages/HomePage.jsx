import { Container, HStack, SimpleGrid, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { SiTicktick } from "react-icons/si";
import { FaRegFaceSadCry } from "react-icons/fa6";


import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  const textColor = useColorModeValue("purple", "red");


  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <HStack spacing={2}>
          <Text
            fontSize={"30"}
            fontWeight={"bold"}
            // bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgGradient='linear(to-r, red.500, yellow.500)'
            bgClip={"text"}
            textAlign={"center"}
          >
            Available Products
          </Text>
          <SiTicktick size={30} color="orange"/>
        </HStack>


        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <VStack>
            <HStack>
              <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
                No products found
              </Text>
              <FaRegFaceSadCry size={30} color={textColor} />
              <FaRegFaceSadCry size={30} color={textColor} />
              <FaRegFaceSadCry size={30} color={textColor} />
            </HStack>
            <Link to={"/create"} >
              <Text as='span' bgGradient='linear(to-l, #7928CA, #FF0080)'
                bgClip={"text"} fontSize={"25"}
                fontWeight={"bold"} _hover={{ textDecoration: "underline" }}>
                Create a product
              </Text>
            </Link>
          </VStack>
        )}
      </VStack>
    </Container>
  );
};
export default HomePage;