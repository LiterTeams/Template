import * as crypto from "crypto";
import bcryptHash from "./bcryptHash";

const generateUAK = async (length = 64, saltRounds = 10) => {
    const randomString = crypto.randomBytes(length).toString("hex");
    const hashedUAK = await bcryptHash(randomString, saltRounds);
    return hashedUAK;
}

export default generateUAK;