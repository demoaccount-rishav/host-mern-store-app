import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FaStore } from "react-icons/fa6";


const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					// textTransform={"uppercase"}
					textAlign={"center"}
					// bgGradient='linear(to-l, #7928CA, #FF0080)'
					bgGradient='linear(to-r, red.500, yellow.500)'
					bgClip={"text"}
				>
					<HStack>
						<FaStore size={25} color="orange"/>
						<Link to={"/"}>Gadget Store</Link>
					</HStack>

				</Text>

				<HStack spacing={2} alignItems={"center"}>
					<Link to={"/create"} >
						<Button _hover={{
							bgGradient: 'linear(to-r, red.500, yellow.500)',
						}}>
							<PlusSquareIcon fontSize={20} />
						</Button>
					</Link>
					<Button _hover={{
						bgGradient: 'linear(to-r, red.500, yellow.500)',
					}} onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
					</Button>
				</HStack>
			</Flex>
		</Container>
	);
};
export default Navbar;