import MonthDisplay from "../components/MonthDisplay"
import EntryDate from "../components/EntryDate"
import EntryCard from "../components/EntryCard"
import DeleteModal from "../components/DeleteModal"
import Calendar from "../components/Calendar.jsx"

import { format } from "date-fns"
import { Grid, GridItem, Stack, SimpleGrid, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { entryClient } from "../../util.js"

function HistoryPage() {
    const [selectedEntry, setSelectedEntry] = useState({})
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const formattedMonth = format(currentMonth, "MMM yyyy")
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data: entries } = useQuery({
        queryKey: ["entries", formattedMonth],
        queryFn: async () => {
            const res = await entryClient.get("/entries", {
                params:
                {
                    year: currentMonth.getFullYear(),
                    month: currentMonth.getMonth() + 1
                }
            })
            return res.data.entries
        }
    })

    const score = entries?.length ?
        (entries.reduce((acc, curr) => acc + parseInt(curr.mood), 0) / entries.length).toFixed(2) :
        "0.00"

    const onModalOpen = (entry) => {
        onOpen()
        setSelectedEntry(entry)
    }

    const onModalClose = () => {
        onClose()
        setSelectedEntry({})
    }

    const renderedEntries = entries?.map(entry => (
        <Stack
            key={entry.id}
            direction={{ base: "column", md: "row" }}
            gap={{ base: 1.5, md: 4 }} >
            <EntryDate date={entry.date} />
            <EntryCard entry={entry} onModalOpen={onModalOpen} />
        </Stack>
    ))

    return (
        <Grid
            templateAreas={{
                base: `"header" "main"`,
                lg: `"header header" "main side"`
            }}
            gridTemplateColumns={{ lg: "1fr 225px" }}
            maxW="950px"
            m="0 auto"
            columnGap={5}
        >
            <GridItem area="header">
                <MonthDisplay
                    currentMonth={currentMonth}
                    setCurrentMonth={setCurrentMonth}
                    score={score} />
            </GridItem>

            <GridItem area="main">
                <SimpleGrid gap={5} mt={5}>{renderedEntries}</SimpleGrid>
                <DeleteModal
                    isOpen={isOpen}
                    onModalClose={onModalClose}
                    selectedEntry={selectedEntry} />
            </GridItem>

            <GridItem area="side" display={{ base: "none", lg: "block" }}>
                <Calendar currentMonth={currentMonth} />
            </GridItem>
        </Grid>
    )
}

export default HistoryPage