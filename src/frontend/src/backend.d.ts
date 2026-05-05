import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface Application {
    id: bigint;
    status: ApplicationStatus;
    appliedAt: Timestamp;
    jobId: bigint;
    jobTitle: string;
    companyName: string;
    seekerPrincipal: Principal;
}
export interface SearchFilter {
    experienceLevel?: ExperienceLevel;
    sortBy?: SortBy;
    jobType?: JobType;
    salaryMax?: bigint;
    salaryMin?: bigint;
    keyword?: string;
    location?: string;
    industries: Array<string>;
}
export interface JobCategory {
    id: bigint;
    icon: string;
    name: string;
    slug: string;
    jobCount: bigint;
}
export interface JobSeeker {
    bio?: string;
    experienceLevel?: ExperienceLevel;
    principal: Principal;
    preferredIndustries: Array<string>;
    desiredSalaryMax?: bigint;
    desiredSalaryMin?: bigint;
    headline?: string;
    name: string;
    createdAt: Timestamp;
    workExperience: Array<WorkExperience>;
    email: string;
    resumeName?: string;
    updatedAt: Timestamp;
    phone?: string;
    location?: string;
    resumeUrl?: string;
}
export interface SavedJob {
    jobId: bigint;
    jobTitle: string;
    companyName: string;
    savedAt: Timestamp;
    location: string;
    seekerPrincipal: Principal;
}
export interface UpdateJobSeekerInput {
    bio?: string;
    experienceLevel?: ExperienceLevel;
    preferredIndustries: Array<string>;
    desiredSalaryMax?: bigint;
    desiredSalaryMin?: bigint;
    headline?: string;
    name: string;
    workExperience: Array<WorkExperience>;
    email: string;
    resumeName?: string;
    phone?: string;
    location?: string;
    resumeUrl?: string;
}
export interface Job {
    id: bigint;
    status: JobStatus;
    experienceLevel: ExperienceLevel;
    title: string;
    postedAt: Timestamp;
    responsibilities: string;
    jobType: JobType;
    tags: Array<string>;
    description: string;
    qualifications: string;
    isSample: boolean;
    isFeatured: boolean;
    companyLogo?: string;
    companyName: string;
    category: string;
    salaryMax?: bigint;
    salaryMin?: bigint;
    location: string;
    industry: string;
    companyId: bigint;
}
export interface WorkExperience {
    title: string;
    duration: string;
    company: string;
}
export interface Pagination {
    total: bigint;
    offset: bigint;
    limit: bigint;
}
export interface PageResult {
    pagination: Pagination;
    items: Array<Job>;
}
export enum ApplicationStatus {
    pending = "pending",
    rejected = "rejected",
    shortlisted = "shortlisted",
    reviewed = "reviewed"
}
export enum ExperienceLevel {
    mid = "mid",
    senior = "senior",
    entry = "entry"
}
export enum JobStatus {
    closed = "closed",
    active = "active"
}
export enum JobType {
    remote = "remote",
    contract = "contract",
    partTime = "partTime",
    fullTime = "fullTime"
}
export enum SortBy {
    newest = "newest",
    salaryHigh = "salaryHigh",
    salaryLow = "salaryLow"
}
export interface backendInterface {
    applyToJob(jobId: bigint): Promise<{
        __kind__: "ok";
        ok: Application;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createOrUpdateProfile(input: UpdateJobSeekerInput): Promise<JobSeeker>;
    getApplicationStatus(jobId: bigint): Promise<ApplicationStatus | null>;
    getCategories(): Promise<Array<JobCategory>>;
    getFeaturedJobs(): Promise<Array<Job>>;
    getJob(id: bigint): Promise<Job | null>;
    getJobsByCategory(categorySlug: string): Promise<Array<Job>>;
    getMyApplications(): Promise<Array<Application>>;
    getMyProfile(): Promise<JobSeeker | null>;
    getMySavedJobs(): Promise<Array<SavedJob>>;
    getRecentJobs(limit: bigint): Promise<Array<Job>>;
    getSimilarJobs(jobId: bigint, limit: bigint): Promise<Array<Job>>;
    hasApplied(jobId: bigint): Promise<boolean>;
    isJobSaved(jobId: bigint): Promise<boolean>;
    saveJob(jobId: bigint): Promise<{
        __kind__: "ok";
        ok: SavedJob;
    } | {
        __kind__: "err";
        err: string;
    }>;
    searchJobs(filter: SearchFilter, pagination: Pagination): Promise<PageResult>;
    unsaveJob(jobId: bigint): Promise<void>;
}
