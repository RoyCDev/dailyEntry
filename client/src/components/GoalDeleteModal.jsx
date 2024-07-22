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

function GoalDeleteModal({ isOpen, onModalClose, onDelete }) {
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
                    <Button colorScheme='brand' mr={2} onClick={onDelete}>
                        Yes
                    </Button>
                    <Button variant='ghost' onClick={onModalClose}>No</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default GoalDeleteModal