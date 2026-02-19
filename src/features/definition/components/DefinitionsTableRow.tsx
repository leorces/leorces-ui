import React, {useState} from 'react'
import type {GroupedDefinition} from '../../../lib/utils/ProcessDefinitionUtils.ts'
import {Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material'
import AppLink from '../../../components/AppLink.tsx'
import {KeyboardArrowDown, KeyboardArrowUp} from '@mui/icons-material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import format from '../../../lib/utils/DateFormatUtils.ts'
import type {ProcessDefinition} from '../../../lib/model/definition/ProcessDefinition.ts'

interface DefinitionsTableRowProps {
    group: GroupedDefinition;
}

export default function DefinitionsTableRow({group}: DefinitionsTableRowProps) {
    const [open, setOpen] = useState(false)

    const renderRow = (data: ProcessDefinition) => (
        <>
            <TableCell>
                <AppLink href={`/definitions/${data.id}`}>{data.id}</AppLink>
            </TableCell>
            <TableCell>{data.name}</TableCell>
            <TableCell>{data.key}</TableCell>
            <TableCell>{data.version}</TableCell>
            <TableCell>{JSON.stringify(data.suspended)}</TableCell>
            <TableCell>{data.createdAt ? format(data.createdAt) : '-'}</TableCell>
        </>
    )

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                    </IconButton>
                </TableCell>
                {renderRow(group.latest)}
            </TableRow>
            <TableRow>
                <TableCell colSpan={7} sx={{padding: 0}}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom>
                                Previous Versions
                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Key</TableCell>
                                        <TableCell>Version</TableCell>
                                        <TableCell>Suspended</TableCell>
                                        <TableCell>Created</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {group.previousVersions.map((version) => (
                                        <TableRow key={version.id}>{renderRow(version)}</TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
