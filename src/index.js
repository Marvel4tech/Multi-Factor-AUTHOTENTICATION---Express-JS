import express, { urlencoded } from "express"
import dotenv from "dotenv"
import passport from "passport"
import cors from "cors"
import session from "express-session"
import dbConnect from "./config/dbConnect.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()
dbConnect()


const app = express()

// Middlewares
const corsOptions = {
    origin: ["http://localhost:3001"],
    credentials: true,
}
app.use(cors(corsOptions))
app.use(express.json({ limit: "100mb" }))
app.use(urlencoded({ limit: "100mb", extended: true}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60,
    },
}))
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use("/api/auth", authRoutes)

// Listen
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})