import { 
    ImageExtensionEnumT, VideoExtensionEnumT, AudioExtensionEnumT,
    UnitEnumT, UnitEndWithPrefix 
} from "src/types/enum.types";

interface FileConfigIF {
    useAutomaticConversion: boolean;
    imageAutoConversion: ImageExtensionEnumT;
    videoAutoConversion: VideoExtensionEnumT;
    audioAutoConversion: AudioExtensionEnumT;
    
    allowedExtensions: {
        image: string[];
        video: string[];
        note: string[];
        audio: string[];
        archive: string[];
    }
    allowedSizes: {
        image: {min: UnitEndWithPrefix, max: UnitEndWithPrefix},
        video: {min: UnitEndWithPrefix, max: UnitEndWithPrefix},
        note: {min: UnitEndWithPrefix, max: UnitEndWithPrefix},
        audio: {min: UnitEndWithPrefix, max: UnitEndWithPrefix},
        archive: {min: UnitEndWithPrefix, max: UnitEndWithPrefix},
    },
    uploads: {
        root: string;
        image: string;
        video: string;
        note: string;
        audio: string;
        archive: string;
    },
    units: Record<UnitEnumT, number>,
}

const fileConfig: FileConfigIF = {
    useAutomaticConversion: true,
    imageAutoConversion: "webp",
    videoAutoConversion: "webm",
    audioAutoConversion: "acc",
    
    allowedExtensions: {
        image: ["jpg","jpeg","png","webp","avif"],
        video: ["mp4","webm","avi"],
        note: ["doc","docx","js","pdf","txt","word"],
        audio: ["mp3","ogg","acc"],
        archive: ["rar","zip","7zip"],
    },
    allowedSizes: {
        image: {min: "1 KB", max: "64 MB"},
        video: {min: "1 MB", max: "8 GB"},
        note: {min: "1 KB", max: "1 GB"},
        audio: {min: "1 KB", max: "32 MB"},
        archive: {min: "1 MB", max: "3 GB"},
    },
    uploads: {
        root: "uploads",
        image: "images",
        video: "videos",
        note: "notes",
        audio: "audio",
        archive: "archives",
    },
    units: {
        "B": 1/8,
        "BT": 1,
        "KB": 1024,
        "MB": 1024 ** 2,
        "GB": 1024 ** 3,
        "TB": 1024 ** 4
    },
}

export default fileConfig;