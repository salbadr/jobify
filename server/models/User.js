import mongoose from "mongoose"
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: ({ value }) => `${value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        select: false
    },
    lastName: {
        type: String,
        maxlength: 20,
        default: '',
    },
    location: {
        type: String,
        maxlength: 50,
        default: '',
        trim: true
    }
});

UserSchema.pre('save', async function () {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    return;
});

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
}

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
}


export default mongoose.model('User', UserSchema);