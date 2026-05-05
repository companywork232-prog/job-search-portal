import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Jobs "types/jobs";
import UsersMixin "mixins/users-api";
import JobsApi "mixins/jobs-api";
import JobsLib "lib/jobs";

actor {
  let seekers = Map.empty<Principal, Jobs.JobSeeker>();
  let applications = Map.empty<Text, Jobs.Application>();
  let savedJobs = Map.empty<Text, Jobs.SavedJob>();
  let jobs = Map.empty<Nat, Jobs.Job>();
  let categories = Map.empty<Nat, Jobs.JobCategory>();
  let nextJobId : Nat = JobsLib.seedIfEmpty(jobs, categories, 1);

  include UsersMixin(seekers, applications, savedJobs, jobs);
  include JobsApi(jobs, categories, nextJobId);
};
