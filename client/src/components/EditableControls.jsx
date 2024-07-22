import { useEditableControls, ButtonGroup, Button } from "@chakra-ui/react"
import { CheckIcon, EditIcon, DeleteIcon, CloseIcon } from '@chakra-ui/icons'

function EditableControls({ onModalOpen }) {
    const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
        <ButtonGroup variant="ghost" size="sm" spacing={0}>
            <Button leftIcon={<CheckIcon />} fontWeight="400"
                {...getSubmitButtonProps()}>
                Save
            </Button>
            <Button leftIcon={<CloseIcon />} fontWeight="400"
                {...getCancelButtonProps()}>
                Cancel
            </Button>
        </ButtonGroup>
    ) : (
        <ButtonGroup variant="ghost" size="sm" spacing={0}>
            <Button leftIcon={<EditIcon />} fontWeight="400"
                {...getEditButtonProps()}>
                Edit
            </Button>
            <Button leftIcon={<DeleteIcon />} fontWeight="400"
                onClick={onModalOpen}>
                Delete
            </Button>
        </ButtonGroup>
    )
}

export default EditableControls