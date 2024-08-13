import mongoose from "mongoose";

const jobPostingSchema = new mongoose.Schema({
    JobPostingID: { type: Number, required: true },
    EmployerID: { type: String, required: true },
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    Requirements: [{ type: String, required: true }],
    Location: { type: String, required: true },
    Status: {type: String, required: true},
    PostedDate: { type: Date, required: true },
    ExpiryDate: { type: Date, required: true }
});

mongoose.model('jobpostings', jobPostingSchema);
