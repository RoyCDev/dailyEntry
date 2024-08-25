import { addMonths, format } from 'date-fns'
import { Button, ButtonGroup, Flex, Text } from "@chakra-ui/react"
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

function MonthDisplay({ currentMonth, setCurrentMonth, score }) {
    const formattedMonth = format(currentMonth, "MMM yyyy")

    return (
        <>
            <Flex justifyContent="center" color="white" bg="brand.500" borderRadius={12} pt={1}>
                <ButtonGroup size="sm" gap={10} variant="unstyled">
                    <Button leftIcon={<ArrowLeftIcon />}
                        onClick={() => setCurrentMonth(addMonths(currentMonth, -1))} />
                    <Text fontSize="lg" fontWeight={500}>{formattedMonth}</Text>
                    <Button rightIcon={<ArrowRightIcon />}
                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} />
                </ButtonGroup>
            </Flex>
            <Text m="0 auto" color="brand.500" bg="white" w="fit-content" px={6} py={0.5} borderRadius={12}
                fontWeight={500} fontSize="sm">
                Avg Score: {score}
            </Text>
        </>
    )
}

export default MonthDisplay