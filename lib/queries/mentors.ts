import dbConnect from "@/lib/dbConnect";
import MentorModel from "@/models/Mentor";
import type { Mentor } from "@/types/mentor";

const toMentor = (doc: unknown): Mentor => {
  const mentor = doc as Mentor & { _id?: string };
  if (mentor._id && typeof mentor._id !== "string") {
    mentor._id = mentor._id.toString();
  }
  return {
    ...mentor,
    _id: mentor._id ?? undefined
  };
};

export async function getAllMentors(): Promise<Mentor[]> {
  await dbConnect();
  const mentors = await MentorModel.find({}).sort({ createdAt: -1 }).lean();
  return mentors.map(toMentor);
}
