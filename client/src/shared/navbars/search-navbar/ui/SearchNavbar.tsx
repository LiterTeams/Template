"use client";
import useSearch from "@features/hooks/system/useSearch";

export default function SearchNavbar({className,disabled=false,children,firstChildren=false,lastChildren=true}:{className?: string; disabled?:boolean; children?:React.ReactNode; firstChildren?: boolean; lastChildren?: boolean;}){

    const { searchParams, handleSearch } = useSearch();

    return(
        <div className={`flex items-center gap-4 ${className}`}>
            {firstChildren && lastChildren == true && children}
            <input disabled={disabled} className={`flex-grow text-sm px-3 py-2 rounded-xl ${disabled ? "bg-red/15 cursor-not-allowed" : "bg-dark-secondaty"} outline-none`} placeholder="Search..." onChange={(e) => handleSearch("query",e.target.value)} defaultValue={searchParams.get("query")?.toString()} />
            {lastChildren && firstChildren == false && children}
        </div>
    )
}