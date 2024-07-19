import { Outlet } from "react-router-dom"
import { Grid, GridItem } from "@chakra-ui/react";
import SideBar from "./SideBar"

function RootLayout() {
    return (
        <Grid templateColumns="repeat(20, 1fr)" h={{ md: "100vh" }}>
            <GridItem bg="#51645d" color="white" p={5}
                colSpan={{ base: 20, md: 6, lg: 5, xl: 4 }}>
                <SideBar />
            </GridItem>

            <GridItem bg="#e8e8e8" px={5} pt={5}
                colSpan={{ base: 20, md: 14, lg: 15, xl: 16 }} >
                <Outlet />
            </GridItem>
        </Grid >
    )
}

export default RootLayout