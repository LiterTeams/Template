import { trimPattern } from "@entities/config/patterns";

const checkLenght = (state:string, min:number=0, max:number=0):boolean => {
    state = state.replace(trimPattern, "");
    const length = state.length;
    
    if (min + max === 0) return true;
    if(min !== 0) return length >= min;
    if(max !== 0) return length <= max;
    if(min !== 0 && max !== 0) return length >= min && length <= max;
    
    return false;
}

export default checkLenght;