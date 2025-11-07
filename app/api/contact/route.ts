import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ContactModel from "@/models/Contact";
import { contactSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = contactSchema.parse(payload);

    await dbConnect();
    const created = await ContactModel.create({ ...data });
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    console.error("POST /api/contact error", error);
    const message =
      error instanceof Error ? error.message : "Unable to submit message";
    return NextResponse.json({ message }, { status: 400 });
  }
}
