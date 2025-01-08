import { _ButtonIF } from "@entities/interfaces/system.interfaces";

const Button: React.FC<_ButtonIF> = ({children, label, ...props}) => {
    const btnContent = children ?? label;
    return <button {...props}>{btnContent}</button>
}

export default Button;