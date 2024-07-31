import { TabPanel, SimpleGrid } from "@chakra-ui/react"

function GoalTabPanel({ goals }) {
    return (
        <TabPanel p={0}>
            <SimpleGrid
                columns={{ base: 1, xl: 1 }}
                spacing={5}>
                {goals}
            </SimpleGrid>
        </TabPanel>
    )
}

export default GoalTabPanel