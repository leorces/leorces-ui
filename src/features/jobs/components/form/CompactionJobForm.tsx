import {useEffect} from 'react'
import {Box, Typography} from '@mui/material'
import type {JobFormProps} from '../../RunJobPage.tsx'

export default function CompactionJobForm({onChange}: JobFormProps<null>) {
    useEffect(() => {
        onChange({} as unknown as null)
    }, [onChange])

    return (
        <Box sx={{mt: 2}}>
            <Typography>
                This job does not require any parameters. Click "Run" to start the compaction.
            </Typography>
        </Box>
    )
}
