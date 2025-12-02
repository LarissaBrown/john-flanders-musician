import { NextResponse } from 'next/server';

// Default seed data for products (albums)
const defaultProducts = [
  {
    _id: 'product-1',
    name: 'The Go Between',
    price: 14.99,
    type: 'album',
    imageUrl: '/images/the-go-between-cover.jpg',
    description: 'Latest album from John Flanders & Double Helix',
    stock: 100,
  },
  {
    _id: 'product-2',
    name: 'Natural Selection',
    price: 14.99,
    type: 'album',
    imageUrl: '/images/natural-selection-cover.jpg',
    description: 'Award-winning album by Double Helix - City Weekly Best Jazz Group',
    stock: 100,
  },
  {
    _id: 'product-3',
    name: 'In The Sky Tonight',
    price: 14.99,
    type: 'album',
    imageUrl: '/images/in-the-sky-tonight-cover.jpg',
    description: 'Critically acclaimed album by John Flanders & Double Helix',
    stock: 100,
  },
  {
    _id: 'product-4',
    name: 'A Prehensile Tale',
    price: 12.99,
    type: 'album',
    imageUrl: '/images/a-prehensile-tale-cover.jpg',
    description: 'Solo album by John Flanders',
    stock: 100,
  },
  {
    _id: 'product-5',
    name: 'Stranded in Time',
    price: 12.99,
    type: 'album',
    imageUrl: '/images/stranded-in-time-cover.jpg',
    description: 'Solo album by John Flanders',
    stock: 100,
  },
];

export async function GET() {
  try {
    // Return seed data for now
    // In production with MongoDB, this would query the database
    return NextResponse.json(defaultProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // For now, just return success with the data
    // In production with MongoDB, this would save to database
    const newProduct = {
      _id: `product-${Date.now()}`,
      ...body,
    };
    
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
