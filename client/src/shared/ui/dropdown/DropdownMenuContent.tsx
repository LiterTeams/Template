import { FC, ReactNode } from "react";

const DropdownMenuContent: FC<{ show?: boolean; children?: ReactNode }> = ({ show = false, children }) => {
    return show ? (
        <div className="absolute flex flex-col overflow-hidden -left-12 bottom-12 w-[128px] rounded-md bg-black border border-white border-opacity-15">
            {children}
        </div>
    ) : null;
};

export default DropdownMenuContent;