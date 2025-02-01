import { _ButtonIF } from "@app/shared/types/system.interfaces";

const Button: React.FC<_ButtonIF> = ({children, variant="undefined", label, className, ...props}) => {

    const variantClassName: Record<typeof variant, string> = {
        "primary": "",
        "secondary": "",
        "ghost": "btn-ghost",
        "undefined": "",
    }

    const btnContent = children ?? label;
    return <button className={`${className} ${variant != "undefined" ? variantClassName[variant] : ""}`} {...props}>{btnContent}</button>
}

export default Button;