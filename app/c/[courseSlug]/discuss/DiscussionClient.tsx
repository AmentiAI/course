"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, MessageSquare, Lock } from "lucide-react";

interface Props {
  courseSlug: string;
  courseId: string;
  isEnrolled: boolean;
  isLoggedIn: boolean;
}

// Sample placeholder discussions (will be replaced by real DB data once Discussion model is added)
const PLACEHOLDER_DISCUSSIONS = [
  {
    id: "1",
    author: "Marcus Chen",
    avatar: "MC",
    question: "What's the best tool for tracking NFT floor prices in real-time?",
    replies: 3,
    time: "2 days ago",
    answered: true,
  },
  {
    id: "2",
    author: "Priya Sharma",
    avatar: "PS",
    question: "How do you handle gas fees when flipping multiple NFTs in one day?",
    replies: 7,
    time: "5 days ago",
    answered: true,
  },
  {
    id: "3",
    author: "Jake Morrison",
    avatar: "JM",
    question: "Is there a way to automate the buy/sell triggers?",
    replies: 2,
    time: "1 week ago",
    answered: false,
  },
];

export default function DiscussionClient({
  courseSlug,
  courseId,
  isEnrolled,
  isLoggedIn,
}: Props) {
  const [question, setQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/discuss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug, question }),
      });
      if (res.ok) {
        setSubmitted(true);
        setQuestion("");
      } else {
        const d = await res.json();
        setError(d.error || "Failed to post");
      }
    } catch {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Post a question */}
      {isLoggedIn && isEnrolled ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h2 className="text-base font-semibold text-white mb-3">Ask a Question</h2>
          {submitted && (
            <div className="mb-3 rounded-lg bg-green-500/10 border border-green-500/30 px-4 py-3 text-sm text-green-400">
              Question posted! 🎉 The instructor will respond soon.
            </div>
          )}
          {error && (
            <div className="mb-3 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex gap-3">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What would you like to ask?"
              rows={3}
              className="flex-1 rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none resize-none"
            />
            <button
              type="submit"
              disabled={submitting || !question.trim()}
              className="self-end flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-3 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              {submitting ? "Posting..." : "Post"}
            </button>
          </form>
        </div>
      ) : isLoggedIn ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 text-center">
          <Lock className="h-8 w-8 text-zinc-600 mx-auto mb-2" />
          <p className="text-zinc-400 text-sm mb-3">Enroll to join the discussion</p>
          <Link
            href={`/courses/${courseSlug}`}
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            View Course
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 text-center">
          <p className="text-zinc-400 text-sm mb-3">Sign in to join the discussion</p>
          <Link
            href={`/auth/signin?redirect=/c/${courseSlug}/discuss`}
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Sign In
          </Link>
        </div>
      )}

      {/* Discussion list */}
      <div>
        <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-purple-400" />
          Recent Discussions
        </h2>
        <div className="space-y-3">
          {PLACEHOLDER_DISCUSSIONS.map((d) => (
            <div
              key={d.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {d.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-white">{d.author}</span>
                    <span className="text-xs text-zinc-600">{d.time}</span>
                    {d.answered && (
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                        ✓ Answered
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-300">{d.question}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button className="text-xs text-zinc-500 hover:text-purple-400 transition-colors flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {d.replies} {d.replies === 1 ? "reply" : "replies"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
