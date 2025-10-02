import type {PageableData} from "../../../lib/model/pagination/PageableData.ts";
import type {ProcessDefinition} from "../../../lib/model/definition/ProcessDefinition.ts";
import type {Pageable} from "../../../lib/model/pagination/Pageable.ts";
import {groupDefinitionsByKey, type GroupedDefinition} from "../../../lib/utils/ProcessDefinitionUtils.ts";
import {useCallback, useMemo, useState} from "react";
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
} from "@mui/material";
import DefinitionsTableToolbar from "./DefinitionsTableToolbar.tsx";
import DefinitionsTableRow from "./DefinitionsTableRow.tsx";

interface DefinitionsTableProps {
    data: PageableData<ProcessDefinition> | null;
    loading: boolean;
    onSearchParamsChange: (pageable: Pageable) => void;
}

export default function DefinitionsTable({data, loading, onSearchParamsChange}: DefinitionsTableProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    const groupedData: GroupedDefinition[] = useMemo(
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

    const handleSearchChange = useCallback((value: string) => {
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
