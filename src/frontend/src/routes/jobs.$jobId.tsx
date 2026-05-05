import { Breadcrumb } from "@/components/Breadcrumb";
import { JobCard } from "@/components/JobCard";
import { JobDetailSkeleton } from "@/components/LoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useJobById, useSimilarJobs } from "@/hooks/useJobs";
import {
  useApplyToJob,
  useHasApplied,
  useIsJobSaved,
  useSaveJob,
  useUnsaveJob,
} from "@/hooks/useUser";
import {
  formatExperienceLevel,
  formatJobType,
  formatSalary,
  getInitials,
  jobTypeBadgeVariant,
  timeAgo,
} from "@/utils/helpers";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, createRoute } from "@tanstack/react-router";
import {
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  Copy,
  DollarSign,
  GraduationCap,
  MapPin,
  Share2,
  Tag,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Route as rootRoute } from "./__root";

function CompanyLogo({ logo, name }: { logo?: string; name: string }) {
  if (logo)
    return (
      <img
        src={logo}
        alt={name}
        className="w-16 h-16 rounded-xl object-cover border border-border"
      />
    );
  const initials = getInitials(name);
  const colors = [
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
    "bg-green-100 text-green-700",
    "bg-orange-100 text-orange-700",
    "bg-rose-100 text-rose-700",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      className={`w-16 h-16 rounded-xl flex items-center justify-center font-display font-bold text-lg ${color}`}
    >
      {initials}
    </div>
  );
}

function CompanyLogoSmall({ logo, name }: { logo?: string; name: string }) {
  if (logo)
    return (
      <img
        src={logo}
        alt={name}
        className="w-12 h-12 rounded-lg object-cover border border-border"
      />
    );
  const initials = getInitials(name);
  const colors = [
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
    "bg-green-100 text-green-700",
    "bg-orange-100 text-orange-700",
    "bg-rose-100 text-rose-700",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      className={`w-12 h-12 rounded-lg flex items-center justify-center font-display font-bold text-sm ${color}`}
    >
      {initials}
    </div>
  );
}

function RichContent({ text }: { text: string }) {
  const lines = text.split("\n").filter(Boolean);
  const isBulleted = lines.some(
    (l) =>
      l.trim().startsWith("•") ||
      l.trim().startsWith("-") ||
      l.trim().startsWith("*"),
  );

  if (isBulleted) {
    return (
      <ul className="space-y-2">
        {lines.map((line, idx) => {
          const clean = line.replace(/^[\s•\-*]+/, "").trim();
          if (!clean) return null;
          const stableKey = `bullet-${idx}-${clean.slice(0, 12).replace(/\s+/g, "-")}`;
          return (
            <li
              key={stableKey}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="leading-relaxed">{clean}</span>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
      {text}
    </p>
  );
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jobs/$jobId",
  component: JobDetailPage,
});

export default function JobDetailPage() {
  const { jobId } = Route.useParams();
  const jobIdBig = BigInt(jobId);
  const [copied, setCopied] = useState(false);

  const { data: job, isLoading } = useJobById(jobIdBig);
  const { data: similarJobs } = useSimilarJobs(jobIdBig, 4);
  const { isAuthenticated, login } = useInternetIdentity();
  const { data: hasApplied } = useHasApplied(
    isAuthenticated ? jobIdBig : undefined,
  );
  const { data: isSaved } = useIsJobSaved(
    isAuthenticated ? jobIdBig : undefined,
  );
  const applyMutation = useApplyToJob();
  const saveJob = useSaveJob();
  const unsaveJob = useUnsaveJob();

  const handleApply = () => {
    if (!isAuthenticated) {
      login();
      return;
    }
    applyMutation.mutate(jobIdBig, {
      onSuccess: () =>
        toast.success("Application submitted!", {
          description: "We'll notify you of any updates.",
        }),
      onError: (e) => toast.error(e.message),
    });
  };

  const handleSaveToggle = () => {
    if (!isAuthenticated) {
      login();
      return;
    }
    if (isSaved) {
      unsaveJob.mutate(jobIdBig, {
        onSuccess: () => toast.success("Job removed from saved."),
      });
    } else {
      saveJob.mutate(jobIdBig, {
        onSuccess: () => toast.success("Job saved!"),
      });
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  if (isLoading)
    return (
      <div
        className="bg-background min-h-screen"
        data-ocid="job_detail.loading_state"
      >
        <div className="bg-card border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
            <div className="h-5 w-48 bg-muted rounded animate-pulse" />
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <JobDetailSkeleton />
        </div>
      </div>
    );

  if (!job)
    return (
      <div
        className="max-w-5xl mx-auto px-4 py-24 text-center"
        data-ocid="job_detail.not_found"
      >
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="font-display font-bold text-2xl text-foreground mb-3">
          Job not found
        </h2>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
          This job may have been removed or the listing has expired.
        </p>
        <Link to="/jobs" search={{}}>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Browse All Jobs
          </Button>
        </Link>
      </div>
    );

  const hasTabs =
    Boolean(job.description) ||
    Boolean(job.responsibilities) ||
    Boolean(job.qualifications);

  return (
    <div className="bg-background min-h-screen" data-ocid="job_detail.page">
      {/* Sub-header breadcrumb bar */}
      <div className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <Breadcrumb
            items={[
              { label: "Browse Jobs", to: "/jobs" },
              { label: job.title },
            ]}
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left / Main column ────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Job header card */}
            <Card
              className="bg-card border-border"
              data-ocid="job_detail.header_card"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <CompanyLogo logo={job.companyLogo} name={job.companyName} />
                  <div className="flex-1 min-w-0">
                    <h1 className="font-display font-bold text-xl sm:text-2xl text-foreground leading-tight">
                      {job.title}
                    </h1>
                    <p className="text-muted-foreground mt-1 font-medium">
                      {job.companyName}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant={jobTypeBadgeVariant(job.jobType)}>
                        {formatJobType(job.jobType)}
                      </Badge>
                      <Badge variant="outline">
                        {formatExperienceLevel(job.experienceLevel)}
                      </Badge>
                      {job.isFeatured && (
                        <Badge className="bg-accent/10 text-accent border-accent/20">
                          ⭐ Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Meta row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <DollarSign className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate">
                      {formatSalary(job.salaryMin, job.salaryMax)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Building2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate">{job.industry}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate">
                      Posted {timeAgo(job.postedAt)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs: Overview / Responsibilities / Qualifications */}
            {hasTabs && (
              <Card
                className="bg-card border-border"
                data-ocid="job_detail.content_card"
              >
                <CardContent className="p-6">
                  <Tabs
                    defaultValue="overview"
                    data-ocid="job_detail.content_tabs"
                  >
                    <TabsList className="mb-5 bg-muted/60">
                      {job.description && (
                        <TabsTrigger
                          value="overview"
                          data-ocid="job_detail.overview_tab"
                        >
                          Overview
                        </TabsTrigger>
                      )}
                      {job.responsibilities && (
                        <TabsTrigger
                          value="responsibilities"
                          data-ocid="job_detail.responsibilities_tab"
                        >
                          Responsibilities
                        </TabsTrigger>
                      )}
                      {job.qualifications && (
                        <TabsTrigger
                          value="qualifications"
                          data-ocid="job_detail.qualifications_tab"
                        >
                          Qualifications
                        </TabsTrigger>
                      )}
                    </TabsList>

                    {job.description && (
                      <TabsContent value="overview" className="mt-0">
                        <RichContent text={job.description} />
                      </TabsContent>
                    )}

                    {job.responsibilities && (
                      <TabsContent value="responsibilities" className="mt-0">
                        <RichContent text={job.responsibilities} />
                      </TabsContent>
                    )}

                    {job.qualifications && (
                      <TabsContent value="qualifications" className="mt-0">
                        <RichContent text={job.qualifications} />
                      </TabsContent>
                    )}
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {/* Skills & Tags */}
            {job.tags.length > 0 && (
              <Card
                className="bg-card border-border"
                data-ocid="job_detail.tags_card"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-primary" />
                    <h2 className="font-display font-semibold text-base text-foreground">
                      Skills & Technologies
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* ── Right sidebar ────────────────────────────────── */}
          <div className="space-y-4">
            {/* Primary action card */}
            <Card
              className="bg-card border-border sticky top-20"
              data-ocid="job_detail.apply_card"
            >
              <CardContent className="p-5">
                {/* Salary prominent display */}
                <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Salary Range</span>
                  </div>
                  <p className="font-display font-bold text-xl text-primary">
                    {formatSalary(job.salaryMin, job.salaryMax)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    per year
                  </p>
                </div>

                {/* Apply / Applied state */}
                {hasApplied ? (
                  <div
                    className="flex items-center justify-center gap-2 py-3 bg-accent/10 border border-accent/20 rounded-xl mb-3"
                    data-ocid="job_detail.applied_state"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-display font-semibold text-accent text-sm">
                        Application Sent!
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Under review
                      </p>
                    </div>
                  </div>
                ) : (
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mb-3 h-11"
                    onClick={handleApply}
                    disabled={applyMutation.isPending}
                    data-ocid="job_detail.apply_button"
                  >
                    {applyMutation.isPending
                      ? "Submitting…"
                      : isAuthenticated
                        ? "Apply Now"
                        : "Sign In to Apply"}
                  </Button>
                )}

                {/* Save + Share buttons row */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleSaveToggle}
                    disabled={saveJob.isPending || unsaveJob.isPending}
                    data-ocid="job_detail.save_button"
                  >
                    {isSaved ? (
                      <>
                        <BookmarkCheck className="w-4 h-4 mr-1.5 text-primary" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4 mr-1.5" />
                        Save
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleShare}
                    aria-label="Share job link"
                    data-ocid="job_detail.share_button"
                    className="shrink-0"
                  >
                    {copied ? (
                      <Copy className="w-4 h-4 text-accent" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Job Overview card */}
            <Card
              className="bg-card border-border"
              data-ocid="job_detail.overview_card"
            >
              <CardContent className="p-5">
                <h3 className="font-display font-semibold text-sm text-foreground mb-4 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Job Overview
                </h3>
                <div className="space-y-3 text-sm">
                  {(
                    [
                      {
                        icon: <Briefcase className="w-4 h-4" />,
                        label: "Job Type",
                        value: formatJobType(job.jobType),
                      },
                      {
                        icon: <GraduationCap className="w-4 h-4" />,
                        label: "Experience",
                        value: formatExperienceLevel(job.experienceLevel),
                      },
                      {
                        icon: <MapPin className="w-4 h-4" />,
                        label: "Location",
                        value: job.location,
                      },
                      {
                        icon: <Building2 className="w-4 h-4" />,
                        label: "Industry",
                        value: job.industry,
                      },
                      {
                        icon: <Clock className="w-4 h-4" />,
                        label: "Posted",
                        value: timeAgo(job.postedAt),
                      },
                    ] as const
                  ).map(({ icon, label, value }) => (
                    <div key={label} className="flex items-start gap-2.5">
                      <span className="text-primary mt-0.5 shrink-0">
                        {icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="font-medium text-foreground truncate">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Company info card */}
            <Card
              className="bg-card border-border"
              data-ocid="job_detail.company_card"
            >
              <CardContent className="p-5">
                <h3 className="font-display font-semibold text-sm text-foreground mb-4 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-primary" />
                  About the Company
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <CompanyLogoSmall
                    logo={job.companyLogo}
                    name={job.companyName}
                  />
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-foreground text-sm truncate">
                      {job.companyName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {job.industry}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Explore open positions and learn more about working at{" "}
                  {job.companyName}.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ── Similar jobs section ─────────────────────────── */}
        {similarJobs && similarJobs.length > 0 && (
          <div className="mt-10" data-ocid="job_detail.similar_jobs_section">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-xl text-foreground">
                Similar Jobs
              </h2>
              <Link
                to="/jobs"
                search={{}}
                className="text-sm text-primary hover:underline font-medium"
                data-ocid="job_detail.browse_more_link"
              >
                Browse more →
              </Link>
            </div>

            {/* Mobile: horizontal scroll; desktop: grid */}
            <div
              className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible"
              data-ocid="job_detail.similar_jobs_list"
            >
              {similarJobs.map((j, i) => (
                <div
                  key={j.id.toString()}
                  className="shrink-0 w-72 sm:w-auto"
                  data-ocid={`job_detail.similar_job.${i + 1}`}
                >
                  <JobCard job={j} index={i + 1} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
