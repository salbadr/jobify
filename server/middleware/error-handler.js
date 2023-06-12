import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (error, req, res, next) => {
    const defaultError = {
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: error.message || 'Something went wrong, try again later'
    }

    if (error.name === 'ValidationError') {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = error.message;
    }

    res.status(defaultError.statusCode).json({ msg: defaultError.msg });
}

export default errorHandlerMiddleware;