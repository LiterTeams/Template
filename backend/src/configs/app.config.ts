export default () => ({
    // General
    prefix: process.env.PREFIX,
    port: process.env.PORT,
    salt: process.env.SALT,
    server: process.env.SERVER_URL,
    allowedOrigins: process.env.ALLOWED_ORIGINS,
    
    // JWT
    secretJWT: process.env.SECRET_JWT,
    expireAccessJWT: process.env.EXPIRE_ACCESS_JWT,
    expireRefreshJWT: process.env.EXPIRE_REFRESH_JWT,

    // Session
    cookiesSecret: process.env.COOKIES_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
    sessionName: process.env.SESSION_NAME,
    sessionDomain: process.env.SESSION_DOMAIN,
    sessionMaxAge: process.env.SESSION_MAX_AGE,
    sessionHTTPOnly: process.env.SESSION_HTTP_ONLY,
    sessionSecure: process.env.SESSION_SECURE,
    sessionFolder: process.env.SESSION_FOLDER,

    // Redis
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    redisPassword: process.env.REDIS_PASSWORD,
    redisURL: process.env.REDIS_URL,

    // Mail
    mailAPIKey: process.env.MAIL_API_KEY,
    mainlPort: process.env.MAIL_PORT,
    mainlLogin: process.env.MAIL_LOGIN,
    mainlPassword: process.env.MAIL_PASSWORD,
});