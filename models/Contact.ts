import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  eventType?: string;
  eventDate?: Date;
  message: string;
  status: 'new' | 'read' | 'responded' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  eventType: { type: String },
  eventDate: { type: Date },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'responded', 'archived'], default: 'new' },
}, {
  timestamps: true,
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

