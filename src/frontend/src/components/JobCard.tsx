import type { Job } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
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
import { Link } from "@tanstack/react-router";
import {
  Bookmark,
  BookmarkCheck,
  Clock,
  DollarSign,
  MapPin,
} from "lucide-react";

interface JobCardProps {
  job: Job;
  index?: number;
  showApplyButton?: boolean;
}

function CompanyAvatar({ logo, name }: { logo?: string; name: string }) {
  if (logo) {
    return (
      <img
        src={logo}
        alt={name}
        className="w-12 h-12 rounded-xl object-cover border border-border"
      />
    );
  }
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
      className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-sm ${color}`}
    >
      {initials}
    </div>
  );
}

function SaveButton({ jobId, index }: { jobId: bigint; index: number }) {
  const { isAuthenticated } = useInternetIdentity();
  const { data: isSaved } = useIsJobSaved(isAuthenticated ? jobId : undefined);
  const saveJob = useSaveJob();
  const unsaveJob = useUnsaveJob();

  if (!isAuthenticated) return null;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      unsaveJob.mutate(jobId);
    } else {
      saveJob.mutate(jobId);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="p-1.5 rounded-lg hover:bg-muted transition-colors"
      aria-label={isSaved ? "Unsave job" : "Save job"}
      data-ocid={`job.save_button.${index}`}
    >
      {isSaved ? (
        <BookmarkCheck className="w-4 h-4 text-primary" />
      ) : (
        <Bookmark className="w-4 h-4 text-muted-foreground" />
      )}
    </button>
  );
}

export function JobCard({
  job,
  index = 1,
  showApplyButton = true,
}: JobCardProps) {
  const { isAuthenticated } = useInternetIdentity();
  const { data: hasApplied } = useHasApplied(
    isAuthenticated ? job.id : undefined,
  );

  return (
    <Card
      className="group hover:shadow-md transition-all duration-200 border-border hover:border-primary/30 bg-card"
      data-ocid={`job.item.${index}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <CompanyAvatar logo={job.companyLogo} name={job.companyName} />
            <div className="flex-1 min-w-0">
              <Link
                to="/jobs/$jobId"
                params={{ jobId: job.id.toString() }}
                className="block"
              >
                <h3 className="font-display font-semibold text-foreground text-sm sm:text-base leading-tight truncate group-hover:text-primary transition-colors">
                  {job.title}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground mt-0.5 truncate">
                {job.companyName}
              </p>
            </div>
          </div>
          <SaveButton jobId={job.id} index={index} />
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-3">
          <Badge variant={jobTypeBadgeVariant(job.jobType)} className="text-xs">
            {formatJobType(job.jobType)}
          </Badge>
          <Badge
            variant="outline"
            className="text-xs text-muted-foreground border-border"
          >
            {formatExperienceLevel(job.experienceLevel)}
          </Badge>
          {job.isFeatured && (
            <Badge className="text-xs bg-accent/10 text-accent border-accent/20">
              Featured
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            {job.location}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <DollarSign className="w-3 h-3" />
            {formatSalary(job.salaryMin, job.salaryMax)}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {timeAgo(job.postedAt)}
          </span>
        </div>

        {showApplyButton && (
          <div className="mt-4">
            {hasApplied ? (
              <span
                className="inline-flex items-center text-xs font-medium text-accent bg-accent/10 px-3 py-1.5 rounded-lg"
                data-ocid={`job.applied_badge.${index}`}
              >
                ✓ Applied
              </span>
            ) : (
              <Link to="/jobs/$jobId" params={{ jobId: job.id.toString() }}>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold rounded-lg"
                  data-ocid={`job.apply_button.${index}`}
                >
                  Apply Now
                </Button>
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
