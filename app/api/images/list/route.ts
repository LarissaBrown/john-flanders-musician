import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'uploads');
    
    // Ensure the directory exists
    try {
      await fs.access(uploadDir);
    } catch {
      // Directory doesn't exist, create it
      await fs.mkdir(uploadDir, { recursive: true });
      return NextResponse.json({ success: true, images: [] }, { status: 200 });
    }

    // Read all files in the uploads directory
    const files = await fs.readdir(uploadDir);
    
    // Filter for image files only
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });

    // Get file stats for sorting by modification time
    const imagesWithStats = await Promise.all(
      imageFiles.map(async (filename) => {
        const filePath = path.join(uploadDir, filename);
        const stats = await fs.stat(filePath);
        return {
          filename,
          url: `/images/uploads/${filename}`,
          modifiedTime: stats.mtime.getTime(),
        };
      })
    );

    // Sort by modification time (newest first)
    imagesWithStats.sort((a, b) => b.modifiedTime - a.modifiedTime);

    // Return just filename and url
    const images = imagesWithStats.map(({ filename, url }) => ({
      filename,
      url,
    }));

    return NextResponse.json({ success: true, images }, { status: 200 });
  } catch (error: any) {
    console.error('Error listing images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to list images', details: error.message },
      { status: 500 }
    );
  }
}





