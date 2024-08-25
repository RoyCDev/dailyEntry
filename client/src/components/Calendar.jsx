import { Box, Spacer, SimpleGrid } from "@chakra-ui/react"
import { eachDayOfInterval, startOfMonth, endOfMonth, format, getDay } from "date-fns"

function Calendar({ currentMonth }) {
    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

    const days = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth)
    })

    const formattedDaysOfWeek = daysOfWeek.map((day, index) => (
        <Box fontWeight={600} mb={1} key={index}>{day}</Box>
    ))

    const emptyCells = getDay(startOfMonth(currentMonth))
    const spaces = Array(emptyCells).fill(<Spacer />)

    const formattedDays = days.map((day, index) => (
        <Box key={index}>{format(day, "d")}</Box>
    ))

    return (
        <SimpleGrid columns={7} gap={2} p={3} mt={5} borderRadius={12}
            bg="white" textAlign="center" fontSize="xs">
            {formattedDaysOfWeek}
            {spaces}
            {formattedDays}
        </SimpleGrid >
    )
}

export default Calendar