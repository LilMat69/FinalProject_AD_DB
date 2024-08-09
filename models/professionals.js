import mongoose from "mongoose";

const professionalsSchema = new mongoose.Schema({
    ProfessionalID: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Sex: {type: String },
    Applications: [{ type: Number, type: String }],
    Resume: { type: String, required: true }
});

mongoose.model('Professionals', professionalsSchema);
