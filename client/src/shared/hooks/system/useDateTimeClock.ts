"use client";
import { useState, useEffect } from "react";
import dateTimeConvert from "@lib/dateTimeConvert";

export default function useDateTimeClock(
    dateFormat: string ="Year.Month.Day|Hor:Min:Sec",
    showTimeSystem: boolean = true,
    timeSystem: "12" | "24" = "12",
    intervalSeparator: string ="|",
    dateSeparator: string =".",
    timeSeparator: string =":"
){

    // const [currentDate, setCurrentDate] = useState(date);
    const [dateTime, setDateTime] = useState("Loading...");

    useEffect(() => {
        setInterval(() => {
            setDateTime(dateTimeConvert(new Date(), dateFormat, showTimeSystem, timeSystem, intervalSeparator, dateSeparator, timeSeparator))
        }, 1000);
    }, [dateFormat, showTimeSystem, timeSystem, dateSeparator, intervalSeparator, timeSeparator]);

    return { dateTime }
}