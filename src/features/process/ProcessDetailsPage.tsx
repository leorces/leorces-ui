import { useParams } from "react-router";
import {useEffect, useRef, useState} from "react";
import type {ProcessExecution} from "../../lib/model/runtime/ProcessExecution.ts";
import {fetchProcess} from "../../lib/rest/ProcessClient.ts";
import {ProcessState} from "../../lib/model/runtime/ProcessState.ts";
import BpmnViewer from "../../components/bpmn/BpmnViewer.tsx";
import Box from "@mui/material/Box";
import {Alert, CircularProgress} from "@mui/material";

export default function ProcessDetailsPage(){
    const {processId} = useParams();
    const [process, setProcess] = useState<ProcessExecution | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const loadProcess = async () => {
        try {
            const fetchedProcess = await fetchProcess(processId as string);
            setProcess(fetchedProcess);
        } catch {
            setError(`Failed to load process: ${processId}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProcess();
    }, [processId]);

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current as any);
            intervalRef.current = null;
        }

        if (process && (process.state === ProcessState.ACTIVE || process.state === ProcessState.INCIDENT)) {
            intervalRef.current = setInterval(() => {
                loadProcess();
            }, 2000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current as any);
                intervalRef.current = null;
            }
        };
    }, [process?.state, processId]);

    if (loading) {
        return (
            <Box sx={{p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px'}}>
                <CircularProgress/>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{p: 1}}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (!process) {
        return (
            <Box sx={{p: 1}}>
                <Alert severity="warning">No process found</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{p: 1}}>
            <BpmnViewer definition={process.definition} process={process}/>
        </Box>
    );
};
