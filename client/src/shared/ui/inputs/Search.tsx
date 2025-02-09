"use client";
import { FC } from "react";
import { useSearch } from "@shared/lib/hooks/system/general";
import clsx from "clsx";

import { Input } from "./Input";

import { SearchProps } from "@shared/types/system/group.interfaces";

export const Search: FC<SearchProps> = ({prefix="query", className="", ...props}) => {
    const { searchParams, handleSearch } = useSearch();
    return <Input className={clsx("", className)} defaultValue={searchParams.get(prefix)?.toString()} onChange={(e) => handleSearch(prefix, e.target.value)} type="search" {...props} />
}