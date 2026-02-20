import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    console.log('[Wishlist API] Request received');
    
    const session = await getServerSession(authOptions);
    console.log('[Wishlist API] Session:', session ? 'authenticated' : 'not authenticated');
    
    if (!session?.user?.id) {
      console.log('[Wishlist API] No user ID in session');
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    const { courseId } = await req.json();
    console.log('[Wishlist API] Course ID:', courseId);

    if (!courseId) {
      console.log('[Wishlist API] No course ID provided');
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }

    // Verify course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true, title: true },
    });

    if (!course) {
      console.log('[Wishlist API] Course not found:', courseId);
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    console.log('[Wishlist API] Course found:', course.title);

    // Check if already wishlisted
    const existing = await prisma.wishlist.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
    });

    console.log('[Wishlist API] Existing wishlist entry:', existing ? 'yes' : 'no');

    if (existing) {
      // Remove from wishlist
      await prisma.wishlist.delete({
        where: { id: existing.id },
      });
      console.log('[Wishlist API] Removed from wishlist');

      return NextResponse.json({ 
        wishlisted: false,
        message: 'Removed from wishlist' 
      });
    } else {
      // Add to wishlist
      const newWishlist = await prisma.wishlist.create({
        data: {
          userId: session.user.id,
          courseId,
        },
      });
      console.log('[Wishlist API] Added to wishlist:', newWishlist.id);

      return NextResponse.json({ 
        wishlisted: true,
        message: 'Added to wishlist'
      });
    }
  } catch (error: any) {
    console.error('[Wishlist API] Error:', error);
    console.error('[Wishlist API] Error message:', error.message);
    console.error('[Wishlist API] Error code:', error.code);
    
    return NextResponse.json(
      { 
        error: 'Failed to update wishlist',
        details: error.message,
        code: error.code
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ wishlist: [] });
    }

    const wishlist = await prisma.wishlist.findMany({
      where: { userId: session.user.id },
      include: {
        course: {
          include: {
            _count: { select: { enrollments: true } },
          },
        },
      },
    });

    return NextResponse.json({ wishlist });
  } catch (error) {
    console.error('Wishlist fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wishlist' },
      { status: 500 }
    );
  }
}
