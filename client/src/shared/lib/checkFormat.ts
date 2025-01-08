import { emailPattern } from "@entities/config/patterns";

const checkFormat = (state: string, format: "email" | "tel" | "IP"): boolean => {
    switch(format){
        case "email": return emailPattern.test(state);
        case "tel": return false;
        case "IP": return false;
        default: return false;
    }
}

export default checkFormat;