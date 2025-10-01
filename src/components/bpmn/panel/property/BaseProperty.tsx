import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

interface BasePropertyProps {
    property: any
    value: any
}

export default function BaseProperty({property, value}: BasePropertyProps) {
    return (
        <Typography variant="body1">
            <Box component="span" fontWeight={500}>
                {property}:
            </Box>{" "}
            {value}
        </Typography>
    )
}