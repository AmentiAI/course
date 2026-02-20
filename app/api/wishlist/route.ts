import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }

    // Check if already wishlisted
    const existing = await prisma.wishlist.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
    });

    if (existing) {
      // Remove from wishlist
      await prisma.wishlist.delete({
        where: { id: existing.id },
      });

      return NextResponse.json({ wishlisted: false });
    } else {
      // Add to wishlist
      await prisma.wishlist.create({
        data: {
          userId: session.user.id,
          courseId,
        },
      });

      return NextResponse.json({ wishlisted: true });
    }
  } catch (error) {
    console.error('Wishlist error:', error);
    return NextResponse.json(
      { error: 'Failed to update wishlist' },
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
