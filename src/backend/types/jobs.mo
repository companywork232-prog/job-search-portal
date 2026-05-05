import Common "common";

module {
  public type Job = {
    id : Nat;
    title : Text;
    description : Text;
    responsibilities : Text;
    qualifications : Text;
    companyId : Nat;
    companyName : Text;
    companyLogo : ?Text;
    location : Text;
    jobType : Common.JobType;
    salaryMin : ?Nat;
    salaryMax : ?Nat;
    experienceLevel : Common.ExperienceLevel;
    industry : Text;
    category : Text;
    isFeatured : Bool;
    isSample : Bool;
    status : Common.JobStatus;
    postedAt : Common.Timestamp;
    tags : [Text];
  };

  public type JobCategory = {
    id : Nat;
    name : Text;
    slug : Text;
    icon : Text;
    jobCount : Nat;
  };

  public type WorkExperience = {
    title : Text;
    company : Text;
    duration : Text;
  };

  public type JobSeeker = {
    principal : Principal;
    name : Text;
    email : Text;
    phone : ?Text;
    location : ?Text;
    headline : ?Text;
    bio : ?Text;
    desiredSalaryMin : ?Nat;
    desiredSalaryMax : ?Nat;
    preferredIndustries : [Text];
    experienceLevel : ?Common.ExperienceLevel;
    resumeUrl : ?Text;
    resumeName : ?Text;
    workExperience : [WorkExperience];
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type Employer = {
    principal : Principal;
    companyId : Nat;
    companyName : Text;
    companyLogo : ?Text;
    companyDescription : ?Text;
    website : ?Text;
    location : ?Text;
    industry : ?Text;
    employeeCount : ?Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type Application = {
    id : Nat;
    jobId : Nat;
    seekerPrincipal : Principal;
    appliedAt : Common.Timestamp;
    status : Common.ApplicationStatus;
    jobTitle : Text;
    companyName : Text;
  };

  public type SavedJob = {
    jobId : Nat;
    seekerPrincipal : Principal;
    savedAt : Common.Timestamp;
    jobTitle : Text;
    companyName : Text;
    location : Text;
  };

  // Input types for creating/updating
  public type CreateJobInput = {
    title : Text;
    description : Text;
    responsibilities : Text;
    qualifications : Text;
    companyId : Nat;
    companyName : Text;
    companyLogo : ?Text;
    location : Text;
    jobType : Common.JobType;
    salaryMin : ?Nat;
    salaryMax : ?Nat;
    experienceLevel : Common.ExperienceLevel;
    industry : Text;
    category : Text;
    isFeatured : Bool;
    tags : [Text];
  };

  public type UpdateJobSeekerInput = {
    name : Text;
    email : Text;
    phone : ?Text;
    location : ?Text;
    headline : ?Text;
    bio : ?Text;
    desiredSalaryMin : ?Nat;
    desiredSalaryMax : ?Nat;
    preferredIndustries : [Text];
    experienceLevel : ?Common.ExperienceLevel;
    resumeUrl : ?Text;
    resumeName : ?Text;
    workExperience : [WorkExperience];
  };

  public type UpdateEmployerInput = {
    companyName : Text;
    companyLogo : ?Text;
    companyDescription : ?Text;
    website : ?Text;
    location : ?Text;
    industry : ?Text;
    employeeCount : ?Text;
  };
};
