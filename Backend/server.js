import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/database.js";


app.listen(config.PORT,async ()=>{
    await connectDB()
    console.log(`Server is runing on PORT - ${config.PORT} and i connected to mongodb`)
})