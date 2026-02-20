"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DiscussionChat({
  courseSlug,
  userId,
}: {
  courseSlug: string;
  userId: string;
}) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const handleSend = async () => {
    if (!message.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch("/api/discussion/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug, message: message.trim() }),
      });

      if (res.ok) {
        setMessage("");
        router.refresh();
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      alert("Error sending message");
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-zinc-800 p-4 bg-zinc-900/80">
      <div className="flex gap-3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Shift+Enter for new line)"
          rows={3}
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
          disabled={sending}
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() || sending}
          className="h-12 px-6 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-medium transition-colors flex items-center gap-2 shrink-0"
        >
          <Send className="h-4 w-4" />
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
      <p className="text-xs text-zinc-500 mt-2">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
}
