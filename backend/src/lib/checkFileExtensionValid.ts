import config from "src/const/files";
import checkFileExtension from "./checkFileExtension";
const checkFileExtensionValid = (extension: string) => checkFileExtension(config.extensions, extension);
export default checkFileExtensionValid;