import type { ApplicationStatus, ExperienceLevel, JobType } from "@/backend";

export function formatSalary(min?: bigint | null, max?: bigint | null): string {
  if (!min && !max) return "Salary not disclosed";
  const fmt = (n: bigint) => {
    const num = Number(n);
    if (num >= 100000) return `$${(num / 1000).toFixed(0)}k`;
    return `$${num.toLocaleString()}`;
  };
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  if (max) return `Up to ${fmt(max)}`;
  return "Salary not disclosed";
}

export function formatJobType(jt: JobType | string): string {
  const map: Record<string, string> = {
    fullTime: "Full Time",
    partTime: "Part Time",
    remote: "Remote",
    contract: "Contract",
  };
  return map[jt as string] ?? String(jt);
}

export function formatExperienceLevel(el: ExperienceLevel | string): string {
  const map: Record<string, string> = {
    entry: "Entry Level",
    mid: "Mid Level",
    senior: "Senior Level",
  };
  return map[el as string] ?? String(el);
}

export function formatApplicationStatus(
  st: ApplicationStatus | string,
): string {
  const map: Record<string, string> = {
    pending: "Pending",
    reviewed: "Reviewed",
    shortlisted: "Shortlisted",
    rejected: "Rejected",
  };
  return map[st as string] ?? String(st);
}

export function timeAgo(timestamp: bigint): string {
  const now = Date.now();
  const ts = Number(timestamp) / 1_000_000; // nanoseconds → ms
  const diff = Math.max(0, now - ts);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 4) return `${weeks}w ago`;
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export function jobTypeBadgeVariant(
  jt: JobType | string,
): "default" | "secondary" | "outline" | "destructive" {
  const map: Record<
    string,
    "default" | "secondary" | "outline" | "destructive"
  > = {
    remote: "secondary",
    fullTime: "default",
    partTime: "outline",
    contract: "outline",
  };
  return map[jt as string] ?? "outline";
}
