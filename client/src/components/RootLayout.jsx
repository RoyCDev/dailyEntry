import { Outlet } from "react-router-dom"
import { Grid, GridItem } from "@chakra-ui/react";
import SideBar from "./SideBar"

function RootLayout() {
    return (
        <Grid
            templateColumns="repeat(5, 1fr)"
            fontFamily="sans-serif">
            <GridItem bg="#51645d" color="white" h="100vh" px={5} pt={5}>
                <SideBar />
            </GridItem>

            <GridItem colSpan={4} bg="#e8e8e8">
                <Outlet />
            </GridItem>
        </Grid >
    )
}

export default RootLayout