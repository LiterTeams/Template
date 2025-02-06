import { BaseProps } from "./system.interfaces"

interface UserProps extends Omit<BaseProps, "updated_at"> {
    nickname: string;
    email: string;
    role: string;
    blocking: boolean;
}

export type { UserProps }