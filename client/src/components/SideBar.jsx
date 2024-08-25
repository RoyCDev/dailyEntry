import { List, ListItem, Avatar, Flex, Box, Text, IconButton, useDisclosure, Collapse, Show, Hide } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import { NavLink, useNavigate } from "react-router-dom"
import { entryClient } from "../../util.js"

function HoverListItem({ children }) {
    return (
        <ListItem lineHeight={8} _hover={{ bg: 'brand.400', borderRadius: 8 }}>
            {children}
        </ListItem>
    )
}

function SideBar() {
    const { isOpen, onToggle } = useDisclosure()
    const today = new Date().toLocaleDateString()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await entryClient.post("/auth/logout")
        navigate("/auth")
    }

    const list =
        <List spacing={2} mt={18}>
            <ListItem>
                <Flex alignItems="center" gap={3} mb={8}>
                    <Avatar size="sm" />
                    <Box>
                        <Text>Guest</Text>
                        <Text fontSize="xs">Today: {today}</Text>
                    </Box>
                </Flex>
            </ListItem>

            <HoverListItem>
                <NavLink to="/entry">New Entry</NavLink>
            </HoverListItem>
            <HoverListItem>
                <NavLink to="/history">Journal History</NavLink>
            </HoverListItem>
            <HoverListItem>
                <NavLink to="/goal">Goals</NavLink>
            </HoverListItem>
            <HoverListItem>
                <NavLink onClick={handleLogout}>Sign out</NavLink>
            </HoverListItem>
        </List >

    return (
        <>
            <Flex fontSize="xl" justifyContent="space-between">
                <NavLink to="/">DailyEntry</NavLink>
                <IconButton size="xl" variant="unstyled" display={{ md: "none" }}
                    onClick={onToggle}
                    icon={<HamburgerIcon />} />
            </Flex>

            <Hide above="md">
                <Collapse in={isOpen} startingHeight={1}>
                    {list}
                </Collapse >
            </Hide>
            <Show above="md">{list}</Show>
        </>
    )
}

export default SideBar


/* display={{ base: expand ? "block" : "none", md: "block" }} */
