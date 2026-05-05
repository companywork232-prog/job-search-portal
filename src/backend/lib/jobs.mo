import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Types "../types/jobs";
import Common "../types/common";

module {
  // ─── seed helpers ──────────────────────────────────────────────

  let NOW : Common.Timestamp = 1_746_345_600_000_000_000; // ~2026-05-04
  let DAY : Int = 86_400_000_000_000;

  func daysAgo(n : Int) : Common.Timestamp {
    NOW - n * DAY;
  };

  // ─── categories ────────────────────────────────────────────────

  public func buildCategories() : [Types.JobCategory] {
    [
      { id = 1; name = "IT / Technology";       slug = "it-technology";    icon = "💻"; jobCount = 0 },
      { id = 2; name = "Finance / Accounting";  slug = "finance";          icon = "💰"; jobCount = 0 },
      { id = 3; name = "Marketing";             slug = "marketing";        icon = "📣"; jobCount = 0 },
      { id = 4; name = "Healthcare / Medical";  slug = "healthcare";       icon = "🏥"; jobCount = 0 },
      { id = 5; name = "Education / Training";  slug = "education";        icon = "🎓"; jobCount = 0 },
      { id = 6; name = "HR / Recruitment";      slug = "hr-recruitment";   icon = "👥"; jobCount = 0 },
      { id = 7; name = "Sales / Business Dev";  slug = "sales";            icon = "📈"; jobCount = 0 },
      { id = 8; name = "Design / Creative";     slug = "design";           icon = "🎨"; jobCount = 0 },
      { id = 9; name = "Customer Support";      slug = "customer-support"; icon = "🎧"; jobCount = 0 },
      { id = 10; name = "Engineering";          slug = "engineering";      icon = "⚙️"; jobCount = 0 },
    ];
  };

  // ─── sample jobs ───────────────────────────────────────────────

  public func buildSampleJobs() : [Types.Job] {
    [
      // 1 – IT/Technology
      {
        id = 1;
        title = "Senior Full-Stack Engineer";
        description = "Join our product team to design and build next-generation fintech features. You will own end-to-end delivery of complex features from architecture through deployment, working in a collaborative, remote-first environment.";
        responsibilities = "Design scalable REST and GraphQL APIs. Write clean, testable TypeScript/React code. Mentor junior engineers and conduct code reviews. Collaborate with product managers to refine requirements.";
        qualifications = "5+ years of full-stack development experience. Strong proficiency in TypeScript, React, Node.js. Experience with PostgreSQL or similar RDBMS. Familiarity with AWS or GCP cloud services.";
        companyId = 101;
        companyName = "FinBridge Technologies";
        companyLogo = ?"https://placehold.co/80x80?text=FB";
        location = "Bangalore, India";
        jobType = #fullTime;
        salaryMin = ?1_800_000;
        salaryMax = ?2_800_000;
        experienceLevel = #senior;
        industry = "Information Technology";
        category = "it-technology";
        isFeatured = true;
        isSample = true;
        status = #active;
        postedAt = daysAgo(2);
        tags = ["TypeScript", "React", "Node.js", "AWS"];
      },
      // 2 – IT/Technology
      {
        id = 2;
        title = "DevOps / Cloud Engineer";
        description = "We are looking for an experienced DevOps engineer to streamline our CI/CD pipelines, manage Kubernetes clusters, and champion infrastructure-as-code practices across our engineering organization.";
        responsibilities = "Maintain and improve CI/CD pipelines using GitHub Actions. Manage Kubernetes workloads on GKE. Write Terraform modules for repeatable infra provisioning. Respond to on-call incidents and perform root-cause analysis.";
        qualifications = "3+ years in DevOps or SRE roles. Hands-on Kubernetes, Helm, and Terraform. Proficient with Linux administration. GCP or AWS certification is a plus.";
        companyId = 102;
        companyName = "CloudNest Solutions";
        companyLogo = ?"https://placehold.co/80x80?text=CN";
        location = "Hyderabad, India";
        jobType = #fullTime;
        salaryMin = ?1_600_000;
        salaryMax = ?2_400_000;
        experienceLevel = #mid;
        industry = "Information Technology";
        category = "it-technology";
        isFeatured = true;
        isSample = true;
        status = #active;
        postedAt = daysAgo(5);
        tags = ["Kubernetes", "Terraform", "GCP", "CI/CD"];
      },
      // 3 – IT/Technology
      {
        id = 3;
        title = "Junior Frontend Developer";
        description = "Great opportunity for a motivated developer to grow their skills in a fast-paced product company. You will work alongside senior engineers to build responsive, accessible UI components.";
        responsibilities = "Build and maintain React components. Write unit and integration tests using Jest and React Testing Library. Participate in daily standups and sprint planning.";
        qualifications = "0-2 years of frontend development experience. Knowledge of HTML, CSS, JavaScript, and React. Eagerness to learn and grow in a supportive team.";
        companyId = 103;
        companyName = "SkyApps Pvt Ltd";
        companyLogo = null;
        location = "Pune, India";
        jobType = #fullTime;
        salaryMin = ?500_000;
        salaryMax = ?900_000;
        experienceLevel = #entry;
        industry = "Information Technology";
        category = "it-technology";
        isFeatured = false;
        isSample = true;
        status = #active;
        postedAt = daysAgo(10);
        tags = ["React", "JavaScript", "CSS", "Jest"];
      },
      // 4 – IT/Technology (remote)
      {
        id = 4;
        title = "Data Scientist – NLP";
        description = "We are building AI-powered search and recommendation features and need a data scientist with strong NLP expertise. This is a remote engagement with potential for full-time conversion.";
        responsibilities = "Train and evaluate language models for text classification and entity extraction. Build data pipelines using PySpark. Present findings and insights to senior stakeholders.";
        qualifications = "Strong Python skills. Experience with Hugging Face Transformers or spaCy. Comfortable with large datasets and SQL.";
        companyId = 104;
        companyName = "AlphaML";
        companyLogo = ?"https://placehold.co/80x80?text=AML";
        location = "Remote";
        jobType = #remote;
        salaryMin = ?2_000_000;
        salaryMax = ?3_200_000;
        experienceLevel = #mid;
        industry = "Information Technology";
        category = "it-technology";
        isFeatured = false;
        isSample = true;
        status = #active;
        postedAt = daysAgo(7);
        tags = ["Python", "NLP", "Hugging Face", "PySpark"];
      },
      // 5 – Finance
      {
        id = 5;
        title = "Chartered Accountant – Taxation";
        description = "Leading CA firm is hiring a qualified Chartered Accountant to handle direct and indirect taxation for a diverse portfolio of corporate clients.";
        responsibilities = "Prepare and file income-tax and GST returns. Liaise with tax authorities and respond to notices. Conduct tax audits and due-diligence reviews. Advise clients on tax planning strategies.";
        qualifications = "CA qualification (ICAI). 3+ years post-qualification experience in taxation. Strong knowledge of Income Tax Act and GST laws. Proficiency in Tally ERP.";
        companyId = 201;
        companyName = "Mehta and Associates";
        companyLogo = ?"https://placehold.co/80x80?text=MA";
        location = "Mumbai, India";
        jobType = #fullTime;
        salaryMin = ?1_200_000;
        salaryMax = ?2_000_000;
        experienceLevel = #mid;
        industry = "Finance";
        category = "finance";
        isFeatured = true;
        isSample = true;
        status = #active;
        postedAt = daysAgo(3);
        tags = ["Taxation", "GST", "CA", "Tally"];
      },
      // 6 – Finance
      {
        id = 6;
        title = "Investment Banking Analyst";
        description = "Top-tier investment bank is seeking a detail-oriented analyst to support M&A transactions and equity capital markets deals.";
        responsibilities = "Build detailed financial models (DCF, LBO, comparable companies). Prepare client presentations and pitch books. Conduct industry and company research.";
        qualifications = "MBA Finance or CA. 1-3 years of investment banking or corporate finance experience. Advanced Excel and PowerPoint skills. Strong analytical mindset.";
        companyId = 202;
        companyName = "Apex Capital Partners";
        companyLogo = ?"https://placehold.co/80x80?text=ACP";
        location = "Mumbai, India";
        jobType = #fullTime;
        salaryMin = ?2_000_000;
        salaryMax = ?3_500_000;
        experienceLevel = #mid;
        industry = "Finance";
        category = "finance";
        isFeatured = false;
        isSample = true;
        status = #active;
        postedAt = daysAgo(8);
        tags = ["M&A", "Financial Modeling", "DCF", "Investment Banking"];
      },
      // 7 – Marketing
      {
        id = 7;
        title = "Performance Marketing Manager";
        description = "Drive growth for our D2C e-commerce brand through paid digital channels. You will own the P&L of performance marketing budgets and build a high-performing team.";
        responsibilities = "Manage Google Ads, Meta Ads, and affiliate campaigns. Optimise ROAS across channels. Build audience segments and run A/B tests. Report weekly KPIs to leadership.";
        qualifications = "5+ years in performance marketing. Deep expertise in Google and Meta ads platforms. Experience managing budgets above 1 Cr/month. Strong analytical skills.";
        companyId = 301;
        companyName = "GlowCart";
        companyLogo = ?"https://placehold.co/80x80?text=GC";
        location = "Delhi, India";
        jobType = #fullTime;
        salaryMin = ?1_500_000;
        salaryMax = ?2_500_000;
        experienceLevel = #senior;
        industry = "Marketing";
        category = "marketing";
        isFeatured = true;
        isSample = true;
        status = #active;
        postedAt = daysAgo(1);
        tags = ["Google Ads", "Meta Ads", "ROAS", "D2C"];
      },
      // 8 – Healthcare
      {
        id = 8;
        title = "Staff Nurse – ICU";
        description = "Reputed multi-speciality hospital is hiring experienced ICU nurses to provide critical patient care in a state-of-the-art facility.";
        responsibilities = "Monitor and assess patients in intensive care. Administer medications and treatments as prescribed. Coordinate with physicians and allied health professionals. Maintain accurate patient records.";
        qualifications = "B.Sc Nursing or GNM. 2+ years of ICU nursing experience. Valid nursing council registration. BLS/ACLS certification preferred.";
        companyId = 401;
        companyName = "Apollo Healthcare Group";
        companyLogo = ?"https://placehold.co/80x80?text=AH";
        location = "Chennai, India";
        jobType = #fullTime;
        salaryMin = ?480_000;
        salaryMax = ?720_000;
        experienceLevel = #mid;
        industry = "Healthcare";
        category = "healthcare";
        isFeatured = false;
        isSample = true;
        status = #active;
        postedAt = daysAgo(4);
        tags = ["ICU", "Critical Care", "BLS", "Nursing"];
      },
      // 9 – Healthcare
      {
        id = 9;
        title = "Clinical Data Manager";
        description = "Pharmaceutical company is hiring a Clinical Data Manager to oversee the collection, validation, and management of clinical trial data.";
        responsibilities = "Design and validate clinical databases (EDC systems). Write data management plans and data cleaning guidelines. Ensure regulatory compliance (ICH E6 GCP). Collaborate with biostatistics teams.";
        qualifications = "Life-sciences degree plus 4 years clinical data management experience. Proficiency with Medidata Rave or Oracle Clinical. Strong knowledge of CDISC standards.";
        companyId = 402;
        companyName = "Zydus Research";
        companyLogo = ?"https://placehold.co/80x80?text=ZR";
        location = "Ahmedabad, India";
        jobType = #fullTime;
        salaryMin = ?1_000_000;
        salaryMax = ?1_600_000;
        experienceLevel = #mid;
        industry = "Healthcare";
        category = "healthcare";
        isFeatured = false;
        isSample = true;
        status = #active;
        postedAt = daysAgo(12);
        tags = ["Clinical Trials", "CDISC", "GCP", "Medidata"];
      },
      // 10 – Education
      {
        id = 10;
        title = "Senior Math Teacher – CBSE";
        description = "Leading K-12 school is looking for a passionate mathematics teacher to inspire senior secondary students and deliver outstanding board exam results.";
        responsibilities = "Teach Mathematics for Classes 11 and 12 (CBSE). Design lesson plans and assessments. Provide individual mentoring and remedial sessions. Collaborate with the academic team on curriculum improvements.";
        qualifications = "M.Sc Mathematics plus B.Ed. 5+ years of teaching experience at the senior secondary level. Strong track record of board results. Excellent communication skills.";
        companyId = 501;
        companyName = "Delhi Public School Noida";
        companyLogo = ?"https://placehold.co/80x80?text=DPS";
        location = "Noida, India";
        jobType = #fullTime;
        salaryMin = ?600_000;
        salaryMax = ?900_000;
        experienceLevel = #senior;
        industry = "Education";
        category = "education";
        isFeatured = false;
        isSample = true;
        status = #active;
        postedAt = daysAgo(9);
        tags = ["Mathematics", "CBSE", "Teaching", "Curriculum"];
      },
      // 11 – HR
      {
        id = 11;
        title = "HR Business Partner";
        description = "Fast-growing tech startup is looking for an experienced HRBP to partner with business leaders across engineering, sales, and operations.";
        responsibilities = "Drive talent acquisition and onboarding processes. Manage performance review cycles. Handle employee relations and grievance redressal. Design and implement people policies.";
        qualifications = "MBA HR or equivalent. 6+ years of HR business partnering experience. Experience in a high-growth startup is preferred. Strong interpersonal and stakeholder management skills.";
        companyId = 601;
        companyName = "Juno Tech";
        companyLogo = ?"https://placehold.co/80x80?text=JT";
        location = "Bengaluru, India";
        jobType = #fullTime;
        salaryMin = ?1_400_000;
        salaryMax = ?2_200_000;
        experienceLevel = #senior;
        industry = "HR";
        category = "hr-recruitment";
        isFeatured = false;
        isSample = true;
        status = #active;
        postedAt = daysAgo(6);
        tags = ["HRBP", "Talent Acquisition", "Performance Management", "People Ops"];
      },
      // 12 – Sales
      {
        id = 12;
        title = "Enterprise Sales Manager";
        description = "B2B SaaS company seeks a hunter-profile sales manager to drive new logo acquisition across large enterprises in BFSI and manufacturing verticals.";
        responsibilities = "Prospect, qualify, and close enterprise deals. Manage a portfolio of named accounts. Collaborate with pre-sales and solutions teams. Forecast revenue accurately in Salesforce.";
        qualifications = "7+ years of B2B enterprise sales experience. Proven track record of exceeding 5 Cr+ annual quota. Experience selling SaaS solutions to C-suite buyers.";
        companyId = 701;
        companyName = "Vantara SaaS";
        companyLogo = ?"https://placehold.co/80x80?text=VS";
        location = "Mumbai, India";
        jobType = #fullTime;
        salaryMin = ?2_000_000;
        salaryMax = ?4_000_000;
        experienceLevel = #senior;
        industry = "Sales";
        category = "sales";
        isFeatured = true;
        isSample = true;
        status = #active;
        postedAt = daysAgo(3);
        tags = ["Enterprise Sales", "SaaS", "B2B", "Salesforce"];
      },
      // 13 – Design
      {
        id = 13;
        title = "Product Designer – Mobile";
        description = "We are a consumer fintech app with 10M+ users. Join us to craft delightful, accessible mobile experiences that simplify personal finance for everyday Indians.";
        responsibilities = "Lead end-to-end design for key app features. Create user flows, wireframes, and high-fidelity prototypes in Figma. Conduct usability studies and synthesise insights. Collaborate closely with engineering.";
        qualifications = "4+ years of product/UX design experience. Strong portfolio of mobile app design. Expert-level Figma skills. Passion for accessibility and inclusive design.";
        companyId = 801;
        companyName = "PaisaGo";
        companyLogo = ?"https://placehold.co/80x80?text=PG";
        location = "Bengaluru, India";
        jobType = #fullTime;
        salaryMin = ?1_600_000;
        salaryMax = ?2_800_000;
        experienceLevel = #mid;
        industry = "Design";
        category = "design";
        isFeatured = false;
        isSample = true;
        status = #active;
        postedAt = daysAgo(2);
        tags = ["Figma", "UX", "Mobile Design", "Prototyping"];
      },
      // 14 – Customer Support
      {
        id = 14;
        title = "Customer Success Specialist";
        description = "Join our CX team to help SMB clients onboard onto our platform, resolve issues, and grow their usage. This is a fully remote, part-time role.";
        responsibilities = "Handle inbound chat and email support tickets. Guide new customers through product onboarding. Identify upsell opportunities and escalate to account managers. Maintain a CSAT score above 90%.";
        qualifications = "1-3 years in customer support or success. Excellent written and verbal communication. Empathetic and patient approach to problem-solving. Experience with Zendesk or Freshdesk is a plus.";
        companyId = 901;
        companyName = "Orbis Commerce";
        companyLogo = ?"https://placehold.co/80x80?text=OC";
        location = "Remote";
        jobType = #partTime;
        salaryMin = ?300_000;
        salaryMax = ?500_000;
        experienceLevel = #entry;
        industry = "Customer Support";
        category = "customer-support";
        isFeatured = false;
        isSample = true;
        status = #active;
        postedAt = daysAgo(11);
        tags = ["Customer Success", "Zendesk", "Onboarding", "Remote"];
      },
      // 15 – Engineering
      {
        id = 15;
        title = "Mechanical Engineer – R&D";
        description = "Tier-1 auto-components manufacturer invites applications for a mechanical engineer to work in our R&D centre on next-generation EV components.";
        responsibilities = "Design and prototype EV powertrain components using CAD/CAM. Conduct FEA and CFD simulations. Collaborate with materials and manufacturing teams. Prepare technical documentation.";
        qualifications = "B.E./B.Tech Mechanical Engineering. 3-6 years of automotive R&D experience. Proficiency in CATIA V5/SolidWorks. Knowledge of GD&T standards. Exposure to EV platforms preferred.";
        companyId = 1001;
        companyName = "Bharat Auto Components";
        companyLogo = ?"https://placehold.co/80x80?text=BAC";
        location = "Pune, India";
        jobType = #fullTime;
        salaryMin = ?1_000_000;
        salaryMax = ?1_800_000;
        experienceLevel = #mid;
        industry = "Engineering";
        category = "engineering";
        isFeatured = false;
        isSample = true;
        status = #active;
        postedAt = daysAgo(14);
        tags = ["Mechanical Engineering", "CAD", "FEA", "EV"];
      },
    ];
  };

  // ─── categories with live job counts ──────────────────────────

  public func categoriesWithCounts(
    rawCats : [Types.JobCategory],
    jobs : Map.Map<Nat, Types.Job>,
  ) : [Types.JobCategory] {
    rawCats.map<Types.JobCategory, Types.JobCategory>(
      func(cat) {
        let count = jobs.values().filter(
            func(j : Types.Job) : Bool {
              j.category == cat.slug and j.status == #active
            },
          ).size();
        { cat with jobCount = count };
      },
    );
  };

  // ─── text search helper ────────────────────────────────────────

  func textContains(haystack : Text, needle : Text) : Bool {
    let h = haystack.toLower();
    let n = needle.toLower();
    h.contains(#text n);
  };

  func jobMatchesFilter(job : Types.Job, filter : Common.SearchFilter) : Bool {
    if (job.status != #active) return false;

    // keyword
    switch (filter.keyword) {
      case (?kw) {
        if (
          not textContains(job.title, kw) and
          not textContains(job.description, kw) and
          not textContains(job.companyName, kw)
        ) return false;
      };
      case null {};
    };

    // location
    switch (filter.location) {
      case (?loc) {
        if (not textContains(job.location, loc)) return false;
      };
      case null {};
    };

    // job type
    switch (filter.jobType) {
      case (?jt) { if (job.jobType != jt) return false };
      case null {};
    };

    // experience level
    switch (filter.experienceLevel) {
      case (?el) { if (job.experienceLevel != el) return false };
      case null {};
    };

    // salary range
    switch (filter.salaryMin) {
      case (?sMin) {
        switch (job.salaryMax) {
          case (?jMax) { if (jMax < sMin) return false };
          case null {};
        };
      };
      case null {};
    };
    switch (filter.salaryMax) {
      case (?sMax) {
        switch (job.salaryMin) {
          case (?jMin) { if (jMin > sMax) return false };
          case null {};
        };
      };
      case null {};
    };

    // industries
    if (filter.industries.size() > 0) {
      var matched = false;
      for (ind in filter.industries.values()) {
        if (textContains(job.industry, ind)) matched := true;
      };
      if (not matched) return false;
    };

    true;
  };

  func compareJobs(sortBy : Common.SortBy) : (Types.Job, Types.Job) -> { #less; #equal; #greater } {
    switch (sortBy) {
      case (#newest) {
        func(a, b) { Int.compare(b.postedAt, a.postedAt) };
      };
      case (#salaryHigh) {
        func(a, b) {
          let aMax = switch (a.salaryMax) { case (?v) v; case null 0 };
          let bMax = switch (b.salaryMax) { case (?v) v; case null 0 };
          Nat.compare(bMax, aMax);
        };
      };
      case (#salaryLow) {
        func(a, b) {
          let aMin = switch (a.salaryMin) { case (?v) v; case null 0 };
          let bMin = switch (b.salaryMin) { case (?v) v; case null 0 };
          Nat.compare(aMin, bMin);
        };
      };
    };
  };

  // ─── public query functions ────────────────────────────────────

  public func searchJobs(
    jobs : Map.Map<Nat, Types.Job>,
    filter : Common.SearchFilter,
    pagination : Common.Pagination,
  ) : Common.PageResult<Types.Job> {
    let sortBy = switch (filter.sortBy) { case (?s) s; case null #newest };
    let cmp = compareJobs(sortBy);
    let matched =
      jobs.values().filter(func(j : Types.Job) : Bool { jobMatchesFilter(j, filter) })
      |> _.sort(cmp)
      |> _.toArray();
    let total = matched.size();
    let offset = pagination.offset;
    let limit = pagination.limit;
    let from : Int = offset;
    let to : Int = offset + limit;
    let page = matched.sliceToArray(from, to);
    {
      items = page;
      pagination = { offset; limit; total };
    };
  };

  public func getJob(
    jobs : Map.Map<Nat, Types.Job>,
    id : Nat,
  ) : ?Types.Job {
    jobs.get(id);
  };

  public func getFeaturedJobs(jobs : Map.Map<Nat, Types.Job>) : [Types.Job] {
    jobs.values().filter(func(j : Types.Job) : Bool { j.isFeatured and j.status == #active })
    |> _.sort(func(a : Types.Job, b : Types.Job) : { #less; #equal; #greater } { Int.compare(b.postedAt, a.postedAt) })
    |> _.take(6)
    |> _.toArray();
  };

  public func getRecentJobs(jobs : Map.Map<Nat, Types.Job>, limit : Nat) : [Types.Job] {
    jobs.values().filter(func(j : Types.Job) : Bool { j.status == #active })
    |> _.sort(func(a : Types.Job, b : Types.Job) : { #less; #equal; #greater } { Int.compare(b.postedAt, a.postedAt) })
    |> _.take(limit)
    |> _.toArray();
  };

  public func getJobsByCategory(
    jobs : Map.Map<Nat, Types.Job>,
    categorySlug : Text,
  ) : [Types.Job] {
    jobs.values().filter(func(j : Types.Job) : Bool { j.category == categorySlug and j.status == #active })
    |> _.sort(func(a : Types.Job, b : Types.Job) : { #less; #equal; #greater } { Int.compare(b.postedAt, a.postedAt) })
    |> _.toArray();
  };

  public func getSimilarJobs(
    jobs : Map.Map<Nat, Types.Job>,
    jobId : Nat,
    limit : Nat,
  ) : [Types.Job] {
    switch (jobs.get(jobId)) {
      case null { [] };
      case (?target) {
        jobs.values().filter(
          func(j : Types.Job) : Bool {
            j.id != jobId and j.status == #active and
            (j.category == target.category or j.industry == target.industry)
          },
        )
        |> _.sort(func(a : Types.Job, b : Types.Job) : { #less; #equal; #greater } { Int.compare(b.postedAt, a.postedAt) })
        |> _.take(limit)
        |> _.toArray();
      };
    };
  };

  // ─── seed loader (idempotent) ──────────────────────────────────

  public func seedIfEmpty(
    jobs : Map.Map<Nat, Types.Job>,
    categories : Map.Map<Nat, Types.JobCategory>,
    nextJobId : Nat,
  ) : Nat {
    if (not jobs.isEmpty()) return nextJobId;

    let rawCats = buildCategories();
    for (cat in rawCats.values()) {
      categories.add(cat.id, cat);
    };

    let sampleJobs = buildSampleJobs();
    var maxId = nextJobId;
    for (job in sampleJobs.values()) {
      jobs.add(job.id, job);
      if (job.id >= maxId) maxId := job.id + 1;
    };

    // Update categories with live job counts
    let updatedCats = categoriesWithCounts(rawCats, jobs);
    for (cat in updatedCats.values()) {
      categories.add(cat.id, cat);
    };

    maxId;
  };
};
