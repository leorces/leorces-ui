import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "@/components/layout/AppHeader";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

export default ({
                    children,
                }: Readonly<{
    children: React.ReactNode;
}>) => (
    <>
        <CssBaseline/>
        <AppHeader/>
        <Box component="main">
            <Toolbar/>
            {children}
        </Box>
    </>
)
