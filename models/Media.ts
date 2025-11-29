import mongoose, { Schema, Document } from 'mongoose';

export interface IMedia extends Document {
  title: string;
  type: 'audio' | 'video';
  url: string;
  thumbnailUrl?: string;
  description?: string;
  duration?: string;
  featured: boolean;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema: Schema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['audio', 'video'], required: true },
  url: { type: String, required: true },
  thumbnailUrl: { type: String },
  description: { type: String },
  duration: { type: String },
  featured: { type: Boolean, default: false },
  category: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.Media || mongoose.model<IMedia>('Media', MediaSchema);

