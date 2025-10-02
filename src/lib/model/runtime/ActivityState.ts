export const ActivityState = {
    SCHEDULED: "SCHEDULED",
    ACTIVE: "ACTIVE",
    COMPLETED: "COMPLETED",
    CANCELED: "CANCELED",
    TERMINATED: "TERMINATED",
    FAILED: "FAILED",
} as const;

export type ActivityState = typeof ActivityState[keyof typeof ActivityState];
