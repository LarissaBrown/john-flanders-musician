import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function PUT(req: NextRequest) {
  try {
    const { oldFilename, newFilename } = await req.json();

    if (!oldFilename || !newFilename) {
      return NextResponse.json(
        { success: false, error: 'Both old and new filenames are required' },
        { status: 400 }
      );
    }

    // Security: prevent directory traversal
    if (
      oldFilename.includes('..') ||
      oldFilename.includes('/') ||
      newFilename.includes('..') ||
      newFilename.includes('/')
    ) {
      return NextResponse.json(
        { success: false, error: 'Invalid filename' },
        { status: 400 }
      );
    }

    // Check both uploads folder and main images folder
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'uploads');
    const mainImagesDir = path.join(process.cwd(), 'public', 'images');

    const oldUploadPath = path.join(uploadDir, oldFilename);
    const newUploadPath = path.join(uploadDir, newFilename);
    const oldMainPath = path.join(mainImagesDir, oldFilename);
    const newMainPath = path.join(mainImagesDir, newFilename);

    let renamed = false;
    let newUrl = '';

    // Try to rename in uploads folder first
    try {
      await fs.access(oldUploadPath);
      await fs.rename(oldUploadPath, newUploadPath);
      renamed = true;
      newUrl = `/images/uploads/${newFilename}`;
    } catch (error) {
      // File not in uploads folder, try main folder
      try {
        await fs.access(oldMainPath);
        await fs.rename(oldMainPath, newMainPath);
        renamed = true;
        newUrl = `/images/${newFilename}`;
      } catch (error) {
        // File not found in either location
      }
    }

    if (renamed) {
      return NextResponse.json(
        { success: true, message: 'Image renamed successfully', newUrl },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: 'Image not found' },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error('Error renaming image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to rename image', details: error.message },
      { status: 500 }
    );
  }
}





