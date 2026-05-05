import { CategoryCard } from "@/components/CategoryCard";
import { JobCard } from "@/components/JobCard";
import {
  CategoryListSkeleton,
  JobListSkeleton,
} from "@/components/LoadingSkeleton";
import { SearchBar } from "@/components/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCategories, useFeaturedJobs, useRecentJobs } from "@/hooks/useJobs";
import { createRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardList,
  Search,
  Shield,
  TrendingUp,
  UserCircle,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { Route as rootRoute } from "./__root";

const STATS = [
  { label: "Active Jobs", value: "50,000+", icon: Briefcase },
  { label: "Companies Hiring", value: "10,000+", icon: Building2 },
  { label: "Job Seekers", value: "1M+", icon: Users },
  { label: "Placements Made", value: "500k+", icon: CheckCircle2 },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Search,
    title: "Search Jobs",
    desc: "Browse thousands of verified job listings by keyword, location, category, or experience level.",
    color: "bg-primary/10 text-primary",
  },
  {
    step: "02",
    icon: UserCircle,
    title: "Create Your Profile",
    desc: "Build a professional profile, upload your resume, and set your job preferences to attract top employers.",
    color: "bg-accent/10 text-accent",
  },
  {
    step: "03",
    icon: ClipboardList,
    title: "Apply in One Click",
    desc: "Apply instantly to any job with your saved profile. Track all your applications in your dashboard.",
    color: "bg-secondary/20 text-secondary-foreground",
  },
];

const WHY_US = [
  {
    icon: TrendingUp,
    title: "Smart Job Matching",
    desc: "AI-powered matching connects you with roles that fit your skills and preferences perfectly.",
  },
  {
    icon: Shield,
    title: "Verified Employers",
    desc: "Every company is verified to ensure legitimate job postings and a transparent hiring process.",
  },
  {
    icon: Zap,
    title: "One-Click Apply",
    desc: "Apply to multiple jobs instantly using your saved profile and resume — no repetitive forms.",
  },
];

const POPULAR_SEARCHES = [
  "React Developer",
  "Product Manager",
  "Data Analyst",
  "UX Designer",
];

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.40 0.20 260) 0%, oklch(0.52 0.18 260) 50%, oklch(0.58 0.16 240) 100%)",
      }}
      data-ocid="home.hero_section"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-1/2 -left-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-white/5" />
        {/* Grid pattern overlay */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full opacity-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Badge className="bg-white/20 text-white border-white/30 text-xs font-medium mb-5 px-3 py-1">
            🚀 Over 50,000 active opportunities
          </Badge>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5">
            Find Your Dream Job
            <br />
            <span className="text-white/75">With Confidence</span>
          </h1>
          <p className="text-white/70 text-base sm:text-xl max-w-2xl mx-auto mb-8">
            Connect with top employers, discover thousands of verified
            opportunities, and take the next step in your career — all in one
            place.
          </p>

          {/* Search bar */}
          <div className="max-w-3xl mx-auto">
            <SearchBar variant="hero" />
          </div>

          {/* Popular searches */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            <span className="text-white/60 text-sm">Popular:</span>
            {POPULAR_SEARCHES.map((term) => (
              <Link
                key={term}
                to="/jobs"
                search={{ keyword: term }}
                className="text-sm text-white/80 hover:text-white underline underline-offset-2 transition-colors"
                data-ocid={`home.popular_search_${term.toLowerCase().replace(/ /g, "_")}`}
              >
                {term}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatsBanner() {
  return (
    <section
      className="bg-card border-b border-border shadow-sm"
      data-ocid="home.stats_section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map(({ label, value, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-display font-bold text-xl sm:text-2xl text-foreground leading-none">
                  {value}
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">
                  {label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  const { data: categories, isLoading } = useCategories();

  return (
    <section
      className="bg-muted/30 py-12 sm:py-16"
      data-ocid="home.categories_section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
              Browse by Category
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Explore jobs across every industry
            </p>
          </div>
          <Link to="/jobs" search={{}} data-ocid="home.all_categories_link">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <CategoryListSkeleton count={10} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {(categories ?? []).map((cat, i) => (
              <motion.div
                key={cat.id.toString()}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <CategoryCard category={cat} index={i + 1} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedJobsSection() {
  const { data: jobs, isLoading } = useFeaturedJobs();

  return (
    <section
      className="bg-background py-12 sm:py-16"
      data-ocid="home.featured_jobs_section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
              Featured Jobs
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Handpicked opportunities from top companies
            </p>
          </div>
          <Link
            to="/jobs"
            search={{ featured: "true" }}
            data-ocid="home.all_featured_link"
          >
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <JobListSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(jobs ?? []).slice(0, 6).map((job, i) => (
              <motion.div
                key={job.id.toString()}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <JobCard job={job} index={i + 1} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link to="/jobs" search={{}} data-ocid="home.browse_all_jobs_link">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 font-semibold">
              Browse All Jobs <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function RecentJobsSection() {
  const { data: jobs, isLoading } = useRecentJobs(6);

  return (
    <section
      className="bg-muted/30 py-12 sm:py-16"
      data-ocid="home.recent_jobs_section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
              Latest Jobs
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Freshly posted opportunities — updated daily
            </p>
          </div>
          <Link to="/jobs" search={{}} data-ocid="home.all_recent_link">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <JobListSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(jobs ?? []).map((job, i) => (
              <motion.div
                key={job.id.toString()}
                initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <JobCard job={job} index={i + 1} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section
      className="bg-background py-12 sm:py-16"
      data-ocid="home.how_it_works_section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
            How It Works
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-md mx-auto">
            Get hired in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden sm:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-border z-0" />

          {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 ${color} relative`}
              >
                <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-bold font-display flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section
      className="bg-muted/30 py-12 sm:py-16"
      data-ocid="home.features_section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
            Why Choose JobFlow?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-md mx-auto">
            Built for modern job seekers and employers who value simplicity,
            speed, and transparency.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {WHY_US.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-md hover:border-primary/30 transition-all duration-200"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.40 0.20 260) 0%, oklch(0.52 0.18 260) 60%, oklch(0.56 0.16 240) 100%)",
      }}
      data-ocid="home.cta_section"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-white/5" />
      </div>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          {/* Job Seeker CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center sm:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-3 py-1 text-white/90 text-xs font-medium mb-4">
              <Users className="w-3.5 h-3.5" /> For Job Seekers
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
              Ready to Find Your Next Role?
            </h2>
            <p className="text-white/70 text-sm sm:text-base mb-6">
              Join over 1 million professionals who found their dream jobs
              through JobFlow.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/register" data-ocid="home.cta_register_button">
                <Button className="bg-white text-primary hover:bg-white/90 font-semibold w-full sm:w-auto">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/jobs" search={{}} data-ocid="home.cta_browse_button">
                <Button
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 font-semibold w-full sm:w-auto"
                >
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Employer CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center sm:text-left backdrop-blur-sm"
          >
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-3 py-1 text-white/90 text-xs font-medium mb-4">
              <Building2 className="w-3.5 h-3.5" /> For Employers
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-2">
              Hire Top Talent Fast
            </h3>
            <p className="text-white/70 text-sm mb-5">
              Post a job and reach thousands of qualified candidates within
              hours.
            </p>
            <Link to="/register" data-ocid="home.cta_employer_button">
              <Button className="bg-white text-primary hover:bg-white/90 font-semibold">
                Post a Job <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

export default function HomePage() {
  return (
    <div data-ocid="home.page">
      <HeroSection />
      <StatsBanner />
      <CategoriesSection />
      <FeaturedJobsSection />
      <RecentJobsSection />
      <HowItWorksSection />
      <WhyUsSection />
      <CTASection />
    </div>
  );
}
