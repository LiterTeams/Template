"use client";
import { useState, useEffect } from "react";

import { _ValidateOptionsIF } from "@entities/interfaces/system.interfaces";

import checkEmpety from "@app/shared/lib/checkEmpety";
// import checkFormat from "@lib/checkFormat";
import checkFileFormat from "@app/shared/lib/checkFileFormat";
import checkLenght from "@app/shared/lib/checkLenght";
import checkFileSize from "@app/shared/lib/checkFileSize";
import checkQuantity from "@app/shared/lib/checkQuantity";
import checkLanguage from "@app/shared/lib/checkLanguage";
import checkXSS from "@app/shared/lib/checkXSS";

import errors from "@app/entities/config/errors"
import { ExtensionsEnumT } from "@app/entities/types/enum.types";
const lang: "Ru" | "Eng" = process.env.NEXT_PUBLIC_LANG as "Ru" | "Eng" || "Ru";
const error = lang === "Ru" ? errors.rus : errors.eng;

export default function useValidate(initialState:string | number | File | File[] | null, options?:_ValidateOptionsIF){
    const [state, setState] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [errorStatus, setErrorStatus] = useState<boolean>(false);
    const [successStatus, setSuccessStatus] = useState<boolean>(false);
    const [check, setCheck] = useState(false);

    const switchStatus = (type:"error" | "success"): void => {
        switch (type){
            case "error": setErrorStatus(true); setSuccessStatus(false); break;
            case "success": setErrorStatus(false); setSuccessStatus(true); break;
            default: break;
        }
    }

    const checkValidate = () => setCheck(true);

    useEffect(() => {
        if(!check) return;
        if(options){
            if(options.required){
                switch(checkEmpety(state)){
                    case true: switchStatus("error"); setErrorMessage(error.required); return;
                    case false: switchStatus("success"); setErrorMessage(null); break;
                }
            }
            // if(options.format && typeof state === "string"){
            //     switch(!checkFormat(state,options.format)){
            //         case true: switchStatus("error"); setErrorMessage(error.format[options.format]); return;
            //         case false: switchStatus("success"); setErrorMessage(null); break;
            //     }
            // }
            if(options.lengthMin){
                if (typeof state !== "string") return;
                const min = options.lengthMin;
                const message = error.min.str.replace(":value",String(min));
                switch(!checkLenght(state,min)){
                    case true: switchStatus("error"); setErrorMessage(message); return;
                    case false: switchStatus("success"); setErrorMessage(null); break;
                }
            }
            if(options.lengthMax){
                if (typeof state !== "string") return;
                const max = options.lengthMax;
                const message = error.max.str.replace(":value",String(max));
                switch(!checkLenght(state,0,max)){
                    case true: switchStatus("error"); setErrorMessage(message); return;
                    case false: switchStatus("success"); setErrorMessage(null); break;
                }
            }
            if(options.quantityMin){
                if (typeof state !== "number") return;
                const min = options.quantityMin;
                const message = error.min.int.replace(":value",String(min));
                switch(!checkQuantity(state,min)){
                    case true: switchStatus("error"); setErrorMessage(message); return;
                    case false: switchStatus("success"); setErrorMessage(null); break;
                }
            }
            if(options.quantityMax){
                if (typeof state !== "number") return;
                const max = options.quantityMax;
                const message = error.max.int.replace(":value",String(max));
                switch(!checkQuantity(state,0,max)){
                    case true: switchStatus("error"); setErrorMessage(message); return;
                    case false: switchStatus("success"); setErrorMessage(null); break;
                }
            }
            if(options.lang && typeof state !== "object"){
                const message = error.lang[options.lang];
                switch(!checkLanguage(state,options.lang)){
                    case true: switchStatus("error"); setErrorMessage(message); return;
                    case false: switchStatus("success"); setErrorMessage(null); break;
                }
            }
            if (options.extension && typeof state !== null && typeof state === "object"){
                const extensions = options.extension;
                const message = error.mimes.replace(":value",String(extensions.join(" | ").toUpperCase()));
                const file = state as File;
                const extension = file.type.split("/")[1] as ExtensionsEnumT;
                switch(!checkFileFormat(extension,extensions)){
                    case true: switchStatus("error"); setErrorMessage(message); return;
                    case false: switchStatus("success"); setErrorMessage(null); break;
                }
            }
            if (options.sizeMin && typeof state !== null && typeof state === "object"){
                const min = options.sizeMin;
                const message = error.min.file.replace(":value",String(min));
                const file = state as File;
                const size = file.size;
                switch(!checkFileSize(size, min)){
                    case true: switchStatus("error"); setErrorMessage(message); return;
                    case false: switchStatus("success"); setErrorMessage(null); break;
                }
            }
            if (options.sizeMax && typeof state !== null && typeof state === "object") {
                const max = options.sizeMax;
                const message = error.max.file.replace(":value",String(max));
                const file = state as File;
                const size = file.size;
                switch(!checkFileSize(size, "0 MB", max)){
                    case true: switchStatus("error"); setErrorMessage(message); return;
                    case false: switchStatus("success"); setErrorMessage(null); break;
                }
            }
        } else {switchStatus("success");}
        if (typeof state !== "object") checkXSS(state);
    },[options, state, check]);

    return {state, errorStatus, successStatus, errorMessage, setState, setCheck, checkValidate,}
}