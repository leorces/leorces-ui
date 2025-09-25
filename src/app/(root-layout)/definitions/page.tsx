"use client"
import DefinitionsTable from "@/components/definition/table/DefinitionsTable";
import {Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useCallback, useEffect, useState} from "react";
import {fetchDefinitions} from "@/lib/rest/DefinitionClient";
import {PageableData} from "@/lib/model/pagination/PageableData";
import {ProcessDefinition} from "@/lib/model/definition/ProcessDefinition";

export default () => {
    const [data, setData] = useState<PageableData<ProcessDefinition> | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const loadData = useCallback(async (pageNum: number, limit: number) => {
        setLoading(true);
        try {
            const result = await fetchDefinitions({page: pageNum, limit: limit});
            setData(result);
        } catch (error) {
            setData(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData(page, rowsPerPage);
    }, [loadData, page, rowsPerPage]);

    const handlePageChange = useCallback((newPage: number, newRowsPerPage: number) => {
        setPage(newPage);
        if (newRowsPerPage !== rowsPerPage) {
            setRowsPerPage(newRowsPerPage);
        }
    }, [rowsPerPage]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Definitions
            </Typography>
            <DefinitionsTable
                data={data}
                loading={loading}
                onPageChange={handlePageChange}
            />
        </Container>
    )
}
