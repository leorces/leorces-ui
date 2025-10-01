import React from "react";
import {Box, Stack, Typography} from "@mui/material";

interface ConditionPropertyProps {
    condition?: Record<string, string[] | string> | string;
}

export default function ConditionProperty({condition}: ConditionPropertyProps) {
    if (!condition) return null;

    if (typeof condition === "string") {
        const expression = condition.replace(/^\$\{|\}$/g, "");
        return (
            <Box
                sx={{
                    bgcolor: "grey.100",
                    p: 1,
                    borderRadius: 1,
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                }}
            >
                {expression}
            </Box>
        );
    }

    const entries = Object.entries(condition);

    return (
        <Stack spacing={2}>
            {entries.map(([expr, target], idx) => {
                const expression = expr.replace(/^\$\{|\}$/g, "");
                const values = Array.isArray(target) ? target : [target];

                return (
                    <Box
                        key={idx}
                        sx={{
                            bgcolor: "grey.50",
                            border: "1px solid #ddd",
                            borderRadius: 1,
                            p: 1,
                            fontSize: "0.85rem",
                        }}
                    >
                        <Typography component="div" sx={{fontWeight: 500}}>
                            {expr === "" ? "Default" : `if (${expression})`}
                        </Typography>

                        <Stack spacing={0.5} sx={{ml: 2, mt: 0.5}}>
                            {values.map((val, i) => (
                                <Typography
                                    key={i}
                                    component="div"
                                >
                                    → {val}
                                </Typography>
                            ))}
                        </Stack>
                    </Box>
                );
            })}
        </Stack>
    );
}
