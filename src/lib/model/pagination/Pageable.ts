export interface Pageable {
    page?: number;
    limit?: number;
    sort?: string;
    order?: "asc" | "desc";
    filter?: string;
    state?: string;
}