import React from 'react'
import {Accordion, AccordionDetails, AccordionSummary, Box, Chip, Typography} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface PropertiesAccordionProps {
    title: string;
    children: React.ReactNode;
    count?: number;
    defaultExpanded?: boolean;
}

export default function PropertiesAccordion({
                                                title,
                                                children,
                                                count,
                                                defaultExpanded = false
                                            }: PropertiesAccordionProps) {
    return (
        <Accordion defaultExpanded={defaultExpanded}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls={`${title}-content`}
                id={`${title}-header`}
            >
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography component="span">{title}</Typography>
                    {count !== undefined && <Chip label={count} size="small"/>}
                </Box>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    )
}
