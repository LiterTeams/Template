import { ExtensionsPropsT } from "./enum.types";

interface ValidateOptionsProps {
    required?: boolean;  // Обязательное поле
    lang?: "ru" | "eng"; // Язык данных
    format?: "email" | "tel" | "IP" | "url" | "date" | "uuid"; // Добавлены новые форматы
    regex?: RegExp; // Проверка на соответствие регулярному выражению

    lengthMin?: number; 
    lengthMax?: number; 
    lengthBetween?: [number, number]; // Используем кортеж для чёткого ограничения  

    quantityMin?: number; 
    quantityMax?: number; 
    quantityBetween?: [number, number];

    sizeMin?: string;
    sizeMax?: string;
    sizeBetween?: [string, string];

    extensions?: ExtensionsPropsT | ExtensionsPropsT[]; 

    trim?: boolean;
    lowercase?: boolean;
    uppercase?: boolean;
    capitalize?: boolean;

    noSpecialChars?: boolean;
    onlyDigits?: boolean;
    onlyLetters?: boolean;
    allowWhitespace?: boolean;

    dateMin?: string | Date;
    dateMax?: string | Date;
    dateBetween?: [string | Date, string | Date];

    compareWith?: unknown;
    caseSensitive?: boolean;
    allowNull?: boolean;
}

export type { ValidateOptionsProps };