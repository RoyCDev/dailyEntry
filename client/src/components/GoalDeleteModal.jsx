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

function GoalDeleteModal({ isOpen, onModalClose, selectedGoal }) {
    const queryClient = useQueryClient()

    const { mutate: handleDelete } = useMutation({
        mutationFn: async () => {
            return await entryClient.delete(`/goals/${selectedGoal.id}`)
        },
        onSuccess: () => {
            onModalClose()
            queryClient.invalidateQueries({ queryKey: ["goals"] })
        },
    })

    return (
        <Modal isOpen={isOpen} onClose={onModalClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete goal</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to delete this goal?
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

export default GoalDeleteModal