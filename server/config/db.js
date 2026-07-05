import mongoose from "mongoose"
import { config } from "dotenv"
config()
const connectDb = async()=> {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database connected");
        
    } catch (error) {
        console.log("error in database connection",error);
        process.exit(1);
    }
}

export default connectDb;