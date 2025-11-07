import dbConnect from "@/lib/dbConnect";
import MentorModel from "@/models/Mentor";
import type { Mentor } from "@/types/mentor";

type WithMaybeObjectId<T> = T & {
  _id?: string | { toString(): string } | null | undefined;
};

const hasToString = (value: unknown): value is { toString(): string } =>
  typeof value === "object" && value !== null && typeof (value as { toString?: unknown }).toString === "function";

const toMentor = (doc: unknown): Mentor => {
  const raw = doc as any;
  if (raw._id && typeof raw._id.toString === "function") {
    raw._id = raw._id.toString();
  }
  return raw as Mentor;
};

export async function getAllMentors(): Promise<Mentor[]> {
  await dbConnect();
  const mentors = await MentorModel.find({}).sort({ createdAt: -1 }).lean();
  return mentors.map(toMentor);
}
