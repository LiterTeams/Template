interface FilesPagination {
    page: number;
    skip: number;
    take: number;
    query?: string;
}
export type { FilesPagination }