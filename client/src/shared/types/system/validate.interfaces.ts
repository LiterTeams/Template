import { ExtensionsPropsT } from "./enum";
import { _LangErrorProps, _FormatErrorProps } from "./error.interfaces";

type DatePropsT = string | Date;

interface ValidateOptionsProps {
    required?: boolean;
    lang?: keyof _LangErrorProps;
    format?: keyof _FormatErrorProps;
    regex?: RegExp;

    lengthMin?: number;
    lengthMax?: number;
    lengthBetween?: [number, number];

    quantityMin?: number;
    quantityMax?: number;
    quantityBetween?: [number, number];

    sizeMin?: string;
    sizeMax?: string;
    sizeBetween?: [string, string];

    dateMin?: DatePropsT;
    dateMax?: DatePropsT;
    dateBetween?: [DatePropsT, DatePropsT];

    extensions?: ExtensionsPropsT | ExtensionsPropsT[];

    trim?: boolean;
    lowercase?: boolean;
    uppercase?: boolean;
    capitalize?: boolean;

    noSpecialChars?: boolean;
    onlyDigits?: boolean;
    onlyLetters?: boolean;
    allowWhitespace?: boolean; // -

    compareWith?: string;
    caseSensitive?: boolean; // -
    allowNull?: boolean; // -
    allowFileDuplicate?: boolean; // -
    autoValidate?: boolean;
}

export type { ValidateOptionsProps };