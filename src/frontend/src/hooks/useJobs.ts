import { createActor } from "@/backend";
import type { Job, JobCategory, PageResult, SearchFilter } from "@/backend";
import type { JobFilter, PaginationParams } from "@/types";
import { toBackendFilter } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const STALE = 60_000;

export function useSearchJobs(filter: JobFilter, pagination: PaginationParams) {
  const { actor, isFetching } = useActor(createActor);
  const backendFilter: SearchFilter = toBackendFilter(filter);
  const backendPagination = {
    offset: BigInt((pagination.page - 1) * pagination.limit),
    limit: BigInt(pagination.limit),
    total: BigInt(0),
  };

  return useQuery<PageResult>({
    queryKey: ["jobs", "search", filter, pagination],
    queryFn: async () => {
      if (!actor)
        return { items: [], pagination: { total: 0n, offset: 0n, limit: 20n } };
      return actor.searchJobs(backendFilter, backendPagination);
    },
    enabled: !!actor && !isFetching,
    staleTime: STALE,
  });
}

export function useFeaturedJobs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Job[]>({
    queryKey: ["jobs", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedJobs();
    },
    enabled: !!actor && !isFetching,
    staleTime: STALE,
  });
}

export function useRecentJobs(limit = 6) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Job[]>({
    queryKey: ["jobs", "recent", limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentJobs(BigInt(limit));
    },
    enabled: !!actor && !isFetching,
    staleTime: STALE,
  });
}

export function useJobById(id: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Job | null>({
    queryKey: ["jobs", "detail", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getJob(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
    staleTime: STALE,
  });
}

export function useCategories() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<JobCategory[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60_000,
  });
}

export function useSimilarJobs(jobId: bigint | undefined, limit = 4) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Job[]>({
    queryKey: ["jobs", "similar", jobId?.toString(), limit],
    queryFn: async () => {
      if (!actor || jobId === undefined) return [];
      return actor.getSimilarJobs(jobId, BigInt(limit));
    },
    enabled: !!actor && !isFetching && jobId !== undefined,
    staleTime: STALE,
  });
}

export function useJobsByCategory(categorySlug: string | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Job[]>({
    queryKey: ["jobs", "category", categorySlug],
    queryFn: async () => {
      if (!actor || !categorySlug) return [];
      return actor.getJobsByCategory(categorySlug);
    },
    enabled: !!actor && !isFetching && !!categorySlug,
    staleTime: STALE,
  });
}
