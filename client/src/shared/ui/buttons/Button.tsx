import { _ButtonIF } from "@app/shared/interfaces/system.interfaces";

const Button: React.FC<_ButtonIF> = ({children, variant="undefined", label, className, ...props}) => {

    const variantClassName: Record<typeof variant, string> = {
        "primary": "",
        "secondary": "",
        "ghost": "flex items-center justify-center rounded-md size-9 p-1 bg-black/25 border border-white border-opacity-15 duration-300 hover:bg-white/25",
        "undefined": "",
    }

    const btnContent = children ?? label;
    return <button className={`${className} ${variant != "undefined" ? variantClassName[variant] : ""}`} {...props}>{btnContent}</button>
}

export default Button;