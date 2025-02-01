import { FC, ReactNode } from "react";

const DropdownMenu: FC<{ children?: ReactNode }> = ({ children }) => (
    <div className="relative">{children}</div>
);

export default DropdownMenu;