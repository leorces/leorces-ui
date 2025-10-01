const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function runActivity(
    definitionId: string,
    processId: string
): Promise<void> {
    try {
        const res = await fetch(
            `${API_URL}/api/v1/activities/${processId}/${definitionId}/run`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!res.ok) {
            throw new Error(`Failed to run activity: ${res.status} ${res.statusText}`);
        }
    } catch (err) {
        console.error("runActivity error:", err);
        throw err;
    }
}

export async function completeActivity(
    activityId: string
): Promise<void> {
    try {
        const res = await fetch(
            `${API_URL}/api/v1/activities/${activityId}/complete`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!res.ok) {
            throw new Error(`Failed to complete activity: ${res.status} ${res.statusText}`);
        }
    } catch (err) {
        console.error("completeActivity error:", err);
        throw err;
    }
}

export async function retryActivity(
    activityId: string
): Promise<void> {
    try {
        const res = await fetch(
            `${API_URL}/api/v1/activities/${activityId}/retry`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!res.ok) {
            throw new Error(`Failed to retry activity: ${res.status} ${res.statusText}`);
        }
    } catch (err) {
        console.error("retryActivity error:", err);
        throw err;
    }
}

export async function terminateActivity(
    activityId: string
): Promise<void> {
    try {
        const res = await fetch(
            `${API_URL}/api/v1/activities/${activityId}/terminate`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!res.ok) {
            throw new Error(`Failed to terminate activity: ${res.status} ${res.statusText}`);
        }
    } catch (err) {
        console.error("terminateActivity error:", err);
        throw err;
    }
}