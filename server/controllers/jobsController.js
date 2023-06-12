import { StatusCodes } from 'http-status-codes';
import Job from '../models/Job.js';
import APIError from '../utils/errors.js';
import mongoose from 'mongoose';
import moment from 'moment';

const createJob = async (req, res) => {
    const { position, company, jobLocation, status, jobType } = req.body;

    if (!position || !company) {
        throw new APIError(StatusCodes.BAD_REQUEST, 'Please provide all values')
    }
    const job = new Job();
    job.position = position;
    job.company = company;
    job.jobLocation = jobLocation;
    job.createdBy = req.user.userId;
    job.status = status;
    job.jobType = jobType;

    await job.save();

    res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
    const filter = { createdBy: req.user.userId, _id: req.params.id };
    const job = await Job.findOne(filter);
    if (!job) {
        throw new APIError(StatusCodes.NOT_FOUND, `No job with id ${req.params.id}`);
    }

    await Job.deleteOne({ createdBy: req.user.userId, _id: req.params.id });

    res.status(StatusCodes.OK).json({ msg: 'success' });
}

const getAllJobs = async (req, res) => {
    const { status, jobType, sort, search } = req.query;
    const filter = {
        createdBy: req.user.userId
    }

    if (status !== 'all') {
        filter.status = status;
    }

    if (jobType !== 'all') {
        filter.jobType = jobType;
    }
    if (search) {
        filter.position = { $regex: search, $options: 'i' }
    }

    let result = Job.find(filter);

    switch (sort) {
        case 'latest':
            result = result.sort({ createdAt: 'desc' });
            break;

        case 'oldest':
            result = result.sort({ createdAt: 'asc' });
            break;

        case 'a-z':
            result = result.sort({ position: 'asc' });
            break;

        case 'z-a':
            result = result.sort({ position: 'desc' });
            break;
        default:
            break;
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const jobs = await result;

    const totalJobs = await Job.countDocuments(filter);

    const numOfPages = Math.ceil(totalJobs / limit);

    res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
}

const updateJob = async (req, res) => {
    const { position, company, jobLocation, jobType, status, editJobId } = req.body;
    if (!position || !company) {
        throw new APIError(StatusCodes.BAD_REQUEST, 'Please provide all values')
    }
    const filter = { _id: editJobId, createdBy: req.user.userId };
    const update = { position, company, jobLocation, jobType, status };
    await Job.findOneAndUpdate(filter, update, {
        runValidators: true,
        new: true
    });

    const job = await Job.findOne(filter);
    res.status(StatusCodes.OK).json({ job });

}

const showStats = async (req, res) => {
    const stats = {
        interview: 0,
        pending: 0,
        declined: 0
    }
    let monthlyApplications = [];
    let data = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
    ])



    if (data.length > 0) {

        data = data.reduce((acc, curr) => {
            const { _id: title, count } = curr;
            acc[title] = count;
            return acc;
        }, {});

        stats.interview = data.interview;
        stats.pending = data.pending;
        stats.declined = data.declined;

        monthlyApplications = await Job.aggregate([
            { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
            {
                $group: {
                    _id: {
                        year: {
                            $year: '$createdAt'
                        },
                        month: {
                            $month: '$createdAt'
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } },
            { $limit: 6 }
        ]);

        monthlyApplications = monthlyApplications.map((curr) => {
            const { _id: { year, month }, count } = curr;
            const date = moment().month(month - 1).year(year).format('MMM, Y');
            return { date, count };
        }).reverse();
    }

    res.status(StatusCodes.OK).json({ stats, monthlyApplications });
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }