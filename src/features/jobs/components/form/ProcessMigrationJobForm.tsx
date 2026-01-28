import {useEffect, useState} from 'react'
import {Button, TextField, Typography} from '@mui/material'
import Box from '@mui/material/Box'
import type {ProcessMigrationPlan} from '../../../../lib/model/job/migration/ProcessMigrationPlan.ts'
import {generateProcessMigrationPlan} from '../../../../lib/rest/AdminClient.ts'
import {ServerError} from '../../../../lib/rest/error/ServerError.ts'
import AppSnackbar from '../../../../components/AppSnackbar.tsx'
import type {JobFormProps} from '../../RunJobPage.tsx'

export default function ProcessMigrationJobForm({
                                                    onChange
                                                }: JobFormProps<ProcessMigrationPlan>) {

    const [params, setParams] = useState<ProcessMigrationPlan>({
        definitionKey: '',
        fromVersion: 0,
        toVersion: 0,
        instructions: []
    })

    const [loading, setLoading] = useState(false)
    const [planGenerated, setPlanGenerated] = useState(false)

    const [snackbar, setSnackbar] = useState<{
        open: boolean
        message: string
        detailedMessage?: string
        severity: 'success' | 'error'
    }>({
        open: false,
        message: '',
        severity: 'success'
    })

    useEffect(() => {
        const baseValid =
            params.definitionKey.trim().length > 0 &&
            params.fromVersion > 0 &&
            params.toVersion > 0

        const instructionsValid =
            planGenerated &&
            params.instructions.every(i => i.toActivityId?.trim())

        const nextPayload = baseValid && instructionsValid ? params : null

        onChange(nextPayload)
    }, [params, planGenerated, onChange])

    useEffect(() => {
        if (!planGenerated) return

        setParams(prev => ({
            ...prev,
            instructions: []
        }))
        setPlanGenerated(false)
    }, [params.definitionKey, params.fromVersion, params.toVersion])

    const handleGenerateMigrationPlan = async () => {
        if (!params.definitionKey || params.fromVersion <= 0 || params.toVersion <= 0) return

        try {
            setLoading(true)

            const plan = await generateProcessMigrationPlan(params)

            setParams(prev => ({
                ...prev,
                instructions: plan.instructions.map(i => ({
                    fromActivityId: i.fromActivityId,
                    toActivityId: null
                }))
            }))

            setPlanGenerated(true)

            setSnackbar({
                open: true,
                message: 'Migration plan generated successfully!',
                severity: 'success'
            })
        } catch (error) {
            console.error('Failed to generate migration plan:', error)

            if (error instanceof ServerError) {
                setSnackbar({
                    open: true,
                    message: error.message,
                    detailedMessage: error.detailedMessage,
                    severity: 'error'
                })
            } else {
                setSnackbar({
                    open: true,
                    message: 'Failed to generate migration plan.',
                    severity: 'error'
                })
            }
        } finally {
            setLoading(false)
        }
    }

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({...prev, open: false}))
    }

    const handleInstructionChange = (index: number, value: string) => {
        setParams(prev => ({
            ...prev,
            instructions: prev.instructions.map((i, iIndex) =>
                iIndex === index ? {...i, toActivityId: value} : i
            )
        }))
    }

    return (
        <>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                <TextField
                    label="Process definition key"
                    value={params.definitionKey}
                    onChange={e =>
                        setParams(p => ({...p, definitionKey: e.target.value}))
                    }
                    fullWidth
                />

                <TextField
                    label="From process version"
                    type="number"
                    value={params.fromVersion || ''}
                    onChange={e =>
                        setParams(p => ({
                            ...p,
                            fromVersion: Number(e.target.value)
                        }))
                    }
                    fullWidth
                />

                <TextField
                    label="To process version"
                    type="number"
                    value={params.toVersion || ''}
                    onChange={e =>
                        setParams(p => ({
                            ...p,
                            toVersion: Number(e.target.value)
                        }))
                    }
                    fullWidth
                />
            </Box>

            {params.instructions.length === 0 ? (
                <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
                    <Button
                        variant="contained"
                        disabled={loading || !params.definitionKey || params.fromVersion <= 0 || params.toVersion <= 0}
                        onClick={handleGenerateMigrationPlan}
                    >
                        {loading ? 'Generating…' : 'Generate migration plan'}
                    </Button>
                </Box>
            ) : (
                <Box sx={{mt: 3, display: 'flex', flexDirection: 'column', gap: 2}}>
                    <Typography variant="subtitle1">
                        Migration instructions
                    </Typography>

                    {params.instructions.map((instruction, index) => (
                        <Box key={index} sx={{display: 'flex', gap: 2}}>
                            <TextField
                                label="From activity"
                                value={instruction.fromActivityId}
                                disabled
                                fullWidth
                            />
                            <TextField
                                label="To activity"
                                value={instruction.toActivityId ?? ''}
                                onChange={e =>
                                    handleInstructionChange(index, e.target.value)
                                }
                                fullWidth
                                required
                            />
                        </Box>
                    ))}
                </Box>
            )}

            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                detailedMessage={snackbar.detailedMessage}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </>
    )
}
