
import dotenv from 'dotenv'
dotenv.config()
import {clerkMiddleware} from '@clerk/express'
import express from 'express'
import userRoutes from './routes//user.route.js'
import adminRoutes from './routes/admin.route.js'
import authRoutes from './routes/auth.route.js'
import statRoutes from './routes/stat.route.js'
import songRoutes from './routes/song.route.js'
import albumRoutes from './routes/album.route.js'
import cors from 'cors'
import { connectDB } from './lib/db.js'
import fileUpload from "express-fileupload";
import path from "path"
import { createServer } from 'http'
import { initializeSocket } from './lib/socket.js'
import cron from "node-cron"
import fs from "fs"

const app=express()
const __dirname=path.resolve()
const httpServer=createServer(app)
initializeSocket(httpServer);


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())
app.use(clerkMiddleware())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:path.join(__dirname,"tmp"),
    createParentPath: true,
		limits: {
			fileSize: 10 * 1024 * 1024, // 10MB  max file size
		},
}))

const tempDir=path.join(process.cwd(),"tmp")

cron.schedule("0 * * * *", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {});
			}
		});
	}
});

app.use('/api/users',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/songs',songRoutes)
app.use('/api/albums',albumRoutes)
app.use('/api/stats',statRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));
	app.get(/(.*)/, (req, res) => {
		res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
	});
}


const port =process.env.PORT || 5001

httpServer.listen(port,()=>{
    connectDB()
    console.log(`listening on port ${port}` )
})