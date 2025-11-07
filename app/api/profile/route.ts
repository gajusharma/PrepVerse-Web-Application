import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { profileUpdateSchema } from "@/lib/validators";
import { auth } from "@/auth";

export async function PATCH(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await request.json();
    const parsed = profileUpdateSchema.safeParse(payload);

    if (!parsed.success) {
      const errorMessage = parsed.error.errors[0]?.message ?? "Invalid payload";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { name, email, password } = parsed.data;
    const update: Record<string, unknown> = {};

    if (name) {
      update.name = name;
    }

    if (email) {
      update.email = email.toLowerCase();
    }

    if (password) {
      update.password = await bcrypt.hash(password, 12);
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    await dbConnect();

    if (update.email) {
      const existingUser = await UserModel.findOne({
        email: update.email,
        _id: { $ne: session.user.id }
      }).select({ _id: 1 });

      if (existingUser) {
        return NextResponse.json({ error: "Email already in use" }, { status: 409 });
      }
    }

    await UserModel.findByIdAndUpdate(session.user.id, update, { new: false });

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Profile update error", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
