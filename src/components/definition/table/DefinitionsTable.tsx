import * as React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,} from "@mui/material";
import {PageableData} from "@/lib/model/pagination/PageableData";
import {groupDefinitionsByKey, GroupedDefinition} from "@/lib/utils/ProcessDefinitionUtils";
import {ProcessDefinition} from "@/lib/model/definition/ProcessDefinition";
import DefinitionsTableRow from "@/components/definition/table/DefinitionsTableRow";
import EmptyState from "@/components/state/EmptyState";

interface DefinitionsTableProps {
    data: PageableData<ProcessDefinition> | null;
    loading: boolean;
    onPageChange: (page: number, rowsPerPage: number) => void;
}

export default function DefinitionsTable({data, loading, onPageChange}: DefinitionsTableProps) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const groupedData: GroupedDefinition[] = React.useMemo(
        () => (data?.data ? groupDefinitionsByKey(data.data) : []),
        [data]
    );

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
        <Paper sx={{width: "100%", overflow: "hidden"}}>
            <TableContainer sx={{maxHeight: "70vh"}}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Key</TableCell>
                            <TableCell>Version</TableCell>
                            <TableCell>Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groupedData.map(group => (
                            <DefinitionsTableRow key={group.latest.key} group={group}/>
                        ))}
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
    );
}
