import { langEnPattern, langRuPattern, trimPattern } from "@entities/config/patterns";

const checkLanguage = (state: string | number, lang: "Ru" | "Eng") => {
    if (typeof state === "number") return true;
    
    state = state.replace(trimPattern, "");
    
    if (lang === "Ru") return langRuPattern.test(state);
    
    return langEnPattern.test(state);
}

export default checkLanguage;