import * as React from "react";
import {FormControl, InputLabel, MenuItem, Select, TextField, Toolbar} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select";

interface ProcessTableToolbarProps {
    onStateChange: (value: string) => void;
    onSearchChange: (value: string) => void;
}

const states = [
    "All",
    "Active",
    "Completed",
    "Canceled",
    "Terminated",
    "Incident"
];

export default function ProcessTableToolbar({onStateChange, onSearchChange}: ProcessTableToolbarProps) {
    const [selectedState, setSelectedState] = React.useState(states[0]);
    const [searchValue, setSearchValue] = React.useState("");

    const handleStateChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setSelectedState(value);
        onStateChange(value);
    };

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

            <FormControl size="small" sx={{minWidth: 160, mr: 2}}>
                <InputLabel id="state-select-label">State</InputLabel>
                <Select
                    labelId="state-select-label"
                    value={selectedState}
                    label="State"
                    onChange={handleStateChange}
                >
                    {states.map((s) => (
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
    );
}
