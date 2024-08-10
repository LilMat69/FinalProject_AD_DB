import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    ApplicationID: { type: Number, required: true },
    ProfessionalID: { type: Number, required: true},
    JobPostingID: { type: Number, required: true },
    ApplicationDate: { type: Date, required: true },
    Status: { type: String, required: true, default: 'Applied' }
});

mongoose.model('Application', applicationSchema);
