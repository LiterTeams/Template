import { ExtensionsPropsT } from "@shared/types/enum.types";

const checkFileFormat = (fileFormat: ExtensionsPropsT, checkFormat: ExtensionsPropsT[]):boolean => checkFormat.includes(fileFormat);

export default checkFileFormat;