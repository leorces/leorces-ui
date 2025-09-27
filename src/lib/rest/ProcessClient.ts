import {Pageable} from "@/lib/model/pagination/Pageable";
import {PageableData} from "@/lib/model/pagination/PageableData";
import {Process} from "@/lib/model/runtime/Process";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function fetchProcesses(
    params: Pageable = {}
): Promise<PageableData<Process>> {
    try {
        const query = new URLSearchParams();

        if (params.page !== undefined) query.append("page", params.page.toString());
        if (params.limit !== undefined) query.append("limit", params.limit.toString());
        if (params.sort) query.append("sort", params.sort);
        if (params.order) query.append("order", params.order);
        if (params.filter) query.append("filter", params.filter);
        if (params.state) query.append("state", params.state);

        const res = await fetch(`${API_URL}/api/v1/processes?${query.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        return (await res.json()) as PageableData<Process>;
    } catch (err) {
        console.error("fetchDefinitions error:", err);
        throw err;
    }
}
