import { FC } from "react";

import { FaRegEye, FaEyeSlash } from "react-icons/fa";

interface Props {
    isVisible:boolean;
    toggleVisible:()=>void;
}

export const ButtonTogglePasswordVisible: FC<Props> = ({isVisible=false,toggleVisible}) => {
    return <button type="button" className="absolute right-3 top-3" onClick={toggleVisible}>{isVisible ? <FaRegEye size={16} /> : <FaEyeSlash size={16} />}</button>
}