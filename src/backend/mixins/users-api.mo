import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Jobs "../types/jobs";
import Common "../types/common";
import UsersLib "../lib/users";

mixin (
  seekers : Map.Map<Principal, Jobs.JobSeeker>,
  applications : Map.Map<Text, Jobs.Application>,
  savedJobs : Map.Map<Text, Jobs.SavedJob>,
  jobs : Map.Map<Nat, Jobs.Job>,
) {
  var nextAppId : Nat = 0;

  // ── Job Seeker Profile ──────────────────────────────────────────────────────

  public shared query ({ caller }) func getMyProfile() : async ?Jobs.JobSeeker {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    UsersLib.getProfile(seekers, caller)
  };

  public shared ({ caller }) func createOrUpdateProfile(
    input : Jobs.UpdateJobSeekerInput
  ) : async Jobs.JobSeeker {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    UsersLib.createOrUpdateProfile(seekers, caller, input)
  };

  // ── Application Management ──────────────────────────────────────────────────

  public shared ({ caller }) func applyToJob(
    jobId : Nat
  ) : async { #ok : Jobs.Application; #err : Text } {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    let result = UsersLib.applyToJob(applications, nextAppId, jobs, caller, jobId);
    switch (result) {
      case (#ok(_)) { nextAppId += 1 };
      case (#err(_)) {};
    };
    result
  };

  public shared query ({ caller }) func getMyApplications() : async [Jobs.Application] {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    UsersLib.getMyApplications(applications, caller)
  };

  public shared query ({ caller }) func getApplicationStatus(
    jobId : Nat
  ) : async ?Common.ApplicationStatus {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    UsersLib.getApplicationStatus(applications, caller, jobId)
  };

  public shared query ({ caller }) func hasApplied(jobId : Nat) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    UsersLib.hasApplied(applications, caller, jobId)
  };

  // ── Saved Jobs ──────────────────────────────────────────────────────────────

  public shared ({ caller }) func saveJob(
    jobId : Nat
  ) : async { #ok : Jobs.SavedJob; #err : Text } {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    UsersLib.saveJob(savedJobs, jobs, caller, jobId)
  };

  public shared ({ caller }) func unsaveJob(jobId : Nat) : async () {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    UsersLib.unsaveJob(savedJobs, caller, jobId)
  };

  public shared query ({ caller }) func getMySavedJobs() : async [Jobs.SavedJob] {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    UsersLib.getMySavedJobs(savedJobs, caller)
  };

  public shared query ({ caller }) func isJobSaved(jobId : Nat) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Not authenticated");
    UsersLib.isJobSaved(savedJobs, caller, jobId)
  };
};
