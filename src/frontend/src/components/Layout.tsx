import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Briefcase,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Footer } from "./Footer";

const NAV_LINKS = [
  { label: "Home", to: "/" as const },
  { label: "Browse Jobs", to: "/jobs" as const },
];

function AuthButtons() {
  const { isAuthenticated, login, clear, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const qc = useQueryClient();

  const handleLogout = () => {
    clear();
    qc.clear();
  };

  if (isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5"
            data-ocid="nav.user_menu"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:block">My Account</span>
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link
              to="/dashboard"
              className="flex items-center gap-2"
              data-ocid="nav.dashboard_link"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to="/profile"
              className="flex items-center gap-2"
              data-ocid="nav.profile_link"
            >
              <User className="w-4 h-4" />
              My Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-destructive focus:text-destructive flex items-center gap-2"
            data-ocid="nav.logout_button"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={login}
        disabled={isInitializing || isLoggingIn}
        data-ocid="nav.login_button"
      >
        {isInitializing ? "Loading…" : isLoggingIn ? "Signing in…" : "Sign In"}
      </Button>
      <Button
        size="sm"
        onClick={login}
        disabled={isInitializing || isLoggingIn}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
        data-ocid="nav.register_button"
      >
        Get Started
      </Button>
    </div>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border header-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 shrink-0"
              data-ocid="nav.logo_link"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                JobFlow
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPath === to
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  data-ocid={`nav.${label.toLowerCase().replace(/ /g, "_")}_link`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex">
              <AuthButtons />
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              data-ocid="nav.mobile_menu_button"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentPath === to
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  onClick={() => setMobileOpen(false)}
                  data-ocid={`nav.mobile_${label.toLowerCase().replace(/ /g, "_")}_link`}
                >
                  {label}
                </Link>
              ))}
              <MobileAuthButtons onClose={() => setMobileOpen(false)} />
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}

function MobileAuthButtons({ onClose }: { onClose: () => void }) {
  const { isAuthenticated, login, clear, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const qc = useQueryClient();

  if (isAuthenticated) {
    return (
      <>
        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          onClick={onClose}
          data-ocid="nav.mobile_dashboard_link"
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
        <Link
          to="/profile"
          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          onClick={onClose}
          data-ocid="nav.mobile_profile_link"
        >
          <User className="w-4 h-4" />
          My Profile
        </Link>
        <button
          type="button"
          onClick={() => {
            clear();
            qc.clear();
            onClose();
          }}
          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full text-left"
          data-ocid="nav.mobile_logout_button"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </>
    );
  }

  return (
    <div className="pt-2 flex flex-col gap-2">
      <Button
        variant="outline"
        className="w-full justify-center"
        onClick={() => {
          login();
          onClose();
        }}
        disabled={isInitializing || isLoggingIn}
        data-ocid="nav.mobile_login_button"
      >
        Sign In
      </Button>
      <Button
        className="w-full justify-center bg-primary hover:bg-primary/90 text-primary-foreground"
        onClick={() => {
          login();
          onClose();
        }}
        disabled={isInitializing || isLoggingIn}
        data-ocid="nav.mobile_register_button"
      >
        Get Started
      </Button>
    </div>
  );
}
