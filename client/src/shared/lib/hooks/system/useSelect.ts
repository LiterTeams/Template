"use client";
import { useState, useEffect, useCallback } from "react";

import { SelectOptionIF } from "@entities/interfaces/select.interfaces";

export default function useSelect(initial: string | null, options: SelectOptionIF[], multiple: boolean = false){
    
    const [initialOption, setInitialOption] = useState<SelectOptionIF | undefined | null>(undefined);
    const [selectOptions, setSelectOptions] = useState(options);
    const [showOptions, setShowOptions] = useState(false);

    const toggleShowOptions = useCallback(() => setShowOptions(!showOptions), [showOptions]);

    const setSelectOption = useCallback((value: string | null) => {
        const option = selectOptions.find(option => option.value == value);
        if (multiple){
            setSelectOptions(states => states.filter(state => state.value == option?.value ? state.active = true : state.active = false));
        } else {
            setInitialOption(option);
        }
        toggleShowOptions();
    }, [selectOptions, toggleShowOptions, multiple]);

    useEffect(() => {
        if (!initialOption){
            setInitialOption(options.find(option => option.value == initial));
        };
        if (selectOptions.length !== options.length){
            setSelectOptions(options);
        }
    },[initial, initialOption, options, selectOptions.length, setSelectOption])

    return { initialOption, selectOptions, showOptions, toggleShowOptions, setSelectOption }
}