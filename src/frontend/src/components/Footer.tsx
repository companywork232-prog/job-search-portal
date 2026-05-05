import { Link } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                JobFlow
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Find your dream job or hire top talent. Connecting professionals
              with opportunities.
            </p>
          </div>

          {/* Job Seekers */}
          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-4 uppercase tracking-wide">
              For Job Seekers
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Browse Jobs", to: "/jobs" as const },
                { label: "My Dashboard", to: "/dashboard" as const },
                { label: "My Profile", to: "/profile" as const },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-4 uppercase tracking-wide">
              Company
            </h4>
            <ul className="space-y-2">
              {[
                "About Us",
                "Help Center",
                "Privacy Policy",
                "Terms of Service",
              ].map((label) => (
                <li key={label}>
                  <span className="text-sm text-muted-foreground">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-4 uppercase tracking-wide">
              Top Categories
            </h4>
            <ul className="space-y-2">
              {[
                "Technology",
                "Finance",
                "Healthcare",
                "Marketing",
                "Education",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/jobs"
                    search={{ category: cat.toLowerCase() }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-muted-foreground">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
