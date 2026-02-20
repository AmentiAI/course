"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Send, MessageSquare, Lock } from "lucide-react";

interface Props {
  courseSlug: string;
  courseId: string;
  isEnrolled: boolean;
  isLoggedIn: boolean;
}

interface DiscussionMessage {
  id: string;
  message: string;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

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
  const [messages, setMessages] = useState<DiscussionMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch messages on mount
  useEffect(() => {
    fetchMessages();
  }, [courseSlug]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/discuss?courseSlug=${courseSlug}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

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
        // Refresh messages
        await fetchMessages();
        setTimeout(() => setSubmitted(false), 3000);
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

  const getInitials = (name: string | null) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Post a question */}
      {isLoggedIn && isEnrolled ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h2 className="text-base font-semibold text-white mb-3">Ask a Question</h2>
          {submitted && (
            <div className="mb-3 rounded-lg bg-green-500/10 border border-green-500/30 px-4 py-3 text-sm text-green-400">
              Question posted! 🎉
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

        {loading ? (
          <div className="text-center py-8 text-zinc-500">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
            <MessageSquare className="h-12 w-12 text-zinc-700 mx-auto mb-3" />
            <p className="text-zinc-400 text-sm">
              No messages yet. Be the first to start the conversation!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
              >
                <div className="flex items-start gap-3">
                  {msg.user.image ? (
                    <img
                      src={msg.user.image}
                      alt=""
                      className="h-8 w-8 rounded-full shrink-0"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {getInitials(msg.user.name)}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">
                        {msg.user.name || "Anonymous"}
                      </span>
                      <span className="text-xs text-zinc-600">
                        {formatTimeAgo(msg.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-300 whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
