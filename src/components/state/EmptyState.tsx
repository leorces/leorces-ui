import {Box, CircularProgress} from "@mui/material";
import * as React from "react";

interface EmptyStateProps {
    loading: boolean;
    message?: string;
}

export default function EmptyState({loading, message = "No data available"}: EmptyStateProps) {
    return (
        <Box
            sx={{
                width: "100%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 400
            }}
        >
            {loading ? <CircularProgress/> : <Box>{message}</Box>}
        </Box>
    )
}