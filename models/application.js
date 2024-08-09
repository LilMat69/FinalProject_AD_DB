import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    ApplicationID: { type: Number, required: true },
    Professional: [{ type: Number, type: String, type: String, type: String}],
    JobPostingID: { type: Number, required: true },
    ApplicationDate: { type: Date, required: true },
    Status: { type: String, required: true, default: 'Applied' }
});

mongoose.model('Application', applicationSchema);
