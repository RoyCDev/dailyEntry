import MonthDisplay from "../components/MonthDisplay"
import EntryDate from "../components/EntryDate"
import EntryCard from "../components/EntryCard"
import DeleteModal from "../components/DeleteModal"

import { format } from "date-fns"
import { Stack, SimpleGrid, useDisclosure } from "@chakra-ui/react"
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
        <>
            <MonthDisplay
                currentMonth={currentMonth}
                formattedMonth={formattedMonth}
                setCurrentMonth={setCurrentMonth}
                score={score} />
            <SimpleGrid gap={5} mt={5}>{renderedEntries}</SimpleGrid>
            <DeleteModal
                isOpen={isOpen}
                onModalClose={onModalClose}
                selectedEntry={selectedEntry}
            />
        </>
    )
}

export default HistoryPage