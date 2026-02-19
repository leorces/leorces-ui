export type ProcessMigrationPlan = {
    definitionKey: string
    fromVersion: number
    toVersion: number
    instructions: {
        fromActivityId: string
        toActivityId: string | null
    }[]
}