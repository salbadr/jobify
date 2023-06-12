import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { APIError } from '../utils/index.js';


const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new APIError(StatusCodes.BAD_REQUEST, 'please provide all values');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new APIError(StatusCodes.BAD_REQUEST, 'email already exists');
    }

    const user = await User.create({ name, email, password });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            location: user.location
        },
        token,
        location: user.location
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new APIError(StatusCodes.BAD_REQUEST, 'please provide all values');
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new APIError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }

    const isPasswordCorrect = await user.checkPassword(password)
    if (!isPasswordCorrect) {
        throw new APIError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user: {
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            location: user.location
        },
        token,
        location: user.location
    });
}

const updateUser = async (req, res) => {
    const { name, email, lastName, location } = req.body;
    if (!name || !email || !lastName || !location) {
        throw new APIError(StatusCodes.BAD_REQUEST, 'please provide all values');
    }

    const user = await User.findById(req.user.userId);
    if (user) {
        user.name = name;
        user.email = email;
        user.lastName = lastName;
        user.location = location;
        await user.save();
    }

    res.status(StatusCodes.OK).json({
        user,
        location: user.location
    });
}

export { register, login, updateUser }