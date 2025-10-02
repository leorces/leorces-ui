import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppLink from "../../../AppLink.tsx";

interface BasePropertyProps {
    property: string;
    value: any;
    link?: string;
}

export default function LinkProperty({property, value, link}: BasePropertyProps) {
    return (
        <Typography variant="body1">
            <Box component="span" fontWeight={500}>
                {property}:
            </Box>{" "}
            {link ? (
                <AppLink href={link}>
                    {value}
                </AppLink>
            ) : (
                value
            )}
        </Typography>
    )
}
