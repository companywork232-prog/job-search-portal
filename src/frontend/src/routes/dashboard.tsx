import { ProfileSkeleton } from "@/components/LoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useMyApplications,
  useMyProfile,
  useMySavedJobs,
  useUnsaveJob,
} from "@/hooks/useUser";
import {
  formatApplicationStatus,
  formatExperienceLevel,
  formatSalary,
  getInitials,
  timeAgo,
} from "@/utils/helpers";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, createRoute } from "@tanstack/react-router";
import {
  Bookmark,
  BookmarkX,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  Phone,
  Star,
  User,
  Wallet,
} from "lucide-react";
import { Route as rootRoute } from "./__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});

// ─── Status badge ────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  shortlisted: {
    bg: "bg-accent/10",
    text: "text-accent",
    border: "border-accent/30",
  },
  reviewed: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/30",
  },
  rejected: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/30",
  },
  pending: {
    bg: "bg-secondary/20",
    text: "text-foreground",
    border: "border-border",
  },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  return (
    <Badge
      variant="outline"
      className={`shrink-0 text-xs font-medium border ${s.bg} ${s.text} ${s.border}`}
    >
      {formatApplicationStatus(status)}
    </Badge>
  );
}

// ─── Company avatar ───────────────────────────────────────────────────────────

function CompanyAvatar({ name, logo }: { name: string; logo?: string | null }) {
  if (logo) {
    return (
      <img
        src={logo}
        alt={name}
        className="w-11 h-11 rounded-xl object-contain bg-muted border border-border shrink-0"
      />
    );
  }
  return (
    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-sm shrink-0">
      {getInitials(name)}
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  ocid,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  ocid: string;
}) {
  return (
    <Card className="bg-card border-border card-shadow" data-ocid={ocid}>
      <CardContent className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="font-display font-bold text-lg text-foreground leading-tight">
            {value}
          </p>
          <p className="text-xs text-muted-foreground truncate">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Application row skeleton ─────────────────────────────────────────────────

function AppRowSkeleton() {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-11 h-11 rounded-xl shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

const APP_SKELETON_KEYS = ["app-sk-1", "app-sk-2", "app-sk-3"];
const SAVED_SKELETON_KEYS = ["saved-sk-1", "saved-sk-2", "saved-sk-3"];

// ─── Profile completion ───────────────────────────────────────────────────────

function profileCompletion(profile: {
  name?: string;
  email?: string;
  phone?: string | null;
  location?: string | null;
  headline?: string | null;
  bio?: string | null;
  resumeUrl?: string | null;
  preferredIndustries?: string[];
}): number {
  const checks = [
    !!profile.name,
    !!profile.email,
    !!profile.phone,
    !!profile.location,
    !!profile.headline,
    !!profile.bio,
    !!profile.resumeUrl,
    (profile.preferredIndustries?.length ?? 0) > 0,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

// ─── My Profile tab ───────────────────────────────────────────────────────────

function ProfileTabContent() {
  const { data: profile, isLoading } = useMyProfile();

  if (isLoading) {
    return (
      <div
        className="p-6 bg-card border border-border rounded-xl"
        data-ocid="dashboard.profile_tab_loading"
      >
        <ProfileSkeleton />
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        className="text-center py-12"
        data-ocid="dashboard.profile_empty_state"
      >
        <User className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="font-display font-medium text-foreground mb-1">
          No profile yet
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Set up your profile to apply for jobs faster.
        </p>
        <Link to="/profile">
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-ocid="dashboard.create_profile_button"
          >
            Create Profile
          </Button>
        </Link>
      </div>
    );
  }

  const pct = profileCompletion(profile);

  return (
    <div className="space-y-5" data-ocid="dashboard.profile_tab">
      {/* Header card */}
      <Card className="bg-card border-border card-shadow">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-xl shrink-0">
              {getInitials(profile.name)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-foreground text-lg truncate">
                {profile.name}
              </h3>
              {profile.headline && (
                <p className="text-sm text-muted-foreground truncate mt-0.5">
                  {profile.headline}
                </p>
              )}
              {profile.location && (
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  {profile.location}
                </p>
              )}
            </div>
            <Link to="/profile">
              <Button
                variant="outline"
                size="sm"
                className="shrink-0"
                data-ocid="dashboard.edit_profile_button"
              >
                Edit Profile
              </Button>
            </Link>
          </div>

          {/* Completion bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted-foreground">
                Profile completion
              </span>
              <span
                className="text-xs font-semibold text-primary"
                data-ocid="dashboard.profile_completion"
              >
                {pct}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div
                className="bg-primary h-1.5 rounded-full transition-smooth"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact info */}
      <Card className="bg-card border-border card-shadow">
        <CardContent className="p-5 space-y-3">
          <h4 className="font-display font-semibold text-sm text-foreground uppercase tracking-wide">
            Contact Information
          </h4>
          <Separator />
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-foreground truncate">{profile.email}</span>
            </div>
            {profile.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-foreground">{profile.phone}</span>
              </div>
            )}
            {profile.location && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-foreground">{profile.location}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Career details */}
      <Card className="bg-card border-border card-shadow">
        <CardContent className="p-5 space-y-3">
          <h4 className="font-display font-semibold text-sm text-foreground uppercase tracking-wide">
            Career Details
          </h4>
          <Separator />
          <div className="grid sm:grid-cols-2 gap-4">
            {profile.experienceLevel && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Experience Level
                </p>
                <p className="text-sm font-medium text-foreground">
                  {formatExperienceLevel(profile.experienceLevel)}
                </p>
              </div>
            )}
            {(profile.desiredSalaryMin || profile.desiredSalaryMax) && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Desired Salary
                </p>
                <p className="text-sm font-medium text-foreground">
                  {formatSalary(
                    profile.desiredSalaryMin,
                    profile.desiredSalaryMax,
                  )}
                </p>
              </div>
            )}
          </div>
          {profile.preferredIndustries.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">
                Preferred Industries
              </p>
              <div className="flex flex-wrap gap-1.5">
                {profile.preferredIndustries.map((ind) => (
                  <Badge key={ind} variant="secondary" className="text-xs">
                    {ind}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bio */}
      {profile.bio && (
        <Card className="bg-card border-border card-shadow">
          <CardContent className="p-5 space-y-2">
            <h4 className="font-display font-semibold text-sm text-foreground uppercase tracking-wide">
              About
            </h4>
            <Separator />
            <p className="text-sm text-foreground leading-relaxed">
              {profile.bio}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Resume */}
      {profile.resumeUrl && (
        <Card className="bg-card border-border card-shadow">
          <CardContent className="p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {profile.resumeName ?? "My Resume"}
                </p>
                <p className="text-xs text-muted-foreground">Resume uploaded</p>
              </div>
            </div>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              data-ocid="dashboard.resume_link"
            >
              <Button variant="ghost" size="sm" className="gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" /> View
              </Button>
            </a>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

import type React from "react";

export default function DashboardPage() {
  const { isAuthenticated, login } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: savedJobs, isLoading: savedLoading } = useMySavedJobs();
  const { data: applications, isLoading: appsLoading } = useMyApplications();
  const unsave = useUnsaveJob();

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-background px-4"
        data-ocid="dashboard.unauthenticated_state"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <User className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-display font-bold text-2xl text-foreground mb-2">
          Sign in to continue
        </h2>
        <p className="text-muted-foreground text-sm mb-6 text-center max-w-sm">
          Track your applications, saved jobs, and profile all in one place.
        </p>
        <Button
          onClick={login}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          data-ocid="dashboard.login_button"
        >
          Sign In with Internet Identity
        </Button>
      </div>
    );
  }

  const pct = profile ? profileCompletion(profile) : 0;
  const appliedCount = applications?.length ?? 0;
  const savedCount = savedJobs?.length ?? 0;

  return (
    <div className="bg-background min-h-screen" data-ocid="dashboard.page">
      {/* Page header */}
      <div className="bg-card border-b border-border header-shadow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-0.5">
                Job Seeker
              </p>
              <h1 className="font-display font-bold text-2xl text-foreground">
                {profile
                  ? `Welcome back, ${profile.name.split(" ")[0]}!`
                  : "My Dashboard"}
              </h1>
            </div>
            <Link to="/profile">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 hidden sm:flex"
                data-ocid="dashboard.header_edit_profile_button"
              >
                <User className="w-3.5 h-3.5" /> Edit Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats row */}
        <div
          className="grid grid-cols-3 gap-3 sm:gap-4"
          data-ocid="dashboard.stats_row"
        >
          {appsLoading ? (
            ["s1", "s2", "s3"].map((k) => (
              <Card key={k} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-xl" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-5 w-8" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <StatCard
                icon={<Briefcase className="w-5 h-5" />}
                label="Total Applied"
                value={appliedCount}
                ocid="dashboard.stat_applied"
              />
              <StatCard
                icon={<Bookmark className="w-5 h-5" />}
                label="Total Saved"
                value={savedCount}
                ocid="dashboard.stat_saved"
              />
              <StatCard
                icon={
                  pct === 100 ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Star className="w-5 h-5" />
                  )
                }
                label="Profile"
                value={profileLoading ? "…" : `${pct}%`}
                ocid="dashboard.stat_profile"
              />
            </>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="applied" data-ocid="dashboard.tabs">
          {/* Mobile: scrollable tabs */}
          <TabsList className="w-full sm:w-auto flex">
            <TabsTrigger
              value="applied"
              className="flex-1 sm:flex-none gap-1.5"
              data-ocid="dashboard.applied_tab"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Applied</span>
              {appliedCount > 0 && (
                <span className="ml-1 bg-primary/15 text-primary rounded-full px-1.5 py-0.5 text-xs font-bold">
                  {appliedCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="saved"
              className="flex-1 sm:flex-none gap-1.5"
              data-ocid="dashboard.saved_tab"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="ml-1 bg-primary/15 text-primary rounded-full px-1.5 py-0.5 text-xs font-bold">
                  {savedCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="flex-1 sm:flex-none gap-1.5"
              data-ocid="dashboard.profile_tab_trigger"
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile</span>
            </TabsTrigger>
          </TabsList>

          {/* Applied Jobs */}
          <TabsContent value="applied" className="mt-4">
            {appsLoading ? (
              <div
                className="space-y-3"
                data-ocid="dashboard.applications_loading"
              >
                {APP_SKELETON_KEYS.map((k) => (
                  <AppRowSkeleton key={k} />
                ))}
              </div>
            ) : (applications ?? []).length === 0 ? (
              <div
                className="text-center py-14 bg-card rounded-xl border border-border"
                data-ocid="dashboard.applications_empty_state"
              >
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-7 h-7 text-muted-foreground" />
                </div>
                <p className="font-display font-semibold text-foreground mb-1">
                  No applications yet
                </p>
                <p className="text-sm text-muted-foreground mb-5 max-w-xs mx-auto">
                  Start applying to jobs and track your progress here.
                </p>
                <Link
                  to="/jobs"
                  search={{}}
                  data-ocid="dashboard.browse_jobs_link"
                >
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5">
                    Browse Jobs <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div
                className="space-y-3"
                data-ocid="dashboard.applications_list"
              >
                {(applications ?? []).map((app, i) => (
                  <Card
                    key={app.id.toString()}
                    className="bg-card border-border card-shadow hover:card-shadow-hover transition-smooth"
                    data-ocid={`dashboard.application.item.${i + 1}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <CompanyAvatar name={app.companyName} />
                        <div className="flex-1 min-w-0">
                          <Link
                            to="/jobs/$jobId"
                            params={{ jobId: app.jobId.toString() }}
                            className="font-display font-semibold text-foreground hover:text-primary transition-colors block truncate"
                          >
                            {app.jobTitle}
                          </Link>
                          <p className="text-sm text-muted-foreground truncate">
                            {app.companyName}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Applied {timeAgo(app.appliedAt)}
                          </p>
                        </div>
                        <StatusBadge
                          status={app.status}
                          data-ocid={`dashboard.application.status.${i + 1}`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Saved Jobs */}
          <TabsContent value="saved" className="mt-4">
            {savedLoading ? (
              <div className="space-y-3" data-ocid="dashboard.saved_loading">
                {SAVED_SKELETON_KEYS.map((k) => (
                  <AppRowSkeleton key={k} />
                ))}
              </div>
            ) : (savedJobs ?? []).length === 0 ? (
              <div
                className="text-center py-14 bg-card rounded-xl border border-border"
                data-ocid="dashboard.saved_empty_state"
              >
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                  <BookmarkX className="w-7 h-7 text-muted-foreground" />
                </div>
                <p className="font-display font-semibold text-foreground mb-1">
                  No saved jobs
                </p>
                <p className="text-sm text-muted-foreground mb-5 max-w-xs mx-auto">
                  Save jobs you're interested in to revisit later.
                </p>
                <Link
                  to="/jobs"
                  search={{}}
                  data-ocid="dashboard.browse_jobs_saved_link"
                >
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5">
                    Browse Jobs <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3" data-ocid="dashboard.saved_list">
                {(savedJobs ?? []).map((saved, i) => (
                  <Card
                    key={saved.jobId.toString()}
                    className="bg-card border-border card-shadow hover:card-shadow-hover transition-smooth"
                    data-ocid={`dashboard.saved.item.${i + 1}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <CompanyAvatar name={saved.companyName} />
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-semibold text-foreground truncate">
                            {saved.jobTitle}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {saved.companyName}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 shrink-0" />
                            {saved.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Link
                            to="/jobs/$jobId"
                            params={{ jobId: saved.jobId.toString() }}
                            data-ocid={`dashboard.saved.view.${i + 1}`}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 text-xs"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span className="hidden sm:inline">View Job</span>
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                            disabled={unsave.isPending}
                            onClick={() => unsave.mutate(saved.jobId)}
                            data-ocid={`dashboard.saved.remove.${i + 1}`}
                          >
                            <BookmarkX className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Remove</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* My Profile */}
          <TabsContent value="profile" className="mt-4">
            <ProfileTabContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
