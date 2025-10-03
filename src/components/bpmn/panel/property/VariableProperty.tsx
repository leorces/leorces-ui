import type {Variable} from '../../../../lib/model/runtime/Variable.ts'
import {useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import {TextField} from '@mui/material'

interface VariablePropertyProps {
    canChange: boolean;
    variable: Variable;
    onChange?: (updatedValue: string) => void;
}

export default function VariableProperty({canChange, variable, onChange}: VariablePropertyProps) {
    const [value, setValue] = useState<string>(() => formatValue(variable.varValue))

    function formatValue(val: string): string {
        try {
            const parsed = JSON.parse(val)
            return JSON.stringify(parsed, null, 2)
        } catch {
            return val
        }
    }

    useEffect(() => {
        setValue(formatValue(variable.varValue))
    }, [variable.varValue])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue)
        onChange?.(newValue)
    }

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
                    '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000000'
                    }
                }}
                slotProps={{
                    inputLabel: {shrink: true}
                }}
            />
        </Box>
    )
}
