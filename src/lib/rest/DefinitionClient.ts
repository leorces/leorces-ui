import type {Pageable} from "../model/pagination/Pageable.ts";
import type {PageableData} from "../model/pagination/PageableData.ts";
import type {ProcessDefinition} from "../model/definition/ProcessDefinition.ts";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function fetchDefinitions(
    params: Pageable = {}
): Promise<PageableData<ProcessDefinition>> {
    try {
        const query = new URLSearchParams();

        if (params.page !== undefined) query.append("page", params.page.toString());
        if (params.limit !== undefined) query.append("limit", params.limit.toString());
        if (params.sort) query.append("sort", params.sort);
        if (params.order) query.append("order", params.order);
        if (params.filter) query.append("filter", params.filter);

        const res = await fetch(`${API_URL}/api/v1/definitions?${query.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        return (await res.json()) as PageableData<ProcessDefinition>;
    } catch (err) {
        console.error("fetchDefinitions error:", err);
        throw err;
    }
}

export async function fetchDefinition(
    definitionId: string,
): Promise<ProcessDefinition> {
    try {
        const res = await fetch(`${API_URL}/api/v1/definitions/${definitionId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        return (await res.json()) as ProcessDefinition;
    } catch (err) {
        console.error("fetchDefinition error:", err);
        throw err;
    }
}
