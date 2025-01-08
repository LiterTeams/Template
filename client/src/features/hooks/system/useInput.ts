"use client";
import { ChangeEvent } from "react";
import useValidate from "./useValidate";
import { _ValidateOptionsIF } from "@entities/interfaces/system.interfaces";

 /**
 * @version 0.0.1
 *
 * @param {String | Number}     initialState - default state input value [required].
 * @param {Object}              options - validate options [optional]
 * @param {Object}              [options.required] Obligatory field [optional]
 * @param {Object}              [options.type] str | int [optional]
 * @param {Object}              [options.lang] Ru | Eng [optional]
 * @param {Object}              [options.lengthMin] Minimum line length [optional]
 * @param {Object}              [options.lengthMax] Maximum line length [optional]
 * @param {Object}              [options.quantityMin] Minimum value [optional]
 * @param {Object}              [options.quantityMax] Maximum value [optional]
 * @returns {{value:string,errorStatus:boolean,successStatus:boolean,errorMessage:string,onChange:void,checkValidate:void}} value | errorStatus | successStatus | errorMessage | onChange | checkValidate
 */
export default function useInput(initialState:string | number, options?:Omit<_ValidateOptionsIF, "sizeMin" | "sizeMax" | "sizeBetween" | "extension">){
    const {state, setState, setCheck, checkValidate, errorStatus, successStatus, errorMessage} = useValidate(initialState,options);

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
        setCheck(true);
    };

    const clear = () => {
        setState("");
        setCheck(false);
    }

    return {state, errorStatus, successStatus, errorMessage, onChange, checkValidate, clear}
}