import routes from "../config/routes";

const fontVariants = {
    "mono": "font-mono",
}

const clxsVariants = {
    "primary": "btn-primary",
    "secondary": "btn-secondary",
    "additional": "btn-additional",
}

const routeVariants = {
    "home": routes.home.href,
    "login": routes.login.href,
    "register": routes.register.href,
}

const variants = {
        fonts: fontVariants,
        clxs: clxsVariants,
        routes: routeVariants,
};

export default variants;