import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { signupSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = signupSchema.safeParse(payload);

    if (!parsed.success) {
      const errorMessage = parsed.error.errors[0]?.message ?? "Invalid payload";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { name, email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    await dbConnect();

    const existingUser = await UserModel.findOne({ email: normalizedEmail });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await UserModel.create({
      name,
      email: normalizedEmail,
      password: hashedPassword
    });

    return NextResponse.json({ message: "Account created" }, { status: 201 });
  } catch (error) {
    console.error("Signup error", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
