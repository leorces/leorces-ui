import * as React from 'react';
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
} from '@mui/material';
import format from "@/lib/utils/DateFormatUtils";
import {PageableData} from "@/lib/model/pagination/PageableData";
import {Pageable} from "@/lib/model/pagination/Pageable";
import {Process} from "@/lib/model/runtime/Process";
import StateBadge from "@/components/StateBadge";
import AppLink from "@/components/AppLink";
import ProcessTableToolbar from "@/components/process/table/ProcessTableToolbar";

interface ProcessesTableProps {
    data: PageableData<Process> | null;
    loading: boolean;
    onSearchParamsChange: (pageable: Pageable) => void;
}

export default function ProcessesTable({data, loading, onSearchParamsChange}: ProcessesTableProps) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedState, setSelectedState] = React.useState('All');

    const getPageable = (page: number, limit: number, filter: string, state: string): Pageable => ({
        page,
        limit,
        filter: filter || undefined,
        state: state !== 'All' ? state : undefined
    });

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
        onSearchParamsChange(getPageable(newPage, rowsPerPage, searchTerm, selectedState));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLimit = +event.target.value;
        setRowsPerPage(newLimit);
        setPage(0);
        onSearchParamsChange(getPageable(0, newLimit, searchTerm, selectedState));
    };

    const handleStateChange = React.useCallback((value: string) => {
        setSelectedState(value);
        setPage(0);
        onSearchParamsChange(getPageable(0, rowsPerPage, searchTerm, value));
    }, [rowsPerPage, searchTerm, onSearchParamsChange]);

    const handleSearchChange = React.useCallback((value: string) => {
        setSearchTerm(value);
        setPage(0);
        onSearchParamsChange(getPageable(0, rowsPerPage, value, selectedState));
    }, [rowsPerPage, selectedState, onSearchParamsChange]);

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: '70vh'}}>
                {loading && <LinearProgress/>}
                <ProcessTableToolbar
                    onStateChange={handleStateChange}
                    onSearchChange={handleSearchChange}
                />
                <Table stickyHeader aria-label="processes table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Definition</TableCell>
                            <TableCell>Business Key</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>Started</TableCell>
                            <TableCell>Completed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.data?.map((process) => (
                            <TableRow key={process.id}>
                                <TableCell>
                                    <AppLink href={`/processes/${process.id}`}>{process.id}</AppLink>
                                </TableCell>
                                <TableCell>
                                    <AppLink href={`/definitions/${process.definition.id}`}>
                                        {process.definition.name}
                                    </AppLink>
                                </TableCell>
                                <TableCell>{process.businessKey}</TableCell>
                                <TableCell><StateBadge state={process.state}/></TableCell>
                                <TableCell>{process.startedAt ? format(process.startedAt) : "-"}</TableCell>
                                <TableCell>{process.completedAt ? format(process.completedAt) : "-"}</TableCell>
                            </TableRow>
                        ))}
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
    );
}
