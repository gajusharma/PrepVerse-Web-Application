import { Schema, model, models, type Model } from "mongoose";
import type { Mentor } from "@/types/mentor";

const mentorSchema = new Schema<Mentor>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    experience: { type: String, required: true },
    image: { type: String, required: true },
    bio: { type: String, required: true },
    socials: {
      linkedin: { type: String },
      twitter: { type: String }
    }
  },
  {
    timestamps: true
  }
);

const MentorModel = (models.Mentor as Model<Mentor>) || model<Mentor>("Mentor", mentorSchema);

export default MentorModel;
