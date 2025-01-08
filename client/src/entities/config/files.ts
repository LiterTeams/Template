const _imageExtensions = ["png", "jpg", "jpeg", "webp", "avif"];
const _videoExtensions = ["mp4", "webm", "avi"];
const _noteExtensions = ["doc", "docx", "pdf", "txt", "word", "js"];
const _audioExtensions = ["ogg", "mp3"];
const _archiveExtensions = ["rar", "zip"];
const _extensions = _imageExtensions.concat(_videoExtensions, _noteExtensions, _audioExtensions, _archiveExtensions);

const config = {
    file: {
        images:{
            extensions: _imageExtensions,
            min:"50 KB",
            max:"12 MB",
        },
        videos:{
            extensions: _videoExtensions,
            min:"100 KB",
            max:"2 GB",
        },
        notes:{
            extensions: _noteExtensions,
            min:"100 KB",
            max:"20 MB",
        },
        audio:{
            extensions: _audioExtensions,
            min:"100 KB",
            max:"20 MB",
        },
        archive:{
            extensions: _archiveExtensions,
            min:"5 MB",
            max:"1 GB",
        },
        extensions: _extensions,
    },
    sizes: {"B": 1/8, "BT": 1, "KB": 1024, "MB": 1024 ** 2, "GB": 1024 ** 3, "TB": 1024 ** 4},
}

export default config;