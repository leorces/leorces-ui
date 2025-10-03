import type {ProcessExecution} from '../../../../lib/model/runtime/ProcessExecution'
import type {Variable} from '../../../../lib/model/runtime/Variable'
import React, {useEffect, useRef, useState} from 'react'
import {convertStringToValue} from '../../../../lib/utils/VariableUtils'
import {setLocalVariables} from '../../../../lib/rest/RuntimeClient.ts'
import {Alert, Snackbar, Stack, TextField} from '@mui/material'
import {isTerminal} from '../../../../lib/utils/StateUtils.ts'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import VariableProperty from './VariableProperty.tsx'

interface VariablesPropertyProps {
    process: ProcessExecution;
    executionId: string;
    variables: Variable[];
}

export default function VariablesProperty({process, executionId, variables}: VariablesPropertyProps) {
    const [values, setValues] = useState<Record<string, string>>({})
    const [newVariables, setNewVariables] = useState<{ key: string; value: string }[]>([])
    const prevVariablesRef = useRef<Variable[]>([])
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success'
    })

    useEffect(() => {
        const hasChanged =
            variables.length !== prevVariablesRef.current.length ||
            variables.some(
                (variable, i) =>
                    variable.varKey !== prevVariablesRef.current[i]?.varKey ||
                    variable.varValue !== prevVariablesRef.current[i]?.varValue
            )

        if (hasChanged) {
            setValues(Object.fromEntries(variables.map(variable => [variable.varKey, variable.varValue])))
            prevVariablesRef.current = variables
        }
    }, [variables])

    const handleChange = (key: string, newValue: string) => {
        setValues(prev => ({...prev, [key]: newValue}))
    }

    const handleNewVariableChange = (index: number, field: 'key' | 'value', val: string) => {
        setNewVariables(prev => {
            const updated = [...prev]
            updated[index] = {...updated[index], [field]: val}
            return updated
        })
    }

    const handleAddVariable = () => {
        setNewVariables(prev => [...prev, {key: '', value: ''}])
    }

    const handleUpdateAll = async () => {
        const changedValues: Record<string, any> = {}

        variables.forEach(v => {
            const currentValue = values[v.varKey]
            if (currentValue !== v.varValue) {
                changedValues[v.varKey] = convertStringToValue(currentValue)
            }
        })

        newVariables.forEach(v => {
            if (v.key.trim()) {
                changedValues[v.key] = convertStringToValue(v.value)
            }
        })

        if (Object.keys(changedValues).length === 0) return

        try {
            await setLocalVariables(executionId, changedValues)

            prevVariablesRef.current = variables.map(v => ({
                ...v,
                varValue: values[v.varKey]
            }))

            setNewVariables([])

            setSnackbar({open: true, message: 'Variables updated successfully!', severity: 'success'})
        } catch (error) {
            console.error('Failed to update variables:', error)
            setSnackbar({open: true, message: 'Failed to update variables.', severity: 'error'})
        }
    }

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({...prev, open: false}))
    }

    const isChanged =
        variables.some(v => values[v.varKey] !== v.varValue) ||
        newVariables.some(v => v.key.trim() !== '' && v.value !== '')

    return (
        <>
            <Stack spacing={1}>
                {[...variables]
                    .sort((a, b) => a.varKey.localeCompare(b.varKey))
                    .map((variable, index) => (
                        <React.Fragment key={variable.varKey}>
                            <VariableProperty
                                canChange={!isTerminal(process.state)}
                                variable={{...variable, varValue: values[variable.varKey]}}
                                onChange={(val) => handleChange(variable.varKey, val)}
                            />
                            {index < variables.length - 1 && <Divider/>}
                        </React.Fragment>
                    ))}

                {newVariables.map((v, index) => (
                    <Stack spacing={1} key={`new-${index}`} sx={{mt: 1}}>
                        <Divider/>
                        <TextField
                            size="small"
                            label="Key"
                            value={v.key}
                            onChange={(e) => handleNewVariableChange(index, 'key', e.target.value)}
                            fullWidth
                        />
                        <TextField
                            size="small"
                            label="Value"
                            value={v.value}
                            multiline
                            onChange={(e) => handleNewVariableChange(index, 'value', e.target.value)}
                            fullWidth
                        />
                        <Divider/>
                    </Stack>
                ))}

                {!isTerminal(process.state) && (
                    <Box sx={{mt: 1, display: 'flex', gap: 1}}>
                        <Button
                            variant="contained"
                            onClick={handleUpdateAll}
                            disabled={!isChanged}
                        >
                            Update
                        </Button>
                        <Button variant="outlined" onClick={handleAddVariable}>
                            Add
                        </Button>
                    </Box>
                )}
            </Stack>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{width: '100%'}}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    )
}
