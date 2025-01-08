const checkEmpety = (state:string | number | File | File[] | null) => {
    if (typeof state === "object") return state === null;
    if (typeof state === "string") return state.length === 0;
    if (typeof state === "number") return String(state).length === 0;
    if (typeof state === "undefined") return true;
    return state === null;
}

export default checkEmpety;