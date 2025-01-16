"use client";
import Image from "next/image";
import AngryFox from "@public/assets/gifs/Hmm.gif";
import Button from "@app/shared/buttons/Button";

import { IoReloadCircle } from "react-icons/io5";

export default function Error({error, refetch}:{error: string; refetch: () => void;}){

    const errors: { [key: string]: string } = {
        "Cannot read properties of undefined (reading 'status')": "The server is not responding"
    }

    return(
        <div className="flex overflow-hidden flex-col gap-2 flex-center p-3">
            <Image width={224} height={224} className="pointer-events-none size-56 object-contain opacity-15" unoptimized src={AngryFox} alt="Error" />
            <h2>{errors[error]}</h2>
            <Button onClick={refetch} className="group">
                <IoReloadCircle className="duration-300 group-hover:text-blue group-hover:drop-shadow-glow_blue group-hover:animate-spin" size={36} />
            </Button>
        </div>
    )
}