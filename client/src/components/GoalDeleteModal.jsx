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

function GoalDeleteModal({ isOpen, onOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete goal</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to delete this goal?
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='brand' mr={2} onClick={onClose}>
                        Yes
                    </Button>
                    <Button variant='ghost' onClick={onClose}>No</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default GoalDeleteModal