import {FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField, Toolbar} from '@mui/material'
import {type ChangeEvent, useEffect, useState} from 'react'
import {useDebouncedValue} from '../../../lib/hooks/useDebouncedValue.ts'

interface ProcessTableToolbarProps {
    onStateChange: (value: string) => void;
    onSearchChange: (value: string) => void;
}

const STATES = [
    'All',
    'Active',
    'Completed',
    'Terminated',
    'Incident'
] as const

export default function ProcessTableToolbar(
    {
        onStateChange,
        onSearchChange
    }: ProcessTableToolbarProps
) {
    const [selectedState, setSelectedState] = useState<typeof STATES[number]>('All')
    const [searchValue, setSearchValue] = useState('')

    const debouncedSearch = useDebouncedValue(searchValue, 500)

    const handleStateChange = (event: SelectChangeEvent) => {
        const value = event.target.value as typeof STATES[number]
        setSelectedState(value)
        onStateChange(value)
    }

    const handleSearchChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSearchValue(event.target.value)
    }

    useEffect(() => {
        onSearchChange(debouncedSearch)
    }, [debouncedSearch, onSearchChange])

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1}
            }}
        >
            <div style={{flex: 1}}/>

            <FormControl size="small" sx={{minWidth: 160, mr: 2}}>
                <InputLabel id="state-select-label">State</InputLabel>
                <Select
                    labelId="state-select-label"
                    value={selectedState}
                    label="State"
                    onChange={handleStateChange}
                >
                    {STATES.map((s) => (
                        <MenuItem key={s} value={s}>
                            {s}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                id="filter-input"
                label="Search"
                variant="outlined"
                size="small"
                sx={{minWidth: 250}}
                value={searchValue}
                onChange={handleSearchChange}
            />
        </Toolbar>
    )
}
