// filepath: src/app/(admin)/admin/inbox/page.tsx
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { markAsRead, deleteMessage } from "./actions";

export default async function InboxPage() {
  const messages = await db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt));

  const unread = messages.filter((m) => !m.isRead).length;

  return (
    <div className="max-w-4xl">
      <div className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold tracking-wide uppercase">Inbox</h1>
        <p className="font-mono text-gray-400 text-sm mt-1">
          {"//"} {messages.length} MESSAGES · {unread} UNREAD
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="py-24 text-center border border-gray-800 border-dashed brutalist-box">
          <span className="font-mono text-gray-500 text-sm animate-pulse">
            {">"} INBOX_EMPTY...
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`brutalist-box p-6 ${!msg.isRead ? "border-l-2 border-l-accent" : "opacity-70"}`}
            >
              {/* Header row */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    {!msg.isRead && (
                      <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                    )}
                    <p className="font-bold text-sm">{msg.name}</p>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 border ${
                        msg.type === "enterprise"
                          ? "border-gray-600 text-gray-400"
                          : "border-accent/50 text-accent"
                      }`}
                    >
                      {msg.type.toUpperCase()}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-gray-400">{msg.email}</p>
                  {msg.phone && (
                    <p className="font-mono text-xs text-gray-500">{msg.phone}</p>
                  )}
                </div>
                <p className="font-mono text-[10px] text-gray-600">
                  {new Date(msg.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              {/* Message body */}
              <p className="font-sans text-sm text-gray-300 leading-relaxed border-l border-gray-700 pl-4 mb-4">
                {msg.message}
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                {!msg.isRead && (
                  <form action={markAsRead}>
                    <input type="hidden" name="id" value={msg.id} />
                    <button
                      type="submit"
                      className="font-mono text-[10px] border border-gray-700 px-3 py-1.5 hover:border-accent hover:text-accent transition-colors"
                    >
                      MARK_READ
                    </button>
                  </form>
                )}
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={msg.id} />
                  <button
                    type="submit"
                    className="font-mono text-[10px] border border-gray-700 px-3 py-1.5 hover:border-red-600 hover:text-red-500 transition-colors"
                  >
                    DELETE
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
