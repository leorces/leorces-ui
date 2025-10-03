import Box from '@mui/material/Box'
import {Stack} from '@mui/material'
import Typography from '@mui/material/Typography'

interface ConditionPropertyProps {
    condition?: Record<string, string[] | string> | string;
}

export default function ConditionProperty({condition}: ConditionPropertyProps) {
    if (!condition) return null

    const formatExpression = (expr: string) => expr.replace(/^\$\{|}$/g, '')

    if (typeof condition === 'string') {
        return (
            <Box
                sx={{
                    bgcolor: 'grey.100',
                    p: 1,
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                }}
            >
                {formatExpression(condition)}
            </Box>
        )
    }

    return (
        <Stack spacing={2}>
            {Object.entries(condition).map(([expr, target], idx) => {
                const values = Array.isArray(target) ? target : [target]

                return (
                    <Box
                        key={idx}
                        sx={{
                            bgcolor: 'grey.50',
                            border: '1px solid #ddd',
                            borderRadius: 1,
                            p: 1,
                            fontSize: '0.85rem'
                        }}
                    >
                        <Typography component="div" sx={{fontWeight: 500}}>
                            {expr === '' ? 'Default' : `if (${formatExpression(expr)})`}
                        </Typography>

                        <Stack spacing={0.5} sx={{ml: 2, mt: 0.5}}>
                            {values.map((val, i) => (
                                <Typography key={i} component="div">
                                    → {val}
                                </Typography>
                            ))}
                        </Stack>
                    </Box>
                )
            })}
        </Stack>
    )
}
