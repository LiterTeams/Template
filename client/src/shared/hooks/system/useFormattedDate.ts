"use client";
import { useState, useEffect } from "react";
import dateTimeConvert from "@lib/dateTimeConvert";

export default function useFormattedDate(
    date: Date,
    dateFormat: string ="Year.Month.Day|Hor:Min:Sec",
    showTimeSystem: boolean = true,
    timeSystem: "12" | "24" = "12",
    intervalSeparator: string ="|",
    dateSeparator: string =".",
    timeSeparator: string =":"
){

    const [formattedDate, setFormattedDate] = useState<string | null>(null);

    useEffect(() => {
        setFormattedDate(dateTimeConvert(date, dateFormat, showTimeSystem, timeSystem, intervalSeparator, dateSeparator, timeSeparator))
    },[date, dateFormat, dateSeparator, intervalSeparator, showTimeSystem, timeSeparator, timeSystem]);

    return { formattedDate }
}