import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import type {TransitionProps} from '@mui/material/transitions'
import type {ActivityFailure} from '../../../../lib/model/runtime/ActivityFailure.ts'
import BaseProperty from './BaseProperty.tsx'
import {Stack} from '@mui/material'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />
})

interface FailurePropertyProps {
    failure: ActivityFailure;
}

export default function FailureProperty({failure}: FailurePropertyProps) {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Stack spacing={1}>
            {failure.reason && <BaseProperty property="Name" value={failure.reason}/>}
            {failure.trace &&
                <React.Fragment>
                    <Button variant="contained" onClick={handleClickOpen}>
                        Open trace
                    </Button>
                    <Dialog
                        fullScreen
                        open={open}
                        onClose={handleClose}
                        slots={{
                            transition: Transition
                        }}
                    >
                        <AppBar sx={{position: 'relative'}}>
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="close"
                                >
                                    <CloseIcon/>
                                </IconButton>
                                <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                                    Trace
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Stack spacing={1} padding={1}>
                            <Typography variant="h6" gutterBottom>
                                {failure.reason}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {failure.trace}
                            </Typography>
                        </Stack>
                    </Dialog>
                </React.Fragment>
            }
        </Stack>
    )
}