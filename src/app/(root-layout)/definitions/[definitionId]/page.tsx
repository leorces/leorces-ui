"use client"
import BpmnViewer from "@/components/bpmn/BpmnViewer";
import Box from "@mui/material/Box";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {ProcessDefinition} from "@/lib/model/definition/ProcessDefinition";
import {fetchDefinition} from "@/lib/rest/DefinitionClient";
import {Alert, CircularProgress} from "@mui/material";

export default () => {
    const {definitionId} = useParams()
    const [definition, setDefinition] = useState<ProcessDefinition | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadDefinition = async () => {
            try {
                const processDefinition = await fetchDefinition(definitionId as string);
                setDefinition(processDefinition);
            } catch (err) {
                setError(`Failed to load definition: ${definitionId}`);
            } finally {
                setLoading(false);
            }
        };

        loadDefinition();
    }, [definitionId]);

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

    if (!definition) {
        return (
            <Box sx={{p: 1}}>
                <Alert severity="warning">No definition found</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{p: 1}}>
            <BpmnViewer definition={definition}/>
        </Box>
    )
}
