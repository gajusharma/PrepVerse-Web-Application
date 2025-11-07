import { Schema, model, models, type Model } from "mongoose";
import type { User } from "@/types/user";

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

userSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    // remove sensitive fields when returning JSON
    delete ret.password;
    return ret;
  }
});

const UserModel = (models.User as Model<User>) || model<User>("User", userSchema);

export default UserModel;
