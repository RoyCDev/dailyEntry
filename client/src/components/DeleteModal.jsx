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

    const { mutate: handleDelete } = selectedGoal ?
        useMutation({
            mutationFn: async () => {
                return await entryClient.delete(`/goals/${selectedGoal.id}`)
            },
            onSuccess: () => {
                onModalClose()
                queryClient.invalidateQueries({ queryKey: ["goals"] })
            },
        }) :
        useMutation({
            mutationFn: async () => {
                return await entryClient.delete(`/entries/${selectedEntry.id}`)
            },
            onSuccess: () => {
                onModalClose()
                queryClient.invalidateQueries({ queryKey: ["entries"] })
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
                    <Button colorScheme='brand' mr={2} onClick={handleDelete}>
                        Yes
                    </Button>
                    <Button variant='ghost' onClick={onModalClose}>
                        No
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteModal