import {type ChangeEvent, useCallback, useMemo, useState} from 'react'
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
import type {PageableData} from '../../../lib/model/pagination/PageableData.ts'
import type {ProcessDefinition} from '../../../lib/model/definition/ProcessDefinition.ts'
import type {Pageable} from '../../../lib/model/pagination/Pageable.ts'
import {groupDefinitionsByKey, type GroupedDefinition} from '../../../lib/utils/ProcessDefinitionUtils.ts'
import DefinitionsTableRow from './DefinitionsTableRow.tsx'
import DefinitionsTableToolbar from './DefinitionsTableToolbar.tsx'

interface DefinitionsTableProps {
    data: PageableData<ProcessDefinition> | null
    loading: boolean
    onSearchParamsChange: (pageable: Pageable) => void
}

export default function DefinitionsTable({data, loading, onSearchParamsChange}: DefinitionsTableProps) {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState('')

    const groupedData: GroupedDefinition[] = useMemo(
        () => (data?.data ? groupDefinitionsByKey(data.data) : []),
        [data]
    )

    const updateParams = useCallback(
        (newPage: number, newLimit: number, filter: string) => {
            onSearchParamsChange({
                page: newPage,
                limit: newLimit,
                filter: filter || undefined
            })
        },
        [onSearchParamsChange]
    )

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage)
        updateParams(newPage, rowsPerPage, searchTerm)
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        const newLimit = +event.target.value
        setRowsPerPage(newLimit)
        setPage(0)
        updateParams(0, newLimit, searchTerm)
    }

    const handleSearchChange = useCallback(
        (value: string) => {
            setSearchTerm(value)
            setPage(0)
            updateParams(0, rowsPerPage, value)
        },
        [rowsPerPage, updateParams]
    )

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: '70vh', position: 'relative', minHeight: 200}}>
                {loading && (
                    <LinearProgress
                        sx={{position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 10}}
                    />
                )}

                <DefinitionsTableToolbar onSearchChange={handleSearchChange}/>

                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Key</TableCell>
                            <TableCell>Version</TableCell>
                            <TableCell>Suspended</TableCell>
                            <TableCell>Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groupedData.length ? (
                            groupedData.map(group => (
                                <DefinitionsTableRow key={group.latest.key} group={group}/>
                            ))
                        ) : !loading ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    No definitions found
                                </TableCell>
                            </TableRow>
                        ) : null}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={groupedData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}
