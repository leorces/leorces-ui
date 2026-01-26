import {Navigate, Route, Routes} from 'react-router-dom'
import Layout from './components/layout/Layout'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import DefinitionsPage from './features/definition/DefinitionsPage.tsx'
import DefinitionDetailsPage from './features/definition/DefinitionDetailsPage.tsx'
import ProcessDetailsPage from './features/process/ProcessDetailsPage.tsx'
import ProcessesPage from './features/process/ProcessesPage.tsx'
import JobsPage from './features/jobs/JobsPage.tsx'
import JobDetailsPage from './features/jobs/JobDetailsPage.tsx'

function App() {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route index element={<Navigate to="/processes" replace/>}/>
                <Route path="processes" element={<ProcessesPage/>}/>
                <Route path="processes/:processId" element={<ProcessDetailsPage/>}/>
                <Route path="definitions" element={<DefinitionsPage/>}/>
                <Route path="definitions/:definitionId" element={<DefinitionDetailsPage/>}/>
                <Route path="jobs" element={<JobsPage/>}/>
                <Route path="jobs/:jobId" element={<JobDetailsPage/>}/>
            </Route>
        </Routes>
    )
}

export default App
