import { numberPattern, stringPattern } from "@entities/config/patterns";

const checkType = (state:string | number, type:"str" | "int") => {
    if(type === "str" && typeof state === "string") return stringPattern.test(state);
    
    if(type === "int" && typeof state === "string") return numberPattern.test(state);
    
    return true;
}

export default checkType;