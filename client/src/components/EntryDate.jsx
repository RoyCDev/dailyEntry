import { Box, Text } from "@chakra-ui/react"
import { format, getDate } from "date-fns"

function EntryDate({ date }) {
    return (
        <Box
            bg="brand.400"
            color="white"
            w={{ base: "105px", md: "95px" }}
            h={{ md: "95px" }}
            borderRadius={12}
            fontWeight={500}
            display={{ base: "flex", md: "block" }}
            justifyContent="center"
            alignItems="center"
            gap={1.5}
            m="0 auto"
            textAlign="center"
            alignContent="center"
            pb={{ base: 0.5, md: 2 }}
            boxShadow={{ md: "7px 7px white" }}>
            <Text fontSize={{ md: "4xl" }}>{getDate(date)}</Text>
            <Text
                fontSize={{ base: "sm", md: "md" }}
                mt={{ md: -2 }}>
                {format(date, "EEE")}
            </Text>
        </Box>
    )
}

export default EntryDate