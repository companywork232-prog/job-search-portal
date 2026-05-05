import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, createRoute, useNavigate } from "@tanstack/react-router";
import { Briefcase, Shield, Zap } from "lucide-react";
import { useEffect } from "react";
import { Route as rootRoute } from "./__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

export default function LoginPage() {
  const { isAuthenticated, login, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background px-4 py-16"
      data-ocid="login.page"
    >
      <div className="max-w-md w-full">
        {/* Logo & Heading */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Briefcase className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground mb-2">
            Sign in to your account
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Use Internet Identity — a secure, passwordless way to sign in. No
            personal data is shared during authentication.
          </p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-5">
          {/* Feature bullets */}
          <div className="space-y-3">
            {[
              {
                icon: <Shield className="w-4 h-4" />,
                text: "Secure, decentralized authentication",
              },
              {
                icon: <Zap className="w-4 h-4" />,
                text: "No passwords to remember",
              },
              {
                icon: <Briefcase className="w-4 h-4" />,
                text: "Apply to jobs instantly after sign-in",
              },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <span className="text-primary shrink-0">{icon}</span>
                {text}
              </div>
            ))}
          </div>

          <Button
            onClick={login}
            disabled={isInitializing || isLoggingIn}
            className="w-full font-semibold h-11"
            data-ocid="login.submit_button"
          >
            {isInitializing
              ? "Loading..."
              : isLoggingIn
                ? "Signing in..."
                : "Login with Internet Identity"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            New to JobFlow?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
              data-ocid="login.register_link"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Trust note */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing in you agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
}
