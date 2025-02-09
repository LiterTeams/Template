"use client";
import { FC } from "react";
import { MdWifiTetheringErrorRounded } from "react-icons/md";

interface NetworkErrorProps {
    message: string;
}

export const NetworkError: FC<NetworkErrorProps> = ({message}) => {
    return(
        <div className="flex flex-col gap-2 flex-center size-full">
            <MdWifiTetheringErrorRounded className="animate-pulse" size={64} color="red" />
            <h1>Сервер недоступен</h1>
            <p>{message}</p>
        </div>
    )
}