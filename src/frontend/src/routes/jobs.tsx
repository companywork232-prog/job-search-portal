import { Breadcrumb } from "@/components/Breadcrumb";
import { JobCard } from "@/components/JobCard";
import { JobListSkeleton } from "@/components/LoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCategories, useSearchJobs } from "@/hooks/useJobs";
import type { JobFilter } from "@/types";
import { createRoute, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";
import { Route as rootRoute } from "./__root";

const JOB_TYPES = [
  { value: "fullTime", label: "Full Time" },
  { value: "partTime", label: "Part Time" },
  { value: "remote", label: "Remote" },
  { value: "contract", label: "Contract" },
];

const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior Level" },
];

const SALARY_RANGES = [
  { label: "Any Salary", min: undefined, max: undefined },
  { label: "$0 – $50k", min: 0, max: 50000 },
  { label: "$50k – $100k", min: 50000, max: 100000 },
  { label: "$100k – $150k", min: 100000, max: 150000 },
  { label: "$150k+", min: 150000, max: undefined },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "salaryHigh", label: "Salary: High to Low" },
  { value: "salaryLow", label: "Salary: Low to High" },
];

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button
        type="button"
        className="flex items-center justify-between w-full mb-3"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-display font-semibold text-sm text-foreground">
          {title}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      {open && <div className="space-y-2">{children}</div>}
    </div>
  );
}

function FilterPanel({
  filter,
  onFilterChange,
}: {
  filter: JobFilter;
  onFilterChange: (f: JobFilter) => void;
}) {
  const { data: categories } = useCategories();

  const toggle = (key: keyof JobFilter, value: string) => {
    onFilterChange({
      ...filter,
      [key]: filter[key] === value ? undefined : value,
    });
  };

  const setSalary = (min?: number, max?: number) => {
    onFilterChange({ ...filter, salaryMin: min, salaryMax: max });
  };

  return (
    <div className="space-y-0" data-ocid="jobs.filter_panel">
      {/* Sort By */}
      <div className="pb-4 border-b border-border mb-4">
        <Label className="font-display font-semibold text-sm text-foreground mb-2 block">
          Sort By
        </Label>
        <Select
          value={filter.sortBy ?? "newest"}
          onValueChange={(v) => onFilterChange({ ...filter, sortBy: v })}
        >
          <SelectTrigger className="w-full" data-ocid="jobs.sort_select">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Keyword */}
      <div className="pb-4 border-b border-border mb-4">
        <Label className="font-display font-semibold text-sm text-foreground mb-2 block">
          Keywords
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={filter.keyword ?? ""}
            onChange={(e) =>
              onFilterChange({
                ...filter,
                keyword: e.target.value || undefined,
              })
            }
            placeholder="Job title, skills..."
            className="pl-9"
            data-ocid="jobs.keyword_input"
          />
        </div>
      </div>

      {/* Location */}
      <div className="pb-4 border-b border-border mb-4">
        <Label className="font-display font-semibold text-sm text-foreground mb-2 block">
          Location
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={filter.location ?? ""}
            onChange={(e) =>
              onFilterChange({
                ...filter,
                location: e.target.value || undefined,
              })
            }
            placeholder="City, state, or remote"
            className="pl-9"
            data-ocid="jobs.location_input"
          />
        </div>
      </div>

      <FilterSection title="Job Type">
        {JOB_TYPES.map(({ value, label }) => (
          <div key={value} className="flex items-center gap-2">
            <Checkbox
              id={`jt-${value}`}
              checked={filter.jobType === value}
              onCheckedChange={() => toggle("jobType", value)}
              data-ocid={`jobs.jobtype_${value}_checkbox`}
            />
            <Label
              htmlFor={`jt-${value}`}
              className="text-sm font-normal cursor-pointer"
            >
              {label}
            </Label>
          </div>
        ))}
      </FilterSection>

      <FilterSection title="Experience Level">
        {EXPERIENCE_LEVELS.map(({ value, label }) => (
          <div key={value} className="flex items-center gap-2">
            <Checkbox
              id={`el-${value}`}
              checked={filter.experienceLevel === value}
              onCheckedChange={() => toggle("experienceLevel", value)}
              data-ocid={`jobs.experience_${value}_checkbox`}
            />
            <Label
              htmlFor={`el-${value}`}
              className="text-sm font-normal cursor-pointer"
            >
              {label}
            </Label>
          </div>
        ))}
      </FilterSection>

      <FilterSection title="Salary Range">
        {SALARY_RANGES.map(({ label, min, max }) => (
          <div key={label} className="flex items-center gap-2">
            <Checkbox
              id={`sal-${label}`}
              checked={filter.salaryMin === min && filter.salaryMax === max}
              onCheckedChange={() => setSalary(min, max)}
              data-ocid={`jobs.salary_${label.toLowerCase().replace(/[^a-z0-9]/g, "_")}_checkbox`}
            />
            <Label
              htmlFor={`sal-${label}`}
              className="text-sm font-normal cursor-pointer"
            >
              {label}
            </Label>
          </div>
        ))}
      </FilterSection>

      <FilterSection title="Category" defaultOpen={false}>
        {(categories ?? []).map(({ slug, name }) => (
          <div key={slug} className="flex items-center gap-2">
            <Checkbox
              id={`cat-${slug}`}
              checked={filter.category === slug}
              onCheckedChange={() => toggle("category", slug)}
              data-ocid={`jobs.category_${slug}_checkbox`}
            />
            <Label
              htmlFor={`cat-${slug}`}
              className="text-sm font-normal cursor-pointer"
            >
              {name}
            </Label>
          </div>
        ))}
      </FilterSection>
    </div>
  );
}

// Active filter chips
function ActiveFilters({
  filter,
  onRemove,
  onClearAll,
}: {
  filter: JobFilter;
  onRemove: (key: keyof JobFilter) => void;
  onClearAll: () => void;
}) {
  const chips: Array<{ key: keyof JobFilter; label: string }> = [];

  if (filter.keyword)
    chips.push({ key: "keyword", label: `"${filter.keyword}"` });
  if (filter.location)
    chips.push({ key: "location", label: `📍 ${filter.location}` });
  if (filter.category)
    chips.push({ key: "category", label: `Category: ${filter.category}` });
  if (filter.jobType) {
    const jt = JOB_TYPES.find((j) => j.value === filter.jobType);
    chips.push({ key: "jobType", label: jt?.label ?? filter.jobType });
  }
  if (filter.experienceLevel) {
    const el = EXPERIENCE_LEVELS.find(
      (e) => e.value === filter.experienceLevel,
    );
    chips.push({
      key: "experienceLevel",
      label: el?.label ?? filter.experienceLevel,
    });
  }
  if (filter.salaryMin !== undefined || filter.salaryMax !== undefined) {
    const sal = SALARY_RANGES.find(
      (r) => r.min === filter.salaryMin && r.max === filter.salaryMax,
    );
    chips.push({
      key: "salaryMin",
      label: sal?.label ?? "Salary filter",
    });
  }

  if (chips.length === 0) return null;

  return (
    <div
      className="flex flex-wrap items-center gap-2 px-4 sm:px-6 lg:px-8 py-2 bg-muted/40 border-b border-border"
      data-ocid="jobs.active_filters"
    >
      <span className="text-xs text-muted-foreground font-medium shrink-0">
        Active filters:
      </span>
      {chips.map(({ key, label }) => (
        <Badge
          key={key}
          variant="secondary"
          className="flex items-center gap-1 text-xs py-0.5 pr-1 pl-2 rounded-full cursor-pointer hover:bg-muted transition-colors"
          data-ocid={`jobs.filter_chip.${key}`}
        >
          <span className="max-w-[120px] truncate">{label}</span>
          <button
            type="button"
            className="ml-0.5 rounded-full p-0.5 hover:bg-foreground/10 transition-colors"
            onClick={() => onRemove(key)}
            aria-label={`Remove ${label} filter`}
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}
      <button
        type="button"
        className="text-xs text-primary hover:underline ml-1"
        onClick={onClearAll}
        data-ocid="jobs.active_filters_clear_button"
      >
        Clear all
      </button>
    </div>
  );
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jobs",
  validateSearch: (
    raw: Record<string, unknown>,
  ): {
    keyword?: string;
    location?: string;
    category?: string;
    jobType?: string;
    experienceLevel?: string;
    salaryMin?: number;
    salaryMax?: number;
    sortBy?: string;
    page?: number;
    featured?: string;
  } => ({
    keyword: typeof raw.keyword === "string" ? raw.keyword : undefined,
    location: typeof raw.location === "string" ? raw.location : undefined,
    category: typeof raw.category === "string" ? raw.category : undefined,
    jobType: typeof raw.jobType === "string" ? raw.jobType : undefined,
    experienceLevel:
      typeof raw.experienceLevel === "string" ? raw.experienceLevel : undefined,
    salaryMin: raw.salaryMin !== undefined ? Number(raw.salaryMin) : undefined,
    salaryMax: raw.salaryMax !== undefined ? Number(raw.salaryMax) : undefined,
    sortBy: typeof raw.sortBy === "string" ? raw.sortBy : undefined,
    page: raw.page !== undefined ? Number(raw.page) : undefined,
    featured: typeof raw.featured === "string" ? raw.featured : undefined,
  }),
  component: JobsPage,
});

export default function JobsPage() {
  const navigate = useNavigate({ from: "/jobs" });
  const search = Route.useSearch();

  const [filter, setFilter] = useState<JobFilter>({
    keyword: search.keyword,
    location: search.location,
    category: search.category,
    jobType: search.jobType,
    experienceLevel: search.experienceLevel,
    salaryMin: search.salaryMin,
    salaryMax: search.salaryMax,
    sortBy: search.sortBy ?? "newest",
  });

  const page = search.page ?? 1;
  const LIMIT = 12;

  const { data, isLoading } = useSearchJobs(filter, { page, limit: LIMIT });
  const jobs = data?.items ?? [];
  const total = Number(data?.pagination.total ?? 0);
  const totalPages = Math.ceil(total / LIMIT);

  const handleFilterChange = useCallback(
    (f: JobFilter) => {
      setFilter(f);
      navigate({ search: (prev) => ({ ...prev, ...f, page: 1 }) });
    },
    [navigate],
  );

  const removeFilter = useCallback(
    (key: keyof JobFilter) => {
      const updated = { ...filter };
      if (key === "salaryMin") {
        updated.salaryMin = undefined;
        updated.salaryMax = undefined;
      } else {
        (updated as Record<string, unknown>)[key] = undefined;
      }
      setFilter(updated);
      navigate({ search: (prev) => ({ ...prev, ...updated, page: 1 }) });
    },
    [filter, navigate],
  );

  const clearFilters = () => {
    const cleared: JobFilter = { sortBy: "newest" };
    setFilter(cleared);
    navigate({ search: () => ({}) });
  };

  const activeFilterCount = [
    filter.keyword,
    filter.location,
    filter.category,
    filter.jobType,
    filter.experienceLevel,
    filter.salaryMin,
  ].filter(Boolean).length;

  return (
    <div className="bg-background min-h-screen" data-ocid="jobs.page">
      {/* Sub-header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[{ label: "Browse Jobs" }]} />
          <div className="flex items-center justify-between mt-3">
            <div>
              <h1 className="font-display font-bold text-xl text-foreground">
                {filter.keyword ? `"${filter.keyword}" jobs` : "Browse Jobs"}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {isLoading
                  ? "Searching..."
                  : `${total.toLocaleString()} positions found`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hidden sm:flex"
                  data-ocid="jobs.clear_filters_button"
                >
                  <X className="w-3.5 h-3.5 mr-1" /> Clear ({activeFilterCount})
                </Button>
              )}
              {/* Mobile filter trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="md:hidden"
                    data-ocid="jobs.mobile_filter_button"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-1.5" />
                    Filters
                    {activeFilterCount > 0 && (
                      <Badge className="ml-1.5 text-xs bg-primary text-primary-foreground">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-80 overflow-y-auto"
                  data-ocid="jobs.filter_sheet"
                >
                  <SheetHeader>
                    <SheetTitle>Filter & Sort Jobs</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    {activeFilterCount > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearFilters}
                        className="w-full mb-4 text-muted-foreground"
                        data-ocid="jobs.sheet_clear_button"
                      >
                        <X className="w-3.5 h-3.5 mr-1" /> Clear all filters
                      </Button>
                    )}
                    <FilterPanel
                      filter={filter}
                      onFilterChange={handleFilterChange}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Active filter chips row */}
      <div className="max-w-7xl mx-auto">
        <ActiveFilters
          filter={filter}
          onRemove={removeFilter}
          onClearAll={clearFilters}
        />
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="bg-card border border-border rounded-xl p-4 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-semibold text-sm text-foreground">
                  Filters & Sort
                </span>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs text-primary hover:underline"
                    data-ocid="jobs.sidebar_clear_button"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <FilterPanel
                filter={filter}
                onFilterChange={handleFilterChange}
              />
            </div>
          </aside>

          {/* Job grid */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <JobListSkeleton count={LIMIT} />
            ) : jobs.length === 0 ? (
              <div
                className="text-center py-20 bg-card rounded-xl border border-border"
                data-ocid="jobs.empty_state"
              >
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                  No jobs found
                </h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto">
                  Try broadening your search terms or adjusting your filters to
                  see more results.
                </p>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  data-ocid="jobs.empty_clear_button"
                >
                  <X className="w-4 h-4 mr-1.5" />
                  Clear all filters
                </Button>
              </div>
            ) : (
              <>
                {/* Results count + sort info */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-semibold text-foreground">
                      {Math.min((page - 1) * LIMIT + 1, total)}–
                      {Math.min(page * LIMIT, total)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-foreground">
                      {total.toLocaleString()}
                    </span>{" "}
                    jobs
                  </p>
                  <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Sort:</span>
                    <span className="font-medium text-foreground">
                      {SORT_OPTIONS.find((s) => s.value === filter.sortBy)
                        ?.label ?? "Newest First"}
                    </span>
                  </div>
                </div>

                <div
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                  data-ocid="jobs.list"
                >
                  {jobs.map((job, i) => (
                    <JobCard key={job.id.toString()} job={job} index={i + 1} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div
                    className="flex items-center justify-center gap-2 mt-8"
                    data-ocid="jobs.pagination"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page <= 1}
                      onClick={() =>
                        navigate({
                          search: (s) => ({ ...s, page: page - 1 }),
                        })
                      }
                      data-ocid="jobs.pagination_prev"
                    >
                      ← Previous
                    </Button>

                    {/* Page number pills */}
                    <div className="flex items-center gap-1">
                      {Array.from(
                        { length: Math.min(totalPages, 7) },
                        (_, i) => {
                          const pg =
                            totalPages <= 7
                              ? i + 1
                              : getPageNumbers(page, totalPages)[i];
                          return (
                            <button
                              key={`pg-${pg}`}
                              type="button"
                              onClick={() =>
                                navigate({
                                  search: (s) => ({ ...s, page: pg }),
                                })
                              }
                              className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                                pg === page
                                  ? "bg-primary text-primary-foreground font-semibold"
                                  : "text-muted-foreground hover:bg-muted"
                              }`}
                              data-ocid={`jobs.page_button.${pg}`}
                            >
                              {pg}
                            </button>
                          );
                        },
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page >= totalPages}
                      onClick={() =>
                        navigate({
                          search: (s) => ({ ...s, page: page + 1 }),
                        })
                      }
                      data-ocid="jobs.pagination_next"
                    >
                      Next →
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Returns up to 7 page numbers around the current page. */
function getPageNumbers(current: number, total: number): number[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const delta = 2;
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);
  const pages: number[] = [1];
  if (left > 2) pages.push(-1); // ellipsis placeholder
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push(-2); // ellipsis placeholder
  pages.push(total);
  return pages.slice(0, 7);
}
