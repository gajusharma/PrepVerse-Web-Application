import { Schema, model, models, type Model } from "mongoose";
import type { ContactMessage } from "@/types/contact";

const contactSchema = new Schema<ContactMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

const ContactModel =
  (models.Contact as Model<ContactMessage>) ||
  model<ContactMessage>("Contact", contactSchema);

export default ContactModel;
