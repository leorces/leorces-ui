import AppHeader from "./AppHeader.tsx";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {CssBaseline} from "@mui/material";
import {Outlet} from "react-router";

export default function Layout() {
    return (
        <>
            <CssBaseline/>
            <AppHeader/>
            <Box component="main">
                <Toolbar/>
                <Outlet/>
            </Box>
        </>
    )
}