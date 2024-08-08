import EntryCard from "../components/EntryCard"
import DeleteModal from "../components/DeleteModal"

import { SimpleGrid, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { entryClient } from "../../util.js"

function HistoryPage() {
    const [selectedEntry, setSelectedEntry] = useState({})
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data: entries } = useQuery({
        queryKey: ["entries"],
        queryFn: async () => {
            const res = await entryClient.get("/entries")
            return res.data.entries
        }
    })

    const onModalOpen = (entry) => {
        onOpen()
        setSelectedEntry(entry)
    }

    const onModalClose = () => {
        onClose()
        setSelectedEntry({})
    }

    const renderedEntries = entries?.map(entry => (
        <EntryCard
            key={entry.id}
            entry={entry}
            onModalOpen={onModalOpen}
        />
    ))

    return (
        <>
            <SimpleGrid gap={5}>{renderedEntries}</SimpleGrid>
            <DeleteModal
                isOpen={isOpen}
                onModalClose={onModalClose}
                selectedEntry={selectedEntry}
            />
        </>
    )
}

export default HistoryPage