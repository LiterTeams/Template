"use client";
import Image from "next/image";
import Link from "next/link";
import GitImage from "@public/assets/gifs/WTF1.gif";

import { IoReloadCircle } from "react-icons/io5";

export default function NotFound({message, backLink, refetch}:{message: string; backLink: string; refetch?: () => void;}){

    return(
        <div className="flex overflow-hidden flex-col gap-2 flex-center p-3">
            <Image width={224} height={224} className="pointer-events-none size-56 object-contain opacity-15" unoptimized src={GitImage} alt="Not Found" />
            <h2>{message}</h2>
            <Link href={backLink} className="group" onClick={refetch}>
                <IoReloadCircle className="duration-300 group-hover:text-blue group-hover:drop-shadow-glow_blue group-hover:animate-spin" size={36} />
            </Link>
        </div>
    )
}