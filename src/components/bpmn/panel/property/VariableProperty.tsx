import {Variable} from "@/lib/model/runtime/Variable";
import {Box, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";

interface VariablePropertyProps {
    canChange: boolean;
    variable: Variable;
    onChange?: (updatedValue: string) => void;
}

export default function VariableProperty({canChange, variable, onChange}: VariablePropertyProps) {
    const [value, setValue] = useState(variable.varValue);

    useEffect(() => {
        try {
            const parsed = JSON.parse(variable.varValue);
            setValue(JSON.stringify(parsed, null, 2));
        } catch {
            setValue(variable.varValue);
        }
    }, [variable.varValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange?.(e.target.value);
    };

    return (
        <Box sx={{mb: 1}}>
            <TextField
                disabled={!canChange}
                label={variable.varKey}
                value={value}
                onChange={handleChange}
                size="small"
                fullWidth
                variant="outlined"
                multiline
                sx={{
                    fontFamily: 'monospace',
                    "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                    },
                }}
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                }}
            />
        </Box>
    );
}
