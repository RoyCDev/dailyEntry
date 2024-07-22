import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { Box, Flex, Heading, Image, Text, useToast } from "@chakra-ui/react";
import journalImg from "../assets/journal.png"
import { useState } from "react";

function AuthPage() {
    const [isSignupMode, setIsSignupMode] = useState(false)
    const toggleMode = () => {
        setIsSignupMode(prev => !prev)
    }

    const toast = useToast()

    return (
        <Flex
            px={8}
            pt={{ base: 3, md: 20 }}
            gap={{ lg: 2, xl: 8 }}
            justifyContent="center">
            <Box w={{ base: "100%", lg: "385px", xl: "425px" }}>
                <Heading as="h1" fontWeight={400}>Hello!</Heading>
                <Text pt={1} pb={8}>Start documenting your life and goals!</Text>
                {isSignupMode ?
                    <SignUpForm toggleMode={toggleMode} toast={toast} /> :
                    <LoginForm toggleMode={toggleMode} toast={toast} />}
            </Box>
            <Image src={journalImg} alignSelf="center"
                boxSize={{ base: "275px", lg: "315px", xl: "400px" }}
                display={{ base: "none", lg: "inline" }} />
        </Flex>
    )
}

export default AuthPage;