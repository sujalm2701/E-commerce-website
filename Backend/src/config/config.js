import dotenv from "dotenv"

dotenv.config();

const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    SESSION_SECRET: process.env.SESSION_SECRET
}
export default config