import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';

// Generate unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `JF-${timestamp}-${random}`.toUpperCase();
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const { 
      customerName, 
      customerEmail, 
      products, 
      paymentMethod, 
      paymentId 
    } = body;
    
    // Validate products and calculate total
    let totalAmount = 0;
    const orderProducts = [];
    
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product || !product.inStock) {
        return NextResponse.json(
          { success: false, error: `Product ${item.productId} not available` },
          { status: 400 }
        );
      }
      
      orderProducts.push({
        productId: product._id.toString(),
        title: product.title,
        type: product.type,
        price: product.price,
        quantity: item.quantity || 1,
      });
      
      totalAmount += product.price * (item.quantity || 1);
    }
    
    // Create order
    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      customerName,
      customerEmail,
      products: orderProducts,
      totalAmount,
      paymentMethod,
      paymentId,
      paymentStatus: 'completed', // Will be updated by payment webhook
      status: 'processing',
    });
    
    // TODO: Send confirmation email with download links
    
    return NextResponse.json({ 
      success: true, 
      data: order,
      message: 'Order created successfully' 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const orderNumber = searchParams.get('orderNumber');
    
    let query: any = {};
    
    if (email) {
      query.customerEmail = email;
    }
    
    if (orderNumber) {
      query.orderNumber = orderNumber;
    }
    
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(100);
    
    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

