import express from "express";
import http from "http"
import connectDb from "./config/db.js";
import cors from "cors";
import { config } from "dotenv";
import Userrouter from "./routes/user.route.js";
import Notesrouter from "./routes/notes.route.js";
config();

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use("/api/auth",Userrouter)
app.use("/api/notes",Notesrouter)

connectDb().then(() => {
  httpServer.listen(PORT , ()=>{
    console.log(`Server is running on port no ${PORT}`);
    
  })
})
