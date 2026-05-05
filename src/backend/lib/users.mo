import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Jobs "../types/jobs";
import Common "../types/common";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";

module {
  // Composite key for (Principal, JobId) lookups
  func compositeKey(p : Principal, jobId : Nat) : Text {
    p.toText() # "|" # debug_show(jobId)
  };

  // ── Job Seeker Profile ──────────────────────────────────────────────────────

  public func getProfile(
    seekers : Map.Map<Principal, Jobs.JobSeeker>,
    caller : Principal,
  ) : ?Jobs.JobSeeker {
    seekers.get(caller)
  };

  public func createOrUpdateProfile(
    seekers : Map.Map<Principal, Jobs.JobSeeker>,
    caller : Principal,
    input : Jobs.UpdateJobSeekerInput,
  ) : Jobs.JobSeeker {
    let now = Time.now();
    let existing = seekers.get(caller);
    let createdAt = switch (existing) {
      case (?e) e.createdAt;
      case null now;
    };
    let seeker : Jobs.JobSeeker = {
      principal = caller;
      name = input.name;
      email = input.email;
      phone = input.phone;
      location = input.location;
      headline = input.headline;
      bio = input.bio;
      desiredSalaryMin = input.desiredSalaryMin;
      desiredSalaryMax = input.desiredSalaryMax;
      preferredIndustries = input.preferredIndustries;
      experienceLevel = input.experienceLevel;
      resumeUrl = input.resumeUrl;
      resumeName = input.resumeName;
      workExperience = input.workExperience;
      createdAt;
      updatedAt = now;
    };
    seekers.add(caller, seeker);
    seeker
  };

  // ── Application Management ──────────────────────────────────────────────────

  public func applyToJob(
    applications : Map.Map<Text, Jobs.Application>,
    nextAppId : Nat,
    jobs : Map.Map<Nat, Jobs.Job>,
    caller : Principal,
    jobId : Nat,
  ) : { #ok : Jobs.Application; #err : Text } {
    let key = compositeKey(caller, jobId);
    if (applications.containsKey(key)) {
      return #err("Already applied to this job");
    };
    switch (jobs.get(jobId)) {
      case null {
        #err("Job not found")
      };
      case (?job) {
        let app : Jobs.Application = {
          id = nextAppId;
          jobId;
          seekerPrincipal = caller;
          appliedAt = Time.now();
          status = #pending;
          jobTitle = job.title;
          companyName = job.companyName;
        };
        applications.add(key, app);
        #ok(app)
      };
    }
  };

  public func getMyApplications(
    applications : Map.Map<Text, Jobs.Application>,
    caller : Principal,
  ) : [Jobs.Application] {
    let prefix = caller.toText() # "|";
    applications.entries()
      |> _.filterMap(
        func((k, v)) { if (k.startsWith(#text prefix)) ?v else null },
      )
      |> _.toArray()
  };

  public func getApplicationStatus(
    applications : Map.Map<Text, Jobs.Application>,
    caller : Principal,
    jobId : Nat,
  ) : ?Common.ApplicationStatus {
    let key = compositeKey(caller, jobId);
    switch (applications.get(key)) {
      case (?app) ?app.status;
      case null null;
    }
  };

  public func hasApplied(
    applications : Map.Map<Text, Jobs.Application>,
    caller : Principal,
    jobId : Nat,
  ) : Bool {
    let key = compositeKey(caller, jobId);
    applications.containsKey(key)
  };

  // ── Saved Jobs ──────────────────────────────────────────────────────────────

  public func saveJob(
    savedJobs : Map.Map<Text, Jobs.SavedJob>,
    jobs : Map.Map<Nat, Jobs.Job>,
    caller : Principal,
    jobId : Nat,
  ) : { #ok : Jobs.SavedJob; #err : Text } {
    let key = compositeKey(caller, jobId);
    if (savedJobs.containsKey(key)) {
      switch (savedJobs.get(key)) {
        case (?existing) return #ok(existing);
        case null {};
      };
    };
    switch (jobs.get(jobId)) {
      case null {
        #err("Job not found")
      };
      case (?job) {
        let saved : Jobs.SavedJob = {
          jobId;
          seekerPrincipal = caller;
          savedAt = Time.now();
          jobTitle = job.title;
          companyName = job.companyName;
          location = job.location;
        };
        savedJobs.add(key, saved);
        #ok(saved)
      };
    }
  };

  public func unsaveJob(
    savedJobs : Map.Map<Text, Jobs.SavedJob>,
    caller : Principal,
    jobId : Nat,
  ) {
    let key = compositeKey(caller, jobId);
    savedJobs.remove(key)
  };

  public func getMySavedJobs(
    savedJobs : Map.Map<Text, Jobs.SavedJob>,
    caller : Principal,
  ) : [Jobs.SavedJob] {
    let prefix = caller.toText() # "|";
    savedJobs.entries()
      |> _.filterMap(
        func((k, v)) { if (k.startsWith(#text prefix)) ?v else null },
      )
      |> _.toArray()
  };

  public func isJobSaved(
    savedJobs : Map.Map<Text, Jobs.SavedJob>,
    caller : Principal,
    jobId : Nat,
  ) : Bool {
    let key = compositeKey(caller, jobId);
    savedJobs.containsKey(key)
  };
};
