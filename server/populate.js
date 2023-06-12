import { readFile } from 'fs/promises';
import path from 'path';

import dotenv from 'dotenv';
import { connectDB } from './db/connect.js';
import Job from './models/Job.js';

dotenv.config();

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        await Job.deleteMany();

        const data = JSON.parse(await readFile(path.resolve('./mock-data.json'), { encoding: 'utf-8' }));
        await Job.create(data);
        console.log("SUCCESS");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();