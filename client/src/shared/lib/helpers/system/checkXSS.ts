import { xssSxriptPatternOne, xssSxriptPatternTwo } from "@shared/config/patterns";

const checkXSS = (state:string | number) => {
    if (typeof state === "number") state = String(state);
    
    return xssSxriptPatternOne.test(state) || xssSxriptPatternTwo.test(state);
}

export default checkXSS;