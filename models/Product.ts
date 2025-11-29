import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  artist: string;
  type: 'song' | 'album';
  price: number;
  description?: string;
  coverImageUrl?: string;
  audioPreviewUrl?: string;
  downloadUrl?: string;
  trackListing?: string[];
  releaseDate?: Date;
  duration?: string;
  genre?: string;
  featured: boolean;
  inStock: boolean;
  digitalDownload: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, default: 'John Flanders' },
  type: { type: String, enum: ['song', 'album'], required: true },
  price: { type: Number, required: true },
  description: { type: String },
  coverImageUrl: { type: String },
  audioPreviewUrl: { type: String },
  downloadUrl: { type: String },
  trackListing: [{ type: String }],
  releaseDate: { type: Date },
  duration: { type: String },
  genre: { type: String },
  featured: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true },
  digitalDownload: { type: Boolean, default: true },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

