import type {
  ApplicationStatus,
  Application as BackendApplication,
  Job as BackendJob,
  JobCategory as BackendJobCategory,
  JobSeeker as BackendJobSeeker,
  SavedJob as BackendSavedJob,
  SearchFilter as BackendSearchFilter,
  ExperienceLevel,
  JobStatus,
  JobType,
  PageResult,
  Pagination,
  SortBy,
  UpdateJobSeekerInput,
  WorkExperience,
} from "@/backend";

// Re-export backend types for convenience
export type {
  Job,
  JobCategory,
  JobSeeker,
  Application,
  SavedJob,
  SearchFilter,
  ApplicationStatus,
  ExperienceLevel,
  JobStatus,
  JobType,
  SortBy,
  Pagination,
  PageResult,
  WorkExperience,
  UpdateJobSeekerInput,
} from "@/backend";

// Frontend-friendly filter type (strings instead of variants)
export interface JobFilter {
  keyword?: string;
  location?: string;
  category?: string;
  jobType?: string;
  experienceLevel?: string;
  salaryMin?: number;
  salaryMax?: number;
  sortBy?: string;
  industries?: string[];
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export type JobTypeLabel = "Full Time" | "Part Time" | "Remote" | "Contract";
export type ExperienceLevelLabel = "Entry Level" | "Mid Level" | "Senior Level";
export type ApplicationStatusLabel =
  | "Pending"
  | "Reviewed"
  | "Shortlisted"
  | "Rejected";

// Helper: convert frontend filter to backend SearchFilter
export function toBackendFilter(filter: JobFilter): BackendSearchFilter {
  const f: BackendSearchFilter = {
    industries: filter.industries ?? [],
  };
  if (filter.keyword) f.keyword = filter.keyword;
  if (filter.location) f.location = filter.location;
  if (filter.jobType) f.jobType = jobTypeToBackend(filter.jobType);
  if (filter.experienceLevel)
    f.experienceLevel = experienceLevelToBackend(filter.experienceLevel);
  if (filter.salaryMin !== undefined) f.salaryMin = BigInt(filter.salaryMin);
  if (filter.salaryMax !== undefined) f.salaryMax = BigInt(filter.salaryMax);
  if (filter.sortBy) f.sortBy = sortByToBackend(filter.sortBy);
  return f;
}

function jobTypeToBackend(s: string): JobType | undefined {
  const map: Record<string, JobType> = {
    fullTime: "fullTime" as unknown as JobType,
    partTime: "partTime" as unknown as JobType,
    remote: "remote" as unknown as JobType,
    contract: "contract" as unknown as JobType,
  };
  return map[s];
}

function experienceLevelToBackend(s: string): ExperienceLevel | undefined {
  const map: Record<string, ExperienceLevel> = {
    entry: "entry" as unknown as ExperienceLevel,
    mid: "mid" as unknown as ExperienceLevel,
    senior: "senior" as unknown as ExperienceLevel,
  };
  return map[s];
}

function sortByToBackend(s: string): SortBy | undefined {
  const map: Record<string, SortBy> = {
    newest: "newest" as unknown as SortBy,
    salaryHigh: "salaryHigh" as unknown as SortBy,
    salaryLow: "salaryLow" as unknown as SortBy,
  };
  return map[s];
}

export type {
  BackendJob,
  BackendJobCategory,
  BackendJobSeeker,
  BackendApplication,
  BackendSavedJob,
  BackendSearchFilter,
};
