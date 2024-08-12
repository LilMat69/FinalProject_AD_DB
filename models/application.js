import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    ApplicationID: { type: Number, required: true, unique: true },
    ProfessionalID: { type: Number, required: true},
    JobPostingID: { type: Number, required: true },
    ApplicationDate: { type: Date, required: true },
    Status: { type: String, required: true, default: 'Applied' },
    Comments: {type: String}
});

mongoose.model('Application', applicationSchema);
