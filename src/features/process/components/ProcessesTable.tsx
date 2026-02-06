import type {PageableData} from '../../../lib/model/pagination/PageableData.ts'
import type {Process} from '../../../lib/model/runtime/Process.ts'
import type {Pageable} from '../../../lib/model/pagination/Pageable.ts'
import {type ChangeEvent, useCallback, useState} from 'react'
import {
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material'
import ProcessTableToolbar from './ProcessTableToolbar.tsx'
import format from '../../../lib/utils/DateFormatUtils.ts'
import AppLink from '../../../components/AppLink.tsx'
import StateBadge from '../../../components/StateBadge.tsx'

interface ProcessesTableProps {
    data: PageableData<Process> | null;
    loading: boolean;
    onSearchParamsChange: (pageable: Pageable) => void;
}

export default function ProcessesTable({data, loading, onSearchParamsChange}: ProcessesTableProps) {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedState, setSelectedState] = useState('All')

    const updateParams = useCallback(
        (newPage: number, newLimit: number, filter: string, state: string) => {
            onSearchParamsChange({
                page: newPage,
                limit: newLimit,
                filter: filter || undefined,
                state: state !== 'All' ? state : undefined
            })
        },
        [onSearchParamsChange]
    )

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage)
        updateParams(newPage, rowsPerPage, searchTerm, selectedState)
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        const newLimit = +event.target.value
        setRowsPerPage(newLimit)
        setPage(0)
        updateParams(0, newLimit, searchTerm, selectedState)
    }

    const handleStateChange = useCallback(
        (value: string) => {
            setSelectedState(value)
            setPage(0)
            updateParams(0, rowsPerPage, searchTerm, value)
        },
        [rowsPerPage, searchTerm, updateParams]
    )

    const handleSearchChange = useCallback(
        (value: string) => {
            setSearchTerm(value)
            setPage(0)
            updateParams(0, rowsPerPage, value, selectedState)
        },
        [rowsPerPage, selectedState, updateParams]
    )

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: '70vh', position: 'relative', minHeight: 200}}>
                {loading && (
                    <LinearProgress
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            zIndex: 10
                        }}
                    />
                )}

                <ProcessTableToolbar
                    onStateChange={handleStateChange}
                    onSearchChange={handleSearchChange}
                />

                <Table stickyHeader aria-label="processes table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Business Key</TableCell>
                            <TableCell>Definition</TableCell>
                            <TableCell>Version</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>Started</TableCell>
                            <TableCell>Completed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.data?.length ? (
                            data.data.map((process) => (
                                <TableRow key={process.id}>
                                    <TableCell>
                                        <AppLink href={`/processes/${process.id}`}>
                                            {process.id}
                                        </AppLink>
                                    </TableCell>
                                    <TableCell>{process.businessKey}</TableCell>
                                    <TableCell>
                                        <AppLink href={`/definitions/${process.definition.id}`}>
                                            {process.definition.name}
                                        </AppLink>
                                    </TableCell>
                                    <TableCell>
                                        {process.definition.version}
                                    </TableCell>
                                    <TableCell>
                                        <StateBadge execution={process}/>
                                    </TableCell>
                                    <TableCell>{process.startedAt ? format(process.startedAt) : '-'}</TableCell>
                                    <TableCell>{process.completedAt ? format(process.completedAt) : '-'}</TableCell>
                                </TableRow>
                            ))
                        ) : !loading ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    No processes found
                                </TableCell>
                            </TableRow>
                        ) : null}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data?.total ?? 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}
