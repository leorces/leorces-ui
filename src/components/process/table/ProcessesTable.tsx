import * as React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';
import format from "@/lib/utils/DateFormatUtils";
import {PageableData} from "@/lib/model/pagination/PageableData";
import {Process} from "@/lib/model/runtime/Process";
import StateBadge from "@/components/StateBadge";
import EmptyState from "@/components/EmptyState";
import AppLink from "@/components/AppLink";

interface ProcessesTableProps {
    data: PageableData<Process> | null;
    loading: boolean;
    onPageChange: (page: number, rowsPerPage: number) => void;
}

export default function ProcessesTable({data, loading, onPageChange}: ProcessesTableProps) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
        onPageChange(newPage, rowsPerPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = +event.target.value;
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        onPageChange(0, newRowsPerPage);
    };

    if (loading || !data?.data?.length) {
        return <EmptyState loading={loading}/>;
    }

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: '70vh'}}>
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
                        {data.data.map((process) => (
                            <TableRow key={process.id}>
                                <TableCell>
                                    <AppLink href={`/processes/${process.id}`}>
                                        {process.id}
                                    </AppLink>
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
                count={data.total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
