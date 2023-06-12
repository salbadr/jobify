import mongoose from "mongoose"

const { Schema } = mongoose;

const JobSchema = new Schema({
    position: {
        type: String,
        required: [true, 'Please provide position'],
        maxlength: 100,
        trim: true
    },
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxlength: 50,
        trim: true
    },
    jobLocation: {
        type: String,
        required: [true, 'Please provide job location'],
        maxlength: 50,
        default: '',
        trim: true
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'remote', 'internship'],
        default: 'full-time'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    },
}, { timestamps: true });


export default mongoose.model('Job', JobSchema);