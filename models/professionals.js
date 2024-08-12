import mongoose from "mongoose";

const professionalsSchema = new mongoose.Schema({
    ProfessionalID: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Sex: {type: String },
    ApplicationID: { type: Number, required: true},
    ResumeID: { type: Number, required: true }
});

mongoose.model('Professionals', professionalsSchema);
