"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface Props {
  courseId: string;
  onSubmit?: () => void;
}

export default function ReviewForm({ courseId, onSubmit }: Props) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      setError("Please select a rating");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, rating, comment }),
      });
      if (res.ok) {
        setSubmitted(true);
        onSubmit?.();
      } else {
        const d = await res.json();
        setError(d.error || "Failed to submit review");
      }
    } catch {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-5 text-center">
        <p className="text-green-400 font-medium">Thanks for your review! 🎉</p>
        <p className="text-xs text-zinc-500 mt-1">Your review has been submitted</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <h3 className="font-semibold text-white mb-4">Leave a Review</h3>

      {error && (
        <div className="mb-3 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star rating */}
        <div>
          <label className="block text-sm text-zinc-400 mb-2">Your rating *</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRating(s)}
                onMouseEnter={() => setHover(s)}
                onMouseLeave={() => setHover(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`h-7 w-7 transition-colors ${
                    s <= (hover || rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-zinc-700 text-zinc-700"
                  }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm text-amber-400 font-medium">
                {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
              </span>
            )}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Your review (optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share what you learned and how it helped you..."
            rows={4}
            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting || !rating}
          className="w-full rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-3 text-sm font-semibold text-white transition-all disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
