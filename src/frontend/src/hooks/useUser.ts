import { createActor } from "@/backend";
import type {
  Application,
  JobSeeker,
  SavedJob,
  UpdateJobSeekerInput,
} from "@/backend";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const AUTH_STALE = 30_000;

export function useMyProfile() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();
  return useQuery<JobSeeker | null>({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProfile();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    staleTime: AUTH_STALE,
  });
}

export function useCreateOrUpdateProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<JobSeeker, Error, UpdateJobSeekerInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return actor.createOrUpdateProfile(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });
}

export function useApplyToJob() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Application, Error, bigint>({
    mutationFn: async (jobId) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.applyToJob(jobId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, jobId) => {
      qc.invalidateQueries({ queryKey: ["user", "applications"] });
      qc.invalidateQueries({
        queryKey: ["user", "hasApplied", jobId.toString()],
      });
    },
  });
}

export function useMyApplications() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();
  return useQuery<Application[]>({
    queryKey: ["user", "applications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyApplications();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    staleTime: AUTH_STALE,
  });
}

export function useHasApplied(jobId: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();
  return useQuery<boolean>({
    queryKey: ["user", "hasApplied", jobId?.toString()],
    queryFn: async () => {
      if (!actor || jobId === undefined) return false;
      return actor.hasApplied(jobId);
    },
    enabled: !!actor && !isFetching && isAuthenticated && jobId !== undefined,
    staleTime: AUTH_STALE,
  });
}

export function useSaveJob() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, bigint>({
    mutationFn: async (jobId) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.saveJob(jobId);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: (_data, jobId) => {
      qc.invalidateQueries({ queryKey: ["user", "savedJobs"] });
      qc.invalidateQueries({
        queryKey: ["user", "isJobSaved", jobId.toString()],
      });
    },
  });
}

export function useUnsaveJob() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, bigint>({
    mutationFn: async (jobId) => {
      if (!actor) throw new Error("Not connected");
      await actor.unsaveJob(jobId);
    },
    onSuccess: (_data, jobId) => {
      qc.invalidateQueries({ queryKey: ["user", "savedJobs"] });
      qc.invalidateQueries({
        queryKey: ["user", "isJobSaved", jobId.toString()],
      });
    },
  });
}

export function useMySavedJobs() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();
  return useQuery<SavedJob[]>({
    queryKey: ["user", "savedJobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMySavedJobs();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    staleTime: AUTH_STALE,
  });
}

export function useIsJobSaved(jobId: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();
  return useQuery<boolean>({
    queryKey: ["user", "isJobSaved", jobId?.toString()],
    queryFn: async () => {
      if (!actor || jobId === undefined) return false;
      return actor.isJobSaved(jobId);
    },
    enabled: !!actor && !isFetching && isAuthenticated && jobId !== undefined,
    staleTime: AUTH_STALE,
  });
}
