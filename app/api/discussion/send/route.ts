import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseSlug, message } = await req.json();

    if (!courseSlug || !message?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Get course and verify enrollment
    const course = await prisma.course.findUnique({
      where: { slug: courseSlug },
      include: {
        discussion: true,
        enrollments: {
          where: { userId: session.user.id },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    if (course.enrollments.length === 0) {
      return NextResponse.json(
        { error: "Not enrolled in this course" },
        { status: 403 }
      );
    }

    if (!course.discussion) {
      return NextResponse.json(
        { error: "Discussion not found" },
        { status: 404 }
      );
    }

    // Create message
    const discussionMessage = await prisma.discussionMessage.create({
      data: {
        discussionId: course.discussion.id,
        userId: session.user.id,
        message: message.trim(),
      },
    });

    return NextResponse.json({ success: true, message: discussionMessage });
  } catch (error) {
    console.error("Error sending discussion message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
