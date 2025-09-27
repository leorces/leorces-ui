import * as React from "react";
import {TextField, Toolbar} from "@mui/material";

interface DefinitionsTableToolbarProps {
    onSearchChange: (value: string) => void;
}

export default function DefinitionsTableToolbar({onSearchChange}: DefinitionsTableToolbarProps) {
    const [searchValue, setSearchValue] = React.useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchValue(event.target.value);
    };

    React.useEffect(() => {
        const handler = setTimeout(() => {
            onSearchChange(searchValue);
        }, 500);

        return () => clearTimeout(handler);
    }, [searchValue, onSearchChange]);

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
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
    );
}