import {useCallback, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {Container} from "@mui/material";
import type {PageableData} from "../../lib/model/pagination/PageableData.ts";
import type {Process} from "../../lib/model/runtime/Process.ts";
import {fetchProcesses} from "../../lib/rest/ProcessClient.ts";
import type {Pageable} from "../../lib/model/pagination/Pageable.ts";
import ProcessesTable from "./components/table/ProcessesTable.tsx";

export default function ProcessesPage() {
    const [data, setData] = useState<PageableData<Process> | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filter, setFilter] = useState<string | undefined>(undefined);
    const [state, setState] = useState<string | undefined>(undefined);

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const params: Record<string, any> = {page, limit: rowsPerPage};
            if (filter) params.filter = filter;
            if (state && state !== 'All') params.state = state.toUpperCase();

            const result = await fetchProcesses(params);
            setData(result);
        } catch (error) {
            console.error(error);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [page, rowsPerPage, filter, state]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleSearchParamsChange = useCallback((pageable: Pageable) => {
        const {page: newPage = 0, limit = 10, filter: newFilter, state: newState} = pageable;

        setPage(newPage);
        setRowsPerPage(limit);
        setFilter(newFilter);
        setState(newState);
    }, []);

    return (
        <Container sx={{p: 3}}>
            <Typography variant="h4" gutterBottom>
                Processes
            </Typography>
            <ProcessesTable
                data={data}
                loading={loading}
                onSearchParamsChange={handleSearchParamsChange}
            />
        </Container>
    );
}
