import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log('Test Wishlist - Session:', session);
    
    if (!session?.user?.id) {
      return NextResponse.json({
        authenticated: false,
        message: 'Not logged in',
      });
    }

    // Get wishlist count
    const wishlistCount = await prisma.wishlist.count({
      where: { userId: session.user.id },
    });

    // Get sample course ID
    const firstCourse = await prisma.course.findFirst({
      select: { id: true, title: true },
    });

    return NextResponse.json({
      authenticated: true,
      userId: session.user.id,
      userEmail: session.user.email,
      wishlistCount,
      sampleCourseId: firstCourse?.id,
      sampleCourseTitle: firstCourse?.title,
      message: 'Wishlist API is working! Try adding course ' + firstCourse?.id,
    });
  } catch (error: any) {
    console.error('Test wishlist error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
