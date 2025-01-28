import Player from "@app/widgets/player/Player"
import { _VideoSourceProps } from "@widgets/player/types/controls.interfaces";

const sources: _VideoSourceProps[] = [{src: "http://localhost:5000/uploads/videos/531397.webm", mimetype: "webm"}];
const poster = "";

export default function HomePageView(){
    return(
        <>
            <div className="container">
                <Player
                    className="rounded-xl"
                    sources={sources}
                    poster={poster}
                    muted={false}
                    showControls
                />
            </div>
        </>
    )
}