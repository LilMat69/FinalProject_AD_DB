import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    ResumeID: { type: Number, required: true },
    ProfessionalID: { type: Number, required: true },
    Titles: [{ type: String }],
    Experience: [{ type: String }],
});

mongoose.model('Resume', resumeSchema);
