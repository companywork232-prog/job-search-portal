import type { backendInterface } from "../backend";
import {
  ApplicationStatus,
  ExperienceLevel,
  JobStatus,
  JobType,
} from "../backend";

const NOW = BigInt(1746345600000000000);
const DAY = BigInt(86400000000000);

function daysAgo(n: number): bigint {
  return NOW - BigInt(n) * DAY;
}

const sampleJobs = [
  {
    id: BigInt(1),
    title: "Senior Full-Stack Engineer",
    description:
      "Join our product team to design and build next-generation fintech features. You will own end-to-end delivery of complex features from architecture through deployment, working in a collaborative, remote-first environment.",
    responsibilities:
      "Design scalable REST and GraphQL APIs. Write clean, testable TypeScript/React code. Mentor junior engineers and conduct code reviews.",
    qualifications:
      "5+ years of full-stack development experience. Strong proficiency in TypeScript, React, Node.js. Experience with PostgreSQL or similar RDBMS.",
    companyId: BigInt(101),
    companyName: "FinBridge Technologies",
    companyLogo: "https://placehold.co/80x80?text=FB",
    location: "Bangalore, India",
    jobType: JobType.fullTime,
    salaryMin: BigInt(1800000),
    salaryMax: BigInt(2800000),
    experienceLevel: ExperienceLevel.senior,
    industry: "Information Technology",
    category: "it-technology",
    isFeatured: true,
    isSample: true,
    status: JobStatus.active,
    postedAt: daysAgo(2),
    tags: ["TypeScript", "React", "Node.js", "AWS"],
  },
  {
    id: BigInt(2),
    title: "DevOps / Cloud Engineer",
    description:
      "We are looking for an experienced DevOps engineer to streamline our CI/CD pipelines, manage Kubernetes clusters, and champion infrastructure-as-code practices.",
    responsibilities:
      "Maintain and improve CI/CD pipelines using GitHub Actions. Manage Kubernetes workloads on GKE. Write Terraform modules.",
    qualifications:
      "3+ years in DevOps or SRE roles. Hands-on Kubernetes, Helm, and Terraform.",
    companyId: BigInt(102),
    companyName: "CloudNest Solutions",
    companyLogo: "https://placehold.co/80x80?text=CN",
    location: "Hyderabad, India",
    jobType: JobType.fullTime,
    salaryMin: BigInt(1600000),
    salaryMax: BigInt(2400000),
    experienceLevel: ExperienceLevel.mid,
    industry: "Information Technology",
    category: "it-technology",
    isFeatured: true,
    isSample: true,
    status: JobStatus.active,
    postedAt: daysAgo(5),
    tags: ["Kubernetes", "Terraform", "GCP", "CI/CD"],
  },
  {
    id: BigInt(5),
    title: "Chartered Accountant – Taxation",
    description:
      "Leading CA firm is hiring a qualified Chartered Accountant to handle direct and indirect taxation for a diverse portfolio of corporate clients.",
    responsibilities:
      "Prepare and file income-tax and GST returns. Liaise with tax authorities and respond to notices.",
    qualifications:
      "CA qualification (ICAI). 3+ years post-qualification experience in taxation.",
    companyId: BigInt(201),
    companyName: "Mehta and Associates",
    companyLogo: "https://placehold.co/80x80?text=MA",
    location: "Mumbai, India",
    jobType: JobType.fullTime,
    salaryMin: BigInt(1200000),
    salaryMax: BigInt(2000000),
    experienceLevel: ExperienceLevel.mid,
    industry: "Finance",
    category: "finance",
    isFeatured: true,
    isSample: true,
    status: JobStatus.active,
    postedAt: daysAgo(3),
    tags: ["Taxation", "GST", "CA", "Tally"],
  },
  {
    id: BigInt(7),
    title: "Performance Marketing Manager",
    description:
      "Drive growth for our D2C e-commerce brand through paid digital channels. You will own the P&L of performance marketing budgets and build a high-performing team.",
    responsibilities:
      "Manage Google Ads, Meta Ads, and affiliate campaigns. Optimise ROAS across channels.",
    qualifications:
      "5+ years in performance marketing. Deep expertise in Google and Meta ads platforms.",
    companyId: BigInt(301),
    companyName: "GlowCart",
    companyLogo: "https://placehold.co/80x80?text=GC",
    location: "Delhi, India",
    jobType: JobType.fullTime,
    salaryMin: BigInt(1500000),
    salaryMax: BigInt(2500000),
    experienceLevel: ExperienceLevel.senior,
    industry: "Marketing",
    category: "marketing",
    isFeatured: true,
    isSample: true,
    status: JobStatus.active,
    postedAt: daysAgo(1),
    tags: ["Google Ads", "Meta Ads", "ROAS", "D2C"],
  },
  {
    id: BigInt(12),
    title: "Enterprise Sales Manager",
    description:
      "B2B SaaS company seeks a hunter-profile sales manager to drive new logo acquisition across large enterprises in BFSI and manufacturing verticals.",
    responsibilities:
      "Prospect, qualify, and close enterprise deals. Manage a portfolio of named accounts.",
    qualifications:
      "7+ years of B2B enterprise sales experience. Proven track record of exceeding 5 Cr+ annual quota.",
    companyId: BigInt(701),
    companyName: "Vantara SaaS",
    companyLogo: "https://placehold.co/80x80?text=VS",
    location: "Mumbai, India",
    jobType: JobType.fullTime,
    salaryMin: BigInt(2000000),
    salaryMax: BigInt(4000000),
    experienceLevel: ExperienceLevel.senior,
    industry: "Sales",
    category: "sales",
    isFeatured: true,
    isSample: true,
    status: JobStatus.active,
    postedAt: daysAgo(3),
    tags: ["Enterprise Sales", "SaaS", "B2B", "Salesforce"],
  },
  {
    id: BigInt(3),
    title: "Junior Frontend Developer",
    description:
      "Great opportunity for a motivated developer to grow their skills in a fast-paced product company.",
    responsibilities:
      "Build and maintain React components. Write unit and integration tests.",
    qualifications:
      "0-2 years of frontend development experience. Knowledge of HTML, CSS, JavaScript, and React.",
    companyId: BigInt(103),
    companyName: "SkyApps Pvt Ltd",
    companyLogo: undefined,
    location: "Pune, India",
    jobType: JobType.fullTime,
    salaryMin: BigInt(500000),
    salaryMax: BigInt(900000),
    experienceLevel: ExperienceLevel.entry,
    industry: "Information Technology",
    category: "it-technology",
    isFeatured: false,
    isSample: true,
    status: JobStatus.active,
    postedAt: daysAgo(10),
    tags: ["React", "JavaScript", "CSS", "Jest"],
  },
];

const sampleCategories = [
  { id: BigInt(1), name: "IT / Technology", slug: "it-technology", icon: "💻", jobCount: BigInt(4) },
  { id: BigInt(2), name: "Finance / Accounting", slug: "finance", icon: "💰", jobCount: BigInt(2) },
  { id: BigInt(3), name: "Marketing", slug: "marketing", icon: "📣", jobCount: BigInt(1) },
  { id: BigInt(4), name: "Healthcare / Medical", slug: "healthcare", icon: "🏥", jobCount: BigInt(2) },
  { id: BigInt(5), name: "Education / Training", slug: "education", icon: "🎓", jobCount: BigInt(1) },
  { id: BigInt(6), name: "HR / Recruitment", slug: "hr-recruitment", icon: "👥", jobCount: BigInt(1) },
  { id: BigInt(7), name: "Sales / Business Dev", slug: "sales", icon: "📈", jobCount: BigInt(1) },
  { id: BigInt(8), name: "Design / Creative", slug: "design", icon: "🎨", jobCount: BigInt(1) },
  { id: BigInt(9), name: "Customer Support", slug: "customer-support", icon: "🎧", jobCount: BigInt(1) },
  { id: BigInt(10), name: "Engineering", slug: "engineering", icon: "⚙️", jobCount: BigInt(1) },
];

export const mockBackend: backendInterface = {
  getCategories: async () => sampleCategories,

  getFeaturedJobs: async () => sampleJobs.filter((j) => j.isFeatured),

  getRecentJobs: async (_limit: bigint) => sampleJobs.slice(0, 6),

  getJob: async (id: bigint) => {
    const job = sampleJobs.find((j) => j.id === id);
    return job ?? null;
  },

  getJobsByCategory: async (categorySlug: string) =>
    sampleJobs.filter((j) => j.category === categorySlug),

  getSimilarJobs: async (jobId: bigint, _limit: bigint) =>
    sampleJobs.filter((j) => j.id !== jobId).slice(0, 3),

  searchJobs: async (_filter, pagination) => ({
    items: sampleJobs,
    pagination: {
      total: BigInt(sampleJobs.length),
      offset: pagination.offset,
      limit: pagination.limit,
    },
  }),

  getMyProfile: async () => null,

  createOrUpdateProfile: async (input) => ({
    principal: "aaaaa-aa" as unknown as import("@icp-sdk/core/principal").Principal,
    name: input.name,
    email: input.email,
    phone: input.phone,
    location: input.location,
    headline: input.headline,
    bio: input.bio,
    resumeUrl: input.resumeUrl,
    resumeName: input.resumeName,
    experienceLevel: input.experienceLevel,
    desiredSalaryMin: input.desiredSalaryMin,
    desiredSalaryMax: input.desiredSalaryMax,
    preferredIndustries: input.preferredIndustries,
    workExperience: input.workExperience,
    createdAt: NOW,
    updatedAt: NOW,
  }),

  getMyApplications: async () => [
    {
      id: BigInt(1),
      jobId: BigInt(1),
      jobTitle: "Senior Full-Stack Engineer",
      companyName: "FinBridge Technologies",
      status: ApplicationStatus.reviewed,
      appliedAt: daysAgo(5),
      seekerPrincipal: "aaaaa-aa" as unknown as import("@icp-sdk/core/principal").Principal,
    },
    {
      id: BigInt(2),
      jobId: BigInt(7),
      jobTitle: "Performance Marketing Manager",
      companyName: "GlowCart",
      status: ApplicationStatus.pending,
      appliedAt: daysAgo(2),
      seekerPrincipal: "aaaaa-aa" as unknown as import("@icp-sdk/core/principal").Principal,
    },
    {
      id: BigInt(3),
      jobId: BigInt(12),
      jobTitle: "Enterprise Sales Manager",
      companyName: "Vantara SaaS",
      status: ApplicationStatus.shortlisted,
      appliedAt: daysAgo(10),
      seekerPrincipal: "aaaaa-aa" as unknown as import("@icp-sdk/core/principal").Principal,
    },
  ],

  getMySavedJobs: async () => [
    {
      jobId: BigInt(2),
      jobTitle: "DevOps / Cloud Engineer",
      companyName: "CloudNest Solutions",
      location: "Hyderabad, India",
      savedAt: daysAgo(3),
      seekerPrincipal: "aaaaa-aa" as unknown as import("@icp-sdk/core/principal").Principal,
    },
  ],

  applyToJob: async (jobId: bigint) => ({
    __kind__: "ok" as const,
    ok: {
      id: BigInt(99),
      jobId,
      jobTitle: "Senior Full-Stack Engineer",
      companyName: "FinBridge Technologies",
      status: ApplicationStatus.pending,
      appliedAt: NOW,
      seekerPrincipal: "aaaaa-aa" as unknown as import("@icp-sdk/core/principal").Principal,
    },
  }),

  saveJob: async (jobId: bigint) => ({
    __kind__: "ok" as const,
    ok: {
      jobId,
      jobTitle: "Senior Full-Stack Engineer",
      companyName: "FinBridge Technologies",
      location: "Bangalore, India",
      savedAt: NOW,
      seekerPrincipal: "aaaaa-aa" as unknown as import("@icp-sdk/core/principal").Principal,
    },
  }),

  unsaveJob: async (_jobId: bigint) => undefined,

  hasApplied: async (_jobId: bigint) => false,

  isJobSaved: async (_jobId: bigint) => false,

  getApplicationStatus: async (_jobId: bigint) => null,
};
