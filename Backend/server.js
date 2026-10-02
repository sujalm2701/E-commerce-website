import app from "./src/app";
import config from "./src/config/config";
import connectDB from "./src/config/database";


app.listen(config.PORT,async ()=>{
    await connectDB()
    console.log(`Server is runing on PORT - ${config.PORT} and i connected to mongodb`)
})