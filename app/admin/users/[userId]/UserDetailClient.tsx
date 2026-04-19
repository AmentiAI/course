"use client";

import { useState, useTransition } from "react";
import {
  setUserRoleAction,
  manualEnrollAction,
  unenrollAction,
  resetProgressAction,
  grantCertificateAction,
  revokeCertificateAction,
} from "../actions";
import type { Role, PaymentStatus } from "@prisma/client";
import {
  Save,
  UserPlus,
  RotateCcw,
  Award,
  X,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

type Enrollment = {
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  progress: number;
  completedAt: string | null;
  enrolledAt: string;
  certified: boolean;
};

type Payment = {
  id: string;
  amount: number;
  currency: string;
  chain: string | null;
  status: PaymentStatus;
  createdAt: string;
  courseTitle: string | null;
};

export default function UserDetailClient({
  actorRole,
  user,
  enrollments,
  payments,
  availableCourses,
}: {
  actorRole: Role;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    role: Role;
    createdAt: string;
  };
  enrollments: Enrollment[];
  payments: Payment[];
  availableCourses: Array<{ id: string; title: string }>;
}) {
  const [pending, startTransition] = useTransition();
  const [role, setRole] = useState<Role>(user.role);
  const [courseToEnroll, setCourseToEnroll] = useState("");
  const canElevate = actorRole === "ADMIN";

  const saveRole = () => {
    startTransition(() => {
      setUserRoleAction(user.id, role).catch((e) => alert(e.message));
    });
  };

  const enrol = () => {
    if (!courseToEnroll) return;
    startTransition(() => {
      manualEnrollAction(user.id, courseToEnroll);
    });
    setCourseToEnroll("");
  };

  return (
    <div className="space-y-8">
      {/* Role */}
      <div className="rounded-lg border border-slate-200 bg-white p-7">
        <p className="academic-label mb-2">Academic Standing</p>
        <h2 className="font-serif text-xl font-bold text-[#0a2540] mb-5 tracking-tight">
          Role Assignment.
        </h2>
        <div className="flex flex-wrap items-end gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#98753f]">
              Role
            </span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-[#0a2540] focus:outline-none focus:border-[#b08d57]"
            >
              <option value="STUDENT">Student</option>
              <option value="INSTRUCTOR">Instructor</option>
              <option value="MODERATOR" disabled={!canElevate}>
                Moderator{!canElevate ? " (admin only)" : ""}
              </option>
              <option value="ADMIN" disabled={!canElevate}>
                Admin{!canElevate ? " (admin only)" : ""}
              </option>
            </select>
          </label>
          <button
            onClick={saveRole}
            disabled={pending || role === user.role}
            className="inline-flex items-center gap-2 rounded-md bg-[#0a2540] text-white px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#123258] disabled:opacity-60 transition-colors"
          >
            <Save className="h-3.5 w-3.5" strokeWidth={2} />
            {pending ? "Saving…" : "Update Role"}
          </button>
          <div className="text-xs text-slate-500 ml-auto">
            Joined {new Date(user.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Enrollments */}
      <div className="rounded-lg border border-slate-200 bg-white p-7">
        <p className="academic-label mb-2">Enrolment Register</p>
        <h2 className="font-serif text-xl font-bold text-[#0a2540] mb-5 tracking-tight">
          Programs &amp; Progress.
        </h2>

        <div className="space-y-2 mb-6">
          {enrollments.map((e) => (
            <div
              key={e.courseId}
              className="flex items-center gap-3 p-3 border border-slate-200 rounded-md"
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm text-[#0a2540] font-semibold truncate">
                  {e.courseTitle}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex-1 max-w-[200px] h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-[#14532d]"
                      style={{ width: `${e.progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold tabular-nums">
                    {e.progress}%
                  </span>
                  {e.certified && (
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm border bg-[#f5ecd7] text-[#98753f] border-[#e7d7b0]">
                      Certified
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button
                  title="Reset progress"
                  onClick={() => {
                    if (!confirm(`Reset progress for "${e.courseTitle}"?`)) return;
                    startTransition(() =>
                      resetProgressAction(user.id, e.courseId),
                    );
                  }}
                  disabled={pending}
                  className="p-1.5 text-slate-400 hover:text-[#0a2540] hover:bg-[#fafaf9] rounded-md"
                >
                  <RotateCcw className="h-4 w-4" strokeWidth={1.75} />
                </button>
                {e.certified ? (
                  <button
                    title="Revoke certificate (admin only)"
                    disabled={pending || !canElevate}
                    onClick={() => {
                      if (!confirm(`Revoke certificate for "${e.courseTitle}"?`))
                        return;
                      startTransition(() =>
                        revokeCertificateAction(user.id, e.courseId),
                      );
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-[#fafaf9] rounded-md disabled:opacity-30"
                  >
                    <X className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                ) : (
                  <button
                    title="Grant certificate"
                    onClick={() => {
                      if (!confirm(`Grant certificate for "${e.courseTitle}"?`))
                        return;
                      startTransition(() =>
                        grantCertificateAction(user.id, e.courseId),
                      );
                    }}
                    disabled={pending}
                    className="p-1.5 text-slate-400 hover:text-[#98753f] hover:bg-[#fafaf9] rounded-md"
                  >
                    <Award className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                )}
                <button
                  title="Unenrol"
                  onClick={() => {
                    if (!confirm(`Unenrol from "${e.courseTitle}"?`)) return;
                    startTransition(() =>
                      unenrollAction(user.id, e.courseId),
                    );
                  }}
                  disabled={pending}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-[#fafaf9] rounded-md"
                >
                  <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          ))}
          {enrollments.length === 0 && (
            <p className="text-center text-slate-500 text-sm italic py-4">
              No enrolments on record.
            </p>
          )}
        </div>

        <div className="flex gap-2 pt-4 border-t border-slate-200">
          <select
            value={courseToEnroll}
            onChange={(e) => setCourseToEnroll(e.target.value)}
            className="flex-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-[#0a2540] focus:outline-none focus:border-[#b08d57]"
          >
            <option value="">— Select program —</option>
            {availableCourses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
          <button
            onClick={enrol}
            disabled={pending || !courseToEnroll}
            className="inline-flex items-center gap-2 rounded-md bg-[#0a2540] text-white px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#123258] disabled:opacity-60 whitespace-nowrap transition-colors"
          >
            <UserPlus className="h-3.5 w-3.5" strokeWidth={2} />
            Manual Enrol
          </button>
        </div>
      </div>

      {/* Payments */}
      <div className="rounded-lg border border-slate-200 bg-white p-7">
        <p className="academic-label mb-2">Bursar&apos;s Ledger</p>
        <h2 className="font-serif text-xl font-bold text-[#0a2540] mb-5 tracking-tight">
          Payment History.
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                {["Program", "Amount", "Method", "Status", "Date"].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[10px] text-[#98753f] uppercase tracking-[0.18em] font-bold pb-3 pr-4"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="py-3 pr-4 text-slate-700 text-xs truncate max-w-[200px]">
                    {p.courseTitle ?? "—"}
                  </td>
                  <td className="py-3 pr-4 font-serif text-[#14532d] font-bold">
                    {p.currency === "USD"
                      ? `$${(p.amount / 100).toFixed(2)}`
                      : `${p.amount} ${p.currency}`}
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-[10px] bg-[#fafaf9] border border-slate-200 px-2 py-0.5 rounded-sm text-slate-600 font-bold uppercase tracking-[0.15em]">
                      {p.chain || p.currency}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <StatusPill status={p.status} />
                  </td>
                  <td className="py-3 text-xs text-slate-500 font-medium">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-slate-500 text-sm italic"
                  >
                    No payments on record.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: PaymentStatus }) {
  const cls =
    status === "CONFIRMED"
      ? "bg-[#dcfce7] text-[#14532d] border-[#bbf7d0]"
      : status === "PENDING"
      ? "bg-[#f5ecd7] text-[#98753f] border-[#e7d7b0]"
      : "bg-rose-50 text-rose-700 border-rose-200";
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-[0.15em] border ${cls}`}
    >
      {status === "CONFIRMED" ? (
        <CheckCircle className="h-3 w-3" />
      ) : status === "PENDING" ? (
        <Clock className="h-3 w-3" />
      ) : (
        <XCircle className="h-3 w-3" />
      )}
      {status}
    </span>
  );
}
