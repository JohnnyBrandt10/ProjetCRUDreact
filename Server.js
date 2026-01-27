import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import './config/Db.js';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import { checkUser, requireAuth } from './middleware/auth.middleware.js';

const app = express();

app.use("/uploads", express.static("client/uploads"));


app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// jwt middleware
app.use(checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
