import {Pageable} from "@/lib/model/pagination/Pageable";
import {PageableData} from "@/lib/model/pagination/PageableData";
import {ProcessDefinition} from "@/lib/model/definition/ProcessDefinition";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

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
