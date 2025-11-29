import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  products: Array<{
    productId: string;
    title: string;
    type: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  paymentMethod: 'paypal' | 'venmo';
  paymentId: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  downloadLinks?: string[];
  status: 'processing' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
  orderNumber: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  products: [{
    productId: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
  }],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['paypal', 'venmo'], required: true },
  paymentId: { type: String, required: true },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  downloadLinks: [{ type: String }],
  status: { type: String, enum: ['processing', 'completed', 'cancelled'], default: 'processing' },
}, {
  timestamps: true,
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

