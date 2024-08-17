import mongoose from "mongoose";

const professionsSchema = new mongoose.Schema({
  ProfessionID: { type: Number, required: true, unique: true },
  Description: { type: String, required: true },
});

mongoose.model("professions", professionsSchema);
