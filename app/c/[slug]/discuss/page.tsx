import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Send, Users } from "lucide-react";
import DiscussionChat from "@/components/DiscussionChat";

async function getCourseWithDiscussion(slug: string) {
  return prisma.course.findUnique({
    where: { slug },
    include: {
      discussion: {
        include: {
          messages: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
            orderBy: { createdAt: "asc" },
          },
        },
      },
      enrollments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
      _count: { select: { enrollments: true } },
    },
  });
}

export default async function CourseDiscussionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  const course = await getCourseWithDiscussion(slug);

  if (!course) {
    notFound();
  }

  // Check if user is enrolled
  const isEnrolled = session?.user?.id
    ? course.enrollments.some((e) => e.userId === session.user.id)
    : false;

  if (!isEnrolled && !session) {
    redirect(`/auth/signin?callbackUrl=/c/${slug}/discuss`);
  }

  if (!isEnrolled) {
    redirect(`/courses/${slug}`);
  }

  const messages = course.discussion?.messages || [];
  const activeStudents = course.enrollments.slice(0, 8);

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={`/courses/${slug}`}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Course
              </Link>
              <div className="h-5 w-px bg-zinc-800" />
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-400" />
                <h1 className="text-lg font-bold text-white">{course.title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Users className="h-4 w-4" />
              <span>{course._count.enrollments} students enrolled</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr,300px] gap-8">
          {/* Main Chat Area */}
          <div className="space-y-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
              <div className="border-b border-zinc-800 p-4 bg-zinc-900/80">
                <h2 className="text-lg font-semibold text-white">
                  Course Discussion
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Ask questions, share insights, and connect with fellow students
                </p>
              </div>

              {/* Messages */}
              <div className="p-6 space-y-4 min-h-[500px] max-h-[600px] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="h-16 w-16 rounded-full bg-purple-600/20 flex items-center justify-center mb-4">
                      <MessageSquare className="h-8 w-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      No messages yet
                    </h3>
                    <p className="text-zinc-400 max-w-md">
                      Be the first to start the conversation! Ask a question,
                      share what you've learned, or introduce yourself to your
                      classmates.
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div key={message.id} className="flex gap-3">
                      {message.user.image ? (
                        <img
                          src={message.user.image}
                          alt=""
                          className="h-10 w-10 rounded-full shrink-0"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
                          {message.user.name?.[0]?.toUpperCase() ?? "?"}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-semibold text-white">
                            {message.user.name}
                          </span>
                          <span className="text-xs text-zinc-500">
                            {new Date(message.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-zinc-300 text-sm whitespace-pre-wrap">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              <DiscussionChat
                courseSlug={slug}
                userId={session?.user?.id || ""}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Students */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h3 className="text-sm font-semibold text-white mb-4">
                Active Students
              </h3>
              <div className="space-y-3">
                {activeStudents.map((enrollment) => (
                  <div key={enrollment.id} className="flex items-center gap-3">
                    {enrollment.user.image ? (
                      <img
                        src={enrollment.user.image}
                        alt=""
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white">
                        {enrollment.user.name?.[0]?.toUpperCase() ?? "?"}
                      </div>
                    )}
                    <span className="text-sm text-zinc-300">
                      {enrollment.user.name}
                    </span>
                  </div>
                ))}
              </div>
              {course._count.enrollments > 8 && (
                <p className="text-xs text-zinc-500 mt-4">
                  +{course._count.enrollments - 8} more students
                </p>
              )}
            </div>

            {/* Guidelines */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h3 className="text-sm font-semibold text-white mb-3">
                Community Guidelines
              </h3>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li>• Be respectful and supportive</li>
                <li>• Stay on topic</li>
                <li>• No spam or self-promotion</li>
                <li>• Help others when you can</li>
                <li>• Share your wins and learnings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
