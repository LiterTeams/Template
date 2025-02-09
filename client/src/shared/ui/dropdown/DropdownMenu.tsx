import { FC, ReactNode } from "react";

export const DropdownMenu: FC<{ children?: ReactNode }> = ({ children }) => (
    <div className="relative">{children}</div>
);