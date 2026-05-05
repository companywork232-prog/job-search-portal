import Time "mo:core/Time";

module {
  public type Timestamp = Time.Time;

  public type JobType = {
    #fullTime;
    #partTime;
    #contract;
    #remote;
  };

  public type ExperienceLevel = {
    #entry;
    #mid;
    #senior;
  };

  public type ApplicationStatus = {
    #pending;
    #reviewed;
    #shortlisted;
    #rejected;
  };

  public type SortBy = {
    #newest;
    #salaryHigh;
    #salaryLow;
  };

  public type JobStatus = {
    #active;
    #closed;
  };

  public type SearchFilter = {
    keyword : ?Text;
    location : ?Text;
    jobType : ?JobType;
    salaryMin : ?Nat;
    salaryMax : ?Nat;
    experienceLevel : ?ExperienceLevel;
    industries : [Text];
    sortBy : ?SortBy;
  };

  public type Pagination = {
    offset : Nat;
    limit : Nat;
    total : Nat;
  };

  public type PageResult<T> = {
    items : [T];
    pagination : Pagination;
  };
};
