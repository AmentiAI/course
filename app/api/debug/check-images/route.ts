import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Get 10 random courses with their thumbnails
    const courses = await prisma.course.findMany({
      select: {
        slug: true,
        title: true,
        thumbnail: true,
        category: true,
      },
      take: 10,
    });

    // Extract image IDs
    const imageCheck = courses.map(c => ({
      slug: c.slug,
      title: c.title,
      category: c.category,
      imageId: c.thumbnail.match(/photos\/(\d+)\//)?.[1] || 'unknown',
      fullUrl: c.thumbnail,
    }));

    return NextResponse.json({
      success: true,
      sample: imageCheck,
      totalCourses: await prisma.course.count(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
