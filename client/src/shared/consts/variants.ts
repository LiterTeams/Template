import routes from "../config/routes";

const fontVariants = {
    "mono": "font-mono",
    "russo": "font-RussoOne",
    "impact": "font-Impact",
    "kelly": "font-KellySlab",
    "oswald": "font-Oswald",
}

const clxsVariants = {
    "primary": "btn-primary",
    "secondary": "btn-secondary",
    "additional": "btn-additional",
}

const soundVariants = {
    "scifi": "/sounds/scifi.mp3",
    "echo": "/sounds/echo.mp3",
    "mystery-alert": "/sounds/mystery-alert.mp3",
    "negative-alert": "/sounds/negative-alert.mp3",
    "press": "/sounds/press.mp3",
    "retro-alert": "/sounds/retro-alert.mp3",
    "warning-alert": "/sounds/warning-alert.mp3",
}

const routeVariants = {
    "home": routes.home.href,
}

const variants = {
        fonts: fontVariants,
        sounds: soundVariants,
        clxs: clxsVariants,
        routes: routeVariants,
};

export default variants;