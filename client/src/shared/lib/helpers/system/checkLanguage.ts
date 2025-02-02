import { langEnPattern, langRuPattern, trimPattern } from "@shared/config/patterns";
import { _LangErrorProps } from "@shared/types/system/error.interfaces";

const checkLanguage = (state: string | number, lang: keyof _LangErrorProps) => {
    if (typeof state === "number") return true;
    
    state = state.replace(trimPattern, "");
    
    if (lang === "ru") return langRuPattern.test(state);
    
    return langEnPattern.test(state);
}

export default checkLanguage;