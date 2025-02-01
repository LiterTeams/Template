import Player from "@app/widgets/player/Player"
import { SourceProps, VoiceProps, SubtitleProps } from "@app/widgets/player/types/player";

const poster = "https://sun1-90.userapi.com/impg/Ig4ZgF4ddnGGMvzv9ZAT4Ske9sqNrbrBf7GyOQ/wIJ63m__4XQ.jpg?size=2560x827&quality=95&sign=5cc9b12398e0f72ed09d1816a77b527b&type=album";

const sources: SourceProps[] = [
    {
        id: 1,
        quality: "FHD",
        label: "1080p",
        src: "http://localhost:5000/uploads/videos/FHD/1.mp4",
        mimetype: "mp4",
    },
    {
        id: 2,
        quality: "HD",
        label: "720p",
        src: "http://localhost:5000/uploads/videos/HD/1.mp4",
        mimetype: "mp4",
    },
    {
        id: 3,
        quality: "HD",
        label: "480p",
        src: "http://localhost:5000/uploads/videos/VGA/1.mp4",
        mimetype: "mp4",
    },
];

const voices: VoiceProps[] = [
    {
        id: 1,
        label: "Anilibria",
        src: "http://localhost:5000/uploads/videos/VGA/1.mp3",
        mimetype: "mp3",
    },
    {
        id: 2,
        label: "DreamCast",
        src: "http://localhost:5000/uploads/videos/VGA/1.mp3",
        mimetype: "mp3",
    }
];

const subtitles: SubtitleProps[] = [
    {
        id: 1,
        label: "Russian",
        srclang: "ru",
        src: "lang.src",
    },
    {
        id: 2,
        label: "English",
        srclang: "en",
        src: "lang.src",
    }
]

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
                    autoRemoveMissingControllers
                />
            </div>
        </>
    )
}