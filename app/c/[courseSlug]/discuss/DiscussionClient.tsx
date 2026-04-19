"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Send, MessageSquare, Lock, CheckCircle2 } from "lucide-react";

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
    <div className="space-y-8">
      {isLoggedIn && isEnrolled ? (
        <div className="rounded-lg border border-slate-200 bg-white p-7">
          <p className="academic-label mb-2">Submit a Question</p>
          <h2 className="font-serif text-xl font-bold text-[#0a2540] mb-5 tracking-tight">
            Pose a question to the seminar.
          </h2>
          {submitted && (
            <div className="mb-4 rounded-md bg-[#dcfce7] border border-[#bbf7d0] px-4 py-3 text-sm text-[#14532d] font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Question recorded.
            </div>
          )}
          {error && (
            <div className="mb-4 rounded-md bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex gap-3">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What would you like to ask?"
              rows={3}
              className="flex-1 rounded-md bg-white border border-slate-200 px-4 py-3 text-sm text-[#0a2540] placeholder:text-slate-400 focus:border-[#0a2540] focus:ring-2 focus:ring-[#0a2540]/15 focus:outline-none resize-none transition-colors"
            />
            <button
              type="submit"
              disabled={submitting || !question.trim()}
              className="self-end flex items-center gap-2 bg-[#0a2540] hover:bg-[#123258] text-white px-5 py-3 rounded-md text-sm font-semibold tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
              {submitting ? "Submitting…" : "Submit"}
            </button>
          </form>
        </div>
      ) : isLoggedIn ? (
        <div className="rounded-lg border border-slate-200 bg-white p-9 text-center">
          <div className="inline-flex w-12 h-12 rounded-md bg-[#f5ecd7] border border-[#e7d7b0] items-center justify-center mb-4">
            <Lock className="h-5 w-5 text-[#98753f]" strokeWidth={1.75} />
          </div>
          <p className="font-serif text-lg font-bold text-[#0a2540] mb-2 tracking-tight">
            Enrollment Required.
          </p>
          <p className="text-slate-600 text-sm mb-5 max-w-md mx-auto leading-relaxed">
            Participation in the seminar discussion is reserved for enrolled students.
          </p>
          <Link
            href={`/courses/${courseSlug}`}
            className="inline-flex items-center gap-2 bg-[#0a2540] hover:bg-[#123258] text-white px-5 py-2.5 rounded-md text-sm font-semibold tracking-wide transition-colors"
          >
            View Program
          </Link>
        </div>
      ) : (
        <div className="rounded-lg border border-slate-200 bg-white p-9 text-center">
          <p className="font-serif text-lg font-bold text-[#0a2540] mb-2 tracking-tight">
            Student Sign-In Required.
          </p>
          <p className="text-slate-600 text-sm mb-5">
            Sign in to your student account to join the seminar discussion.
          </p>
          <Link
            href={`/auth/signin?redirect=/c/${courseSlug}/discuss`}
            className="inline-flex items-center gap-2 bg-[#0a2540] hover:bg-[#123258] text-white px-5 py-2.5 rounded-md text-sm font-semibold tracking-wide transition-colors"
          >
            Sign In to Portal
          </Link>
        </div>
      )}

      <div>
        <p className="academic-label mb-2">Seminar Transcript</p>
        <h2 className="font-serif text-xl font-bold text-[#0a2540] mb-6 flex items-center gap-2 tracking-tight">
          <MessageSquare className="h-5 w-5 text-[#98753f]" strokeWidth={1.75} />
          Recent Questions.
        </h2>

        {loading ? (
          <div className="text-center py-10 text-slate-500 text-sm italic">
            Loading transcript…
          </div>
        ) : messages.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-10 text-center">
            <div className="inline-flex w-12 h-12 rounded-md bg-[#f5ecd7] border border-[#e7d7b0] items-center justify-center mb-3">
              <MessageSquare className="h-5 w-5 text-[#98753f]" strokeWidth={1.75} />
            </div>
            <p className="text-slate-600 text-sm italic">
              No questions recorded. Be the first to open the discussion.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="rounded-lg border border-slate-200 bg-white p-5"
              >
                <div className="flex items-start gap-3">
                  {msg.user.image ? (
                    <img
                      src={msg.user.image}
                      alt=""
                      className="h-9 w-9 rounded-full shrink-0 border border-slate-200"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-[#0a2540] border border-[#b08d57] flex items-center justify-center text-xs font-bold text-white shrink-0 tracking-wider">
                      {getInitials(msg.user.name)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm font-semibold text-[#0a2540] font-serif">
                        {msg.user.name || "Anonymous"}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        &middot; {formatTimeAgo(msg.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
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
