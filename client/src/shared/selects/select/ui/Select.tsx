"use client";
import useSearch from "@features/hooks/system/useSearch";
import useSelect from "@features/hooks/system/useSelect";

import { SelectOptionsIF } from "@entities/interfaces/select.interfaces";

export default function Select({queryKey, initial = null, prefix = undefined, options = [], multiple=false, isLoading=false, isError=false}:SelectOptionsIF){
    
    const { createQuery, deleteQuery } = useSearch();
    const { initialOption, showOptions, selectOptions, setSelectOption, toggleShowOptions } = useSelect(initial, options, multiple);
    
    const selectToggle = (value: string | null) => {
        if (value){
            createQuery(queryKey, value);
            setSelectOption(value);
        } else {
            deleteQuery(queryKey)
            setSelectOption(value);
        }
    }

    return(
        <div className="relative text-sm">
            <button onClick={toggleShowOptions} className={`flex flex-center gap-1 px-3 py-2 rounded-xl min-w-28 duration-300 hover:bg-blue hover:drop-shadow-glow_blue ${showOptions ? "bg-blue drop-shadow-glow_blue" : "bg-dark-secondaty"}`}>
                {initialOption ? `${prefix ? `${prefix} : ${initialOption.label}` : initialOption.label}` : "Select..."}
            </button>
            <div className={`absolute z-[2] left-0 top-12 w-full overflow-hidden bg-dark-secondaty ${showOptions ? "block" : "hidden"}`}>
                <ul className="max-h-64 overflow-y-auto">
                    {selectOptions.map((option, index) =>
                        <li
                            key={`option-${option.value}-${index}`}
                            className={`flex gap-1 duration-300 hover:bg-blue px-3 py-2 cursor-pointer ${option.active && "bg-blue"}`}
                            onClick={() => selectToggle(option.value)}
                        >
                            {option.icon}
                            {option.label}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}