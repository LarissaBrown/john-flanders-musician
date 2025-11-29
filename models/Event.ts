import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  venue: string;
  location: string;
  date: Date;
  time: string;
  description?: string;
  ticketUrl?: string;
  imageUrl?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  venue: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  description: { type: String },
  ticketUrl: { type: String },
  imageUrl: { type: String },
  featured: { type: Boolean, default: false },
}, {
  timestamps: true,
});

export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

