import 'express-async-errors';

import express from 'express';

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authMiddleWare from './middleware/auth.js';

import dotenv from 'dotenv';
import { connectDB } from './db/connect.js';
import morgan from 'morgan';

import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.get('/', (request, response) => {
    response.send('Welcome');
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authMiddleWare, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();