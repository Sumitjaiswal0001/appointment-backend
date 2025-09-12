import express from "express";
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// --- START CORS CONFIGURATION ---

// List of allowed frontend URLs
const allowedOrigins = [
  'https://appointment-frontend-kappa.vercel.app',
  // You can add other URLs here, like your local development environment
  'http://localhost:3000',
  'http://localhost:5173' 
];

const corsOptions = {
  origin: (origin, callback) => {
    // Check if the incoming origin is in our allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  // This is important for login systems as it allows cookies/credentials to be sent
  credentials: true 
};

// --- END CORS CONFIGURATION ---


// middlewares
app.use(express.json());
app.use(cookieParser());

// Use the new corsOptions
app.use(cors(corsOptions));

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log(`Server started on PORT:${port}`));