import React, {type ReactNode} from 'react'
import {useNavigate} from 'react-router'
import {Link as MuiLink} from '@mui/material'

interface AppLinkProps {
    href: string;
    children: ReactNode;
}

export default function AppLink({href, children}: AppLinkProps) {
    const navigate = useNavigate()

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        navigate(href)
    }

    return (
        <MuiLink component="a" href={href} underline="hover" onClick={handleClick}>
            {children}
        </MuiLink>
    )
}
