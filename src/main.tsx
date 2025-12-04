import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import getBaseName from './lib/utils/HostUtils.ts'

const basename = getBaseName()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename={basename}>
            <App/>
        </BrowserRouter>
    </StrictMode>
)
