"use client";
import { useState, useRef } from "react";
import { checkFileFormat, fileDestructurization } from "@shared/lib/helpers/system";
import { ExtensionsPropsT } from "@shared/types/system/types";

export const useFile = (allowedMimetypes: ExtensionsPropsT | ExtensionsPropsT[] = [], multiple: boolean = false) => {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);  // Реф для input

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (!selectedFiles) return console.warn("useFile (handleFileChange) - NO FILES!");

        const fileArray = Array.from(selectedFiles);
        const invalidFiles: File[] = [];

        const validFiles = fileArray.filter(file => {
            const { extension } = fileDestructurization(file);
            if (checkFileFormat(extension, allowedMimetypes)) {
                return true;
            } else {
                invalidFiles.push(file);
                return false;
            }
        });

        if (invalidFiles.length > 0) {
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            console.warn("Some files are not supported and were removed:", invalidFiles);
        }

        setFiles(multiple ? [...files, ...validFiles] : validFiles);
    };

    const removeFile = (index: number) => setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));

    const resetFiles = () => setFiles([]);

    return { fileInputRef, files, handleFileChange, removeFile, resetFiles };
}