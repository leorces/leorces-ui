import {useCallback, useEffect, useState} from "react";
import type {PageableData} from "../../lib/model/pagination/PageableData.ts";
import type {ProcessDefinition} from "../../lib/model/definition/ProcessDefinition.ts";
import {fetchDefinitions} from "../../lib/rest/DefinitionClient.ts";
import type {Pageable} from "../../lib/model/pagination/Pageable.ts";
import {Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import DefinitionsTable from "./table/DefinitionsTable.tsx";

export default function DefinitionsPage() {
    const [data, setData] = useState<PageableData<ProcessDefinition> | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filter, setFilter] = useState<string | undefined>(undefined);

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const params: Pageable = {page, limit: rowsPerPage};
            if (filter) params.filter = filter;

            const result = await fetchDefinitions(params);
            setData(result);
        } catch {
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [page, rowsPerPage, filter]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleSearchParamsChange = useCallback((pageable: Pageable) => {
        const {page: newPage = 0, limit = 10, filter: newFilter} = pageable;

        setPage(newPage);
        setRowsPerPage(limit);
        setFilter(newFilter);
    }, []);

    return (
        <Container sx={{p: 3}}>
            <Typography variant="h4" gutterBottom>
                Definitions
            </Typography>
            <DefinitionsTable
                data={data}
                loading={loading}
                onSearchParamsChange={handleSearchParamsChange}
            />
        </Container>
    );
}
