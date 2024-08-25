import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { entryClient } from "../../util.js"

function DeleteModal({ isOpen, onModalClose, selectedGoal, selectedEntry }) {
    const queryClient = useQueryClient()

    const { mutate: handleDelete } = useMutation({
        mutationFn: async () => {
            return selectedGoal ?
                await entryClient.delete(`/goals/${selectedGoal.id}`) :
                await entryClient.delete(`/entries/${selectedEntry.id}`)
        },
        onSuccess: () => {
            onModalClose()
            queryClient.invalidateQueries({ queryKey: selectedGoal ? ["goals"] : ["entries"] })
        },
    })

    return (
        <Modal isOpen={isOpen} onClose={onModalClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete {selectedGoal ? "goal" : "entry"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to delete this {selectedGoal ? "goal" : "entry"}?
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='brand' mr={2} onClick={handleDelete} fontWeight={600}>
                        Yes
                    </Button>
                    <Button variant='ghost' onClick={onModalClose} fontWeight={600}>
                        No
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteModal