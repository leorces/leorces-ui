import * as React from "react";
import {
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import {PageableData} from "@/lib/model/pagination/PageableData";
import {Pageable} from "@/lib/model/pagination/Pageable";
import {groupDefinitionsByKey, GroupedDefinition} from "@/lib/utils/ProcessDefinitionUtils";
import {ProcessDefinition} from "@/lib/model/definition/ProcessDefinition";
import DefinitionsTableRow from "@/components/definition/table/DefinitionsTableRow";
import DefinitionsTableToolbar from "@/components/definition/table/DefinitionsTableToolbar";

interface DefinitionsTableProps {
    data: PageableData<ProcessDefinition> | null;
    loading: boolean;
    onSearchParamsChange: (pageable: Pageable) => void;
}

export default function DefinitionsTable({data, loading, onSearchParamsChange}: DefinitionsTableProps) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchTerm, setSearchTerm] = React.useState('');

    const groupedData: GroupedDefinition[] = React.useMemo(
        () => (data?.data ? groupDefinitionsByKey(data.data) : []),
        [data]
    );

    const getPageable = (page: number, limit: number, filter: string): Pageable => ({
        page,
        limit,
        filter: filter || undefined
    });

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
        onSearchParamsChange(getPageable(newPage, rowsPerPage, searchTerm));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLimit = +event.target.value;
        setRowsPerPage(newLimit);
        setPage(0);
        onSearchParamsChange(getPageable(0, newLimit, searchTerm));
    };

    const handleSearchChange = React.useCallback((value: string) => {
        setSearchTerm(value);
        setPage(0);
        onSearchParamsChange(getPageable(0, rowsPerPage, value));
    }, [rowsPerPage, onSearchParamsChange]);

    return (
        <Paper sx={{width: "100%", overflow: "hidden"}}>
            <TableContainer sx={{maxHeight: "70vh"}}>
                {loading && <LinearProgress/>}
                <DefinitionsTableToolbar onSearchChange={handleSearchChange}/>
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
