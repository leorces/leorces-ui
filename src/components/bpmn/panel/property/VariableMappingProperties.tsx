import React from 'react'
import type {VariableMapping} from '../../../../lib/model/definition/VariableMapping.ts'
import {Divider, Stack} from '@mui/material'
import BaseProperty from './BaseProperty.tsx'

interface VariableMappingPropertiesProps {
    mappings: VariableMapping[]
}

export default function VariableMappingProperties({mappings}: VariableMappingPropertiesProps) {
    return (
        <Stack spacing={1}>
            {mappings.map((mapping, index) => (
                <React.Fragment key={index}>
                    {mapping.variables && <BaseProperty property="Propagate all variables" value="true"/>}
                    {mapping.source && <BaseProperty property="Source" value={mapping.source}/>}
                    {mapping.target && <BaseProperty property="Target" value={mapping.target}/>}
                    {mapping.sourceExpression && (
                        <BaseProperty property="Source expression" value={mapping.sourceExpression}/>
                    )}
                    {index < mappings.length - 1 && <Divider/>}
                </React.Fragment>
            ))}
        </Stack>
    )
}
