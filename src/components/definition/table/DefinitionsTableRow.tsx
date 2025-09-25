import React, {useState} from "react";
import {
    Box,
    Collapse,
    IconButton,
    Link,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";
import {GroupedDefinition} from "@/lib/utils/ProcessDefinitionUtils";
import format from "@/lib/utils/DateFormatUtils";

interface DefinitionsTableRowProps {
    group: GroupedDefinition;
}

export default function DefinitionsTableRow({group}: DefinitionsTableRowProps) {
    const [open, setOpen] = useState(false);
    const hasOlderVersions = group.previousVersions.length > 0;

    const renderRow = (data: Record<string, any>) => {
        return (
            <>
                <TableCell>
                    <Link href={`/definitions/${data.id}`} underline="hover">{data.id}</Link>
                </TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.key}</TableCell>
                <TableCell>{data.version}</TableCell>
                <TableCell>
                    {data.createdAt ? format(data.createdAt) : "-"}
                </TableCell>
            </>
        );
    };

    return (
        <React.Fragment>
            {/* Latest version */}
            <TableRow sx={{"& > *": {borderBottom: hasOlderVersions && !open ? "unset" : undefined}}}>
                <TableCell>
                    {hasOlderVersions && (
                        <IconButton size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                        </IconButton>
                    )}
                </TableCell>
                {renderRow(group.latest)}
            </TableRow>

            {/* Previous versions */}
            {hasOlderVersions && (
                <TableRow>
                    <TableCell colSpan={6} sx={{
                        paddingBottom: 0,
                        paddingTop: 0,
                        borderBottom: hasOlderVersions && !open ? "unset" : undefined
                    }}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{margin: 1}}>
                                <Typography variant="h6" gutterBottom>Previous Versions</Typography>
                                <Table size="small" sx={{"& .MuiTableRow-root:last-child td": {borderBottom: 0}}}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Key</TableCell>
                                            <TableCell>Version</TableCell>
                                            <TableCell>Created</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {group.previousVersions.map(version => (
                                            <TableRow key={version.id}>{renderRow(version)}</TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </React.Fragment>
    );
}
