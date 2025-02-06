const checkOrigin = (origin: string, allowedOrigins: string[]): boolean => !allowedOrigins.includes(origin);
export default checkOrigin;