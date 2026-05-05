import Map "mo:core/Map";
import JobsLib "../lib/jobs";
import Types "../types/jobs";
import Common "../types/common";

mixin (
  jobs : Map.Map<Nat, Types.Job>,
  categories : Map.Map<Nat, Types.JobCategory>,
  nextJobId : Nat,
) {
  public query func searchJobs(filter : Common.SearchFilter, pagination : Common.Pagination) : async Common.PageResult<Types.Job> {
    JobsLib.searchJobs(jobs, filter, pagination);
  };

  public query func getJob(id : Nat) : async ?Types.Job {
    JobsLib.getJob(jobs, id);
  };

  public query func getFeaturedJobs() : async [Types.Job] {
    JobsLib.getFeaturedJobs(jobs);
  };

  public query func getRecentJobs(limit : Nat) : async [Types.Job] {
    JobsLib.getRecentJobs(jobs, limit);
  };

  public query func getJobsByCategory(categorySlug : Text) : async [Types.Job] {
    JobsLib.getJobsByCategory(jobs, categorySlug);
  };

  public query func getCategories() : async [Types.JobCategory] {
    let rawCats = JobsLib.buildCategories();
    JobsLib.categoriesWithCounts(rawCats, jobs);
  };

  public query func getSimilarJobs(jobId : Nat, limit : Nat) : async [Types.Job] {
    JobsLib.getSimilarJobs(jobs, jobId, limit);
  };
};
