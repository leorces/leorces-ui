import {TextField, Toolbar} from '@mui/material'
import {type ChangeEvent, useEffect, useState} from 'react'
import {useDebouncedValue} from '../../../lib/hooks/useDebouncedValue.ts'

interface DefinitionsTableToolbarProps {
    onSearchChange: (value: string) => void
}

export default function DefinitionsTableToolbar({onSearchChange}: DefinitionsTableToolbarProps) {
    const [searchValue, setSearchValue] = useState('')

    const debouncedSearch = useDebouncedValue(searchValue, 500)

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
