import { Schema, model, models, type Model } from "mongoose";
import type { Course } from "@/types/course";

const courseSchema = new Schema<Course>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    level: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    syllabus: { type: [String], default: [] },
    instructor: { type: String, required: true },
    description: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const CourseModel = (models.Course as Model<Course>) || model<Course>("Course", courseSchema);

export default CourseModel;
