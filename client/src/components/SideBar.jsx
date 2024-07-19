import { List, ListItem, Avatar, Flex, Box, Text } from "@chakra-ui/react"
import { NavLink, useNavigate } from "react-router-dom"
import entryClient from "../../util.js"

function SideBar() {
    const today = new Date().toLocaleDateString()
    const navigate = useNavigate()

    const handleLogout = async () => {
        const res = await entryClient.post("/auth/logout")
        navigate("/auth")
        console.log(res.data)
    }

    return (
        <List spacing={18}>
            <ListItem fontSize="xl">
                <NavLink to="/">DailyEntry</NavLink>
            </ListItem>

            <ListItem>
                <Flex alignItems="center" gap={3} mb={10}>
                    <Avatar size="sm" />
                    <Box>
                        <Text>Guest</Text>
                        <Text fontSize="xs">Today: {today}</Text>
                    </Box>
                </Flex>
            </ListItem>

            <ListItem>
                <NavLink to="/entry">
                    {/* style={({ isActive }) => {
                        return {
                            backgroundColor: isActive ? "red" : "",
                            display: "block",
                            padding: ".25em 0",
                            borderRadius: "5px"
                        }
                    }}> */}
                    New Entry</NavLink>
            </ListItem>
            <ListItem>
                <NavLink>Journal History</NavLink>
            </ListItem>
            <ListItem>
                <NavLink to="/goal">Goals</NavLink>
            </ListItem>
            <ListItem>
                <NavLink onClick={handleLogout}>Sign out</NavLink>
            </ListItem>
        </List >
    )
}

export default SideBar