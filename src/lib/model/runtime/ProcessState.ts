export const ProcessState = {
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED',
    CANCELED: 'CANCELED',
    TERMINATED: 'TERMINATED',
    INCIDENT: 'INCIDENT'
} as const

export type ProcessState = typeof ProcessState[keyof typeof ProcessState];
