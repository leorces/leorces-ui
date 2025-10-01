import {Box, Typography} from "@mui/material";
import React from "react";
import AppLink from "@/components/AppLink";

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
