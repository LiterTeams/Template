import { BaseProps } from "./system.interfaces";

interface RepositoryLicenseIF {
    name: string;
    url: string;
}

interface RepositoryOwnerIF {
    avatar_url: string;
    html_url: string;
    login: string;
}

interface RepositoryIF extends BaseProps {
    name: string;
    description?: string;
    language?: string;
    owner: RepositoryOwnerIF;
    license?: RepositoryLicenseIF;
    html_url: string;
}

interface RepositoryResponseIF {
    data: RepositoryIF[];
}

export type { RepositoryIF, RepositoryResponseIF }