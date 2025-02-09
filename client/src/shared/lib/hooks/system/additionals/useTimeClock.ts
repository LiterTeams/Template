"use client";
import { useState, useEffect } from "react";
import { timestampFormat } from "@shared/lib/helpers/system";

export const useTimeClock = (
    dateFormat: string ="Year.Month.Day|Hor:Min:Sec",
    showTimeSystem: boolean = true,
    timeSystem: "12" | "24" = "12",
    intervalSeparator: string ="|",
    dateSeparator: string =".",
    timeSeparator: string =":"
) => {

    const [dateTime, setDateTime] = useState("Loading...");

    useEffect(() => {
        setInterval(() => {
            setDateTime(timestampFormat(new Date(), dateFormat, showTimeSystem, timeSystem, intervalSeparator, dateSeparator, timeSeparator))
        }, 1000);
    }, [dateFormat, showTimeSystem, timeSystem, dateSeparator, intervalSeparator, timeSeparator]);

    return { dateTime }
}