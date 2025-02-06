import { FC } from "react";

import { TbError404Off } from "react-icons/tb";

import Overlay from "./Overlay";

const OverlaySourceError: FC<{error?: string}> = ({error}) => {

    const errorMessage = error || "Не удалось загрузить видео";

    return(
        <Overlay className="flex flex-col gap-2 flex-center pointer-events-none animate-pulse">
            <TbError404Off className="text-orange-500 duration-300" size={64} />
            <h2 className="text-orange-500 duration-300 font-bold">{errorMessage}</h2>
            <p className="text-gray-400">Если вы видите данную ошибку, нажмите на флажок и сообщите нам.</p>
        </Overlay>
    )
}

export default OverlaySourceError;