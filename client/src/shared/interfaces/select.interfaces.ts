
interface SelectOptionIF {
    label: string;
    value: string | null;
    active?: boolean;
    icon?: React.ReactNode;
}

interface SelectOptionsIF {
    queryKey: string;
    initial?: string | null;
    prefix?: string;
    options: SelectOptionIF[];
    isLoading?: boolean;
    isError?: boolean;
    multiple?: boolean;
}

export type { SelectOptionIF, SelectOptionsIF }