import AuthForm from "../components/AuthForm";
import { Heading, Text } from "@chakra-ui/react";

function AuthPage() {
    return (
        <>
            <Heading as="h1" fontWeight={400}>Welcome to DailyEntry</Heading>
            <Text>Start documenting your life and goals!</Text>
            <AuthForm />
        </>
    )
}

export default AuthPage;