import mongoose from "mongoose";

const professionalsSchema = new mongoose.Schema({
    ProfessionalID: { type: Number, required: true, unique: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Sex: {type: String, required: true },
    MaxApplication: {type: Number, default: 0},
    ApplicationID: { type: Number, },
    ResumeID: { type: Number, required: true }
});

mongoose.model('professionals', professionalsSchema);
