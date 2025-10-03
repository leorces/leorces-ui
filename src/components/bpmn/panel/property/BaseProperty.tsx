import {Box} from '@mui/material'
import Typography from '@mui/material/Typography'

interface BasePropertyProps {
    property: string
    value: string | number | boolean | null | undefined
}

export default function BaseProperty({property, value}: BasePropertyProps) {
    return (
        <Typography variant="body1">
            <Box component="span" fontWeight={500}>
                {property}:
            </Box>{' '}
            {value}
        </Typography>
    )
}