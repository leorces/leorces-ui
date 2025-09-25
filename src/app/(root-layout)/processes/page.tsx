"use client"
import {useCallback, useEffect, useState} from "react";
import {PageableData} from "@/lib/model/pagination/PageableData";
import {fetchProcesses} from "@/lib/rest/ProcessClient";
import {Process} from "@/lib/model/runtime/Process";
import Typography from "@mui/material/Typography";
import {Container} from "@mui/material";
import ProcessesTable from "@/components/process/table/ProcessesTable";

export default () => {
    const [data, setData] = useState<PageableData<Process> | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const loadData = useCallback(async (pageNum: number, limit: number) => {
        setLoading(true);
        try {
            const result = await fetchProcesses({page: pageNum, limit: limit});
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
                Processes
            </Typography>
            <ProcessesTable
                data={data}
                loading={loading}
                onPageChange={handlePageChange}
            />
        </Container>
    )
}
