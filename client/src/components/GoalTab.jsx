import { Badge, Tab } from "@chakra-ui/react"

function GoalTab({ children, badge }) {
    return (
        <Tab fontWeight="400">
            {children}
            <Badge
                ml={1}
                px={1.5}
                borderRadius="full"
                variant="solid"
                colorScheme="brand">
                {badge}
            </Badge>
        </Tab>
    )
}

export default GoalTab