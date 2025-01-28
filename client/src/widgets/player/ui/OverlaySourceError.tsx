import { FC } from "react";

import { TbError404Off } from "react-icons/tb";

import Overlay from "./Overlay";

const OverlaySourceError: FC<{error?: string}> = ({error}) => {

    const errorMessage = error || "Не удалось загрузить видео из источников или их нет";

    return(
        <Overlay>
            <TbError404Off className="text-orange-500 duration-300 animate-pulse" size={64} />
            <h2 className="text-orange-500 duration-300 font-bold animate-pulse">{errorMessage}</h2>
        </Overlay>
    )
}

export default OverlaySourceError;