"use client";
import { useState } from "react";

export default function useFile(allowedMimetypes?: string[], multiple: boolean = false) {
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (!selectedFiles) return console.warn("useFile (handleFileChange) - NO FILES!");

        let fileArray = Array.from(selectedFiles);

        if (allowedMimetypes) fileArray = fileArray.filter(file => allowedMimetypes.includes(file.type));

        setFiles(multiple ? [...files, ...fileArray] : fileArray);
    };

    const removeFile = (index: number) => setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));

    const resetFiles = () => setFiles([]);

    return { files, handleFileChange, removeFile, resetFiles };
}
