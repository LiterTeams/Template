import Player from "@app/widgets/player/Player"

export default function HomePageView(){
    return(
        <>
            <div className="container">
                <Player className="w-full h-full rounded-xl" preload="metadata" muted={false} loop playOnClick useControls />
            </div>
        </>
    )
}