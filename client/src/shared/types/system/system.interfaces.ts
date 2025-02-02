interface BaseProps {
    readonly id: number;
    readonly created_at: Date;
    updated_at: Date;
}

interface MetaProps {
    page: number;
    pages: number;
    items: number;
    status: number;
}

export type { BaseProps, MetaProps }