import { StatusCodes } from "http-status-codes";
import { APIError } from "../utils/index.js";
import jwt from 'jsonwebtoken';

const authMiddleWare = async (req, resp, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new APIError(StatusCodes.UNAUTHORIZED, 'Authentication Invalid');
    }
    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId };
        next();
    }
    catch (error) {
        throw new APIError(StatusCodes.UNAUTHORIZED, 'Authentication Invalid');
    }
}

export default authMiddleWare;