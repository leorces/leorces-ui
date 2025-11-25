import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'

function getBaseName(): string {
    const path = window.location.pathname
    const knownRoutes = ['definitions', 'processes']

    const segments = path.split('/').filter(Boolean)

    if (segments.length === 0) return '/'
    if (knownRoutes.includes(segments[0])) return '/'

    return '/' + segments[0]
}

const basename = getBaseName()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename={basename}>
            <App/>
        </BrowserRouter>
    </StrictMode>
)
