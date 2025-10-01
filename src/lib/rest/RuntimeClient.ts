const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// ====== VARIABLES ======

export async function setVariables(
    executionId: string,
    variables: Record<string, any>
): Promise<void> {
    const res = await fetch(
        `${API_URL}/api/v1/runtime/${executionId}/variables`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(variables),
        }
    );

    if (!res.ok) {
        throw new Error(`Failed to set variables: ${res.statusText}`);
    }
}

export async function setLocalVariables(
    executionId: string,
    variables: Record<string, any>
): Promise<void> {
    const res = await fetch(
        `${API_URL}/api/v1/runtime/${executionId}/variables/local`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(variables),
        }
    );

    if (!res.ok) {
        throw new Error(`Failed to set local variables: ${res.statusText}`);
    }
}

// ====== CORRELATE MESSAGE ======

export interface CorrelateMessageRequest {
    message: string;
    businessKey?: string;
    correlationKeys?: Record<string, any>;
    processVariables?: Record<string, any>;
}

export async function correlateMessage(
    req: CorrelateMessageRequest
): Promise<void> {
    const res = await fetch(`${API_URL}/api/v1/runtime/correlate`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
    });

    if (!res.ok) {
        throw new Error(`Failed to correlate message: ${res.statusText}`);
    }
}
