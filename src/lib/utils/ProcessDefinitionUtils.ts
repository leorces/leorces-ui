import type {ProcessDefinition} from '../model/definition/ProcessDefinition.ts'

export interface GroupedDefinition {
    latest: ProcessDefinition;
    previousVersions: ProcessDefinition[];
}

// Function to group ProcessDefinitions by key
export function groupDefinitionsByKey(definitions: ProcessDefinition[]): GroupedDefinition[] {
    const grouped = definitions.reduce((acc, definition) => {
        if (!acc[definition.key]) {
            acc[definition.key] = []
        }
        acc[definition.key].push(definition)
        return acc
    }, {} as Record<string, ProcessDefinition[]>)

    return Object.values(grouped).map(versions => {
        // Sort by version descending to get latest first
        versions.sort((a, b) => b.version - a.version)
        const [latest, ...previousVersions] = versions
        return {
            latest,
            previousVersions
        }
    })
}