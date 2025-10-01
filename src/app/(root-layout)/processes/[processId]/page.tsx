"use client"
import BpmnViewer from "@/components/bpmn/BpmnViewer";
import Box from "@mui/material/Box";
import {useParams} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {Alert, CircularProgress} from "@mui/material";
import {fetchProcess} from "@/lib/rest/ProcessClient";
import {ProcessExecution} from "@/lib/model/runtime/ProcessExecution";
import {ProcessState} from "@/lib/model/runtime/ProcessState";

export default () => {
    const {processId} = useParams();
    const [process, setProcess] = useState<ProcessExecution | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const loadProcess = async () => {
        try {
            const fetchedProcess = await fetchProcess(processId as string);
            setProcess(fetchedProcess);
        } catch (err) {
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
