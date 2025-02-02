"use client";
import { useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function useSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
   
    const handleSearch = (key: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      
      if (params.has(key) && !value){
        deleteQuery(key);
      } else {
        createQuery(key, value);
      }
    }

    const createQuery = useCallback(
      (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(key, value);
        replace(`${pathname}?${params.toString()}`);
      },
      [pathname, replace, searchParams]
    )

    const deleteQuery = useCallback(
      (key: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete(key);
        replace(`${pathname}?${params.toString()}`);
      },
      [pathname, replace, searchParams]
    )

    const resetQueries = useCallback(
      () => {
        const params = new URLSearchParams(searchParams.toString());
        const keys = params.keys();
        keys.forEach(key => params.delete(key))
        replace(`${pathname}?${params.toString()}`);
      },
      [pathname, replace, searchParams]
    )

    return { searchParams, pathname, handleSearch, createQuery, deleteQuery, resetQueries }
}


