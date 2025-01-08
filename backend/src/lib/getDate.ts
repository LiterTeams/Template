const getDate = (type:"this"|"old"|"two-week"): {first: string; last: string} => {
    const dateObj = new Date();
    if (type === "this") {
        const year    = dateObj.getUTCFullYear();
        const month   = dateObj.getUTCMonth() + 1;
        const firstDay = 1;
        const lastDay = new Date(year, month, 0).getDate();
        return {
            "first": `${year}-${month <= 9 ? "0"+month : month}-${firstDay <= 9 ? "0"+firstDay : firstDay}`,
            "last": `${year}-${month <= 9 ? "0"+month : month}-${lastDay <= 9 ? "0"+lastDay : lastDay}`,
        }
    }
    if (type === "two-week"){
        const year    = dateObj.getUTCFullYear();
        const month   = dateObj.getUTCMonth() + 1;
        const firstDay = dateObj.getDate();
        const lastDay = new Date(year, month, dateObj.getDate()-14).getDate();
        return {
            "first": `${year}-${month <= 9 ? "0"+month : month}-${firstDay <= 9 ? "0"+firstDay : firstDay}T23:59:59`,
            "last": `${year}-${month <= 9 ? "0"+month : month}-${lastDay <= 9 ? "0"+lastDay : lastDay}`,
        }
    }
    const year    = dateObj.getUTCFullYear();
    const month   = dateObj.getUTCMonth();
    const firstDay = 1;
    const lastDay = new Date(year, month, 0).getDate();
    return {
        "first": `${year}-${month <= 9 ? "0"+month : month}-${firstDay <= 9 ? "0"+firstDay : firstDay}`,
        "last": `${year}-${month <= 9 ? "0"+month : month}-${lastDay <= 9 ? "0"+lastDay : lastDay}`,
    }
}

export { getDate }