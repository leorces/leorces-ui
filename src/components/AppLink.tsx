import * as React from 'react';
import {Link as MuiLink} from '@mui/material';
import {useRouter} from 'next/navigation';

interface AppLinkProps {
    href: string;
    children: React.ReactNode;
}

export default function AppLink({href, children}: AppLinkProps) {
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        router.push(href);
    };

    return (
        <MuiLink component="a" href={href} underline="hover" onClick={handleClick}>
            {children}
        </MuiLink>
    );
}
