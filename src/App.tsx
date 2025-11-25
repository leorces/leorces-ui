import {Route, Routes} from 'react-router-dom'
import Layout from './components/layout/Layout'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import DefinitionsPage from './features/definition/DefinitionsPage.tsx'
import ProcessesPage from './features/process/ProcessesPage.tsx'
import DefinitionDetailsPage from './features/definition/DefinitionDetailsPage.tsx'
import ProcessDetailsPage from './features/process/ProcessDetailsPage.tsx'

function App() {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route index element={<ProcessesPage/>}/>
                <Route path="processes/:processId" element={<ProcessDetailsPage/>}/>
                <Route path="definitions" element={<DefinitionsPage/>}/>
                <Route path="definitions/:definitionId" element={<DefinitionDetailsPage/>}/>
            </Route>
        </Routes>
    )
}

export default App
