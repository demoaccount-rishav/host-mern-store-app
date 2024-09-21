import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product.js";

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});
	const toast = useToast();

	const { createProduct } = useProductStore();

	const handleAddProduct = async () => {
		// console.log(newProduct);
		const { success, message } = await createProduct(newProduct);
		
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
				duration: 1000
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
				duration: 4000
			});
		}
		setNewProduct({ name: "", price: "", image: "" });
		// console.log(success);
		// console.log(message);

	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h2"} size={"2xl"} textAlign={"center"} mb={8} textTransform={"uppercase"} bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip={"text"}>
					Create New Product
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"} >
					<VStack spacing={4}>
						<Input
							_placeholder={{ color: 'gray.800', fontWeight: 600 }}
							fontWeight={'500'}
							bgGradient='linear(to-l, #7928CA, #FF0080)'
							placeholder='Product Name'
							name='name'
							value={newProduct.name}
							letterSpacing={1.5}
							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						/>
						<Input
							_placeholder={{ color: 'gray.800', fontWeight: 600 }}
							fontWeight={'500'}
							bgGradient='linear(to-l, #7928CA, #FF0080)'
							placeholder='Price'
							name='price'
							type='number'
							value={newProduct.price}
							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
							letterSpacing={1.5}
						/>
						<Input
							_placeholder={{ color: 'gray.800', fontWeight: 600 }}
							letterSpacing={1.5}
							fontWeight={'500'}
							bgGradient='linear(to-l, #7928CA, #FF0080)'
							placeholder='Image URL'
							name='image'
							value={newProduct.image}
							onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
						/>

						<Button colorScheme='blue' onClick={handleAddProduct} w='full'
							bgGradient='linear(to-r, teal.500, green.500)'
							_hover={{
								bgGradient: 'linear(to-r, red.500, yellow.500)',
							}}
						>
							Add Product
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};
export default CreatePage;