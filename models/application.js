import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    ApplicationID: { type: Number, required: true, unique: true },
    ProfessionalID: { type: Number, required: true},
    EmployerID: { type: Number, required: true },
    ApplicationDate: { type: Date, required: true },
    Status: { type: String, default: 'Applied' },
    Comments: {type: String}
});

mongoose.model('applications', applicationSchema);
