import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function DELETE(req: NextRequest) {
  try {
    const { filename } = await req.json();

    if (!filename) {
      return NextResponse.json(
        { success: false, error: 'Filename is required' },
        { status: 400 }
      );
    }

    // Security: prevent directory traversal
    if (filename.includes('..') || filename.includes('/')) {
      return NextResponse.json(
        { success: false, error: 'Invalid filename' },
        { status: 400 }
      );
    }

    // Check both uploads folder and main images folder
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'uploads');
    const mainImagesDir = path.join(process.cwd(), 'public', 'images');
    
    const uploadPath = path.join(uploadDir, filename);
    const mainPath = path.join(mainImagesDir, filename);

    let deleted = false;

    // Try to delete from uploads folder first
    try {
      await fs.unlink(uploadPath);
      deleted = true;
    } catch (error) {
      // File not in uploads folder, try main folder
      try {
        await fs.unlink(mainPath);
        deleted = true;
      } catch (error) {
        // File not found in either location
      }
    }

    if (deleted) {
      return NextResponse.json(
        { success: true, message: 'Image deleted successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: 'Image not found' },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete image', details: error.message },
      { status: 500 }
    );
  }
}

