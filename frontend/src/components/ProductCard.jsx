import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);

        toast({
            title: success ? "Success" : "Error",
            description: message,
            status: success ? "success" : "error",
            duration: 3000,
            isClosable: true,
        });
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        onClose();

        toast({
            title: success ? "Success" : "Error",
            description: success ? "Product update successful" : message,
            status: success ? "success" : "error",
            duration: success ? 4000 : 3000,
            isClosable: true,
        });
    };

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{
                transform: "translateY(-5px)",
                shadow: "xl",
                bgGradient: 'linear(to-r, red.500, yellow.500)',
            }}
            bg={bg}
            pt={5}
        >
            <Image
                draggable={false}
                src={product.image}
                alt={product.name}
                h={48}
                w='full'
                objectFit='contain'
            />

            <Box p={4}>
                <Heading as='h3' size='md' mb={2} color={textColor}>
                    {product.name}
                </Heading>

                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ₹{product.price
                        .toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </Text>

                <HStack spacing={2}>
                    <IconButton
                        icon={<EditIcon />}
                        isDisabled
                        onClick={onOpen}
                        colorScheme='teal'
                    />
                    <IconButton
                        icon={<DeleteIcon />}
                        isDisabled
                        onClick={() => handleDeleteProduct(product._id)}
                        colorScheme='purple'
                    />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                bgGradient='linear(to-l, #7928CA, #FF0080)'
                                _placeholder={{ color: 'gray.800', fontWeight: 600 }}
                                letterSpacing={1.5}
                                placeholder='Product Name'
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <Input
                                bgGradient='linear(to-l, #7928CA, #FF0080)'
                                _placeholder={{ color: 'gray.800', fontWeight: 600 }}
                                letterSpacing={1.5}
                                placeholder='Price'
                                name='price'
                                type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                            <Input
                                bgGradient='linear(to-l, #7928CA, #FF0080)'
                                _placeholder={{ color: 'gray.800', fontWeight: 600 }}
                                letterSpacing={1.5}
                                placeholder='Image URL'
                                name='image'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='purple'
                            _hover={{
                                bgGradient: 'linear(to-r, red.500, yellow.500)',
                            }}
                            mr={3}
                            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                        >
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProductCard;