import type { UpdateJobSeekerInput } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateOrUpdateProfile } from "@/hooks/useUser";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, createRoute, useNavigate } from "@tanstack/react-router";
import {
  Briefcase,
  CheckCircle2,
  ChevronRight,
  MapPin,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Route as rootRoute } from "./__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const INDUSTRIES = [
  "Information Technology",
  "Finance & Banking",
  "Marketing & Advertising",
  "Healthcare & Medical",
  "Education & Training",
  "Engineering",
  "Sales & Business Development",
  "Design & Creative",
  "Operations & Logistics",
  "Human Resources",
];

const STEPS = [
  { id: 1, label: "Personal Info", icon: <User className="w-4 h-4" /> },
  {
    id: 2,
    label: "Professional Info",
    icon: <Briefcase className="w-4 h-4" />,
  },
  { id: 3, label: "Preferences", icon: <MapPin className="w-4 h-4" /> },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  bio: string;
  experienceLevel: string;
  preferredIndustries: string[];
  desiredSalaryMin: string;
  desiredSalaryMax: string;
}

export default function RegisterPage() {
  const { isAuthenticated, login, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const navigate = useNavigate();
  const createProfile = useCreateOrUpdateProfile();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    location: "",
    headline: "",
    bio: "",
    experienceLevel: "",
    preferredIndustries: [],
    desiredSalaryMin: "",
    desiredSalaryMax: "",
  });

  useEffect(() => {
    if (isAuthenticated && createProfile.isSuccess) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, createProfile.isSuccess, navigate]);

  const set = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleIndustry = (industry: string) => {
    setForm((f) => ({
      ...f,
      preferredIndustries: f.preferredIndustries.includes(industry)
        ? f.preferredIndustries.filter((i) => i !== industry)
        : [...f.preferredIndustries, industry],
    }));
  };

  const validateStep1 = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    setStep((s) => Math.min(s + 1, 3));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    if (!validateStep1()) {
      setStep(1);
      return;
    }
    const input: UpdateJobSeekerInput = {
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      location: form.location || undefined,
      headline: form.headline || undefined,
      bio: form.bio || undefined,
      experienceLevel: (form.experienceLevel ||
        undefined) as UpdateJobSeekerInput["experienceLevel"],
      preferredIndustries: form.preferredIndustries,
      desiredSalaryMin: form.desiredSalaryMin
        ? BigInt(form.desiredSalaryMin)
        : undefined,
      desiredSalaryMax: form.desiredSalaryMax
        ? BigInt(form.desiredSalaryMax)
        : undefined,
      resumeName: undefined,
      resumeUrl: undefined,
      workExperience: [],
    };
    createProfile.mutate(input, {
      onSuccess: () => {
        toast.success("Profile created! Welcome to JobFlow.");
        navigate({ to: "/dashboard" });
      },
      onError: (e) => toast.error(e.message),
    });
  };

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-background px-4 py-16"
        data-ocid="register.page"
      >
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Briefcase className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground mb-2">
              Join JobFlow
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Sign in with Internet Identity to create your profile and start
              your job search journey.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
            <Button
              onClick={login}
              disabled={isInitializing || isLoggingIn}
              className="w-full font-semibold h-11"
              data-ocid="register.submit_button"
            >
              {isInitializing
                ? "Loading..."
                : isLoggingIn
                  ? "Signing in..."
                  : "Get Started with Internet Identity"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
                data-ocid="register.login_link"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-background py-8 px-4"
      data-ocid="register.page"
    >
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-2xl text-foreground mb-1">
            Complete Your Profile
          </h1>
          <p className="text-muted-foreground text-sm">
            Help employers find you by filling out your profile details.
          </p>
        </div>

        {/* Step indicator */}
        <div
          className="flex items-center justify-center gap-2 mb-8"
          data-ocid="register.stepper"
        >
          {STEPS.map((s, idx) => (
            <div key={s.id} className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  if (s.id < step) setStep(s.id);
                }}
                className={[
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  step === s.id
                    ? "bg-primary text-primary-foreground"
                    : step > s.id
                      ? "bg-accent/20 text-accent cursor-pointer hover:bg-accent/30"
                      : "bg-muted text-muted-foreground cursor-not-allowed",
                ].join(" ")}
                data-ocid={`register.step_${s.id}_button`}
              >
                {step > s.id ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  s.icon
                )}
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{s.id}</span>
              </button>
              {idx < STEPS.length - 1 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div
            className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-5"
            data-ocid="register.step1.panel"
          >
            <h2 className="font-display font-semibold text-lg text-foreground">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="reg-name">Full Name *</Label>
                <Input
                  id="reg-name"
                  value={form.name}
                  onChange={(e) => {
                    set("name", e.target.value);
                    if (errors.name)
                      setErrors((er) => ({ ...er, name: undefined }));
                  }}
                  placeholder="Jane Doe"
                  data-ocid="register.name_input"
                />
                {errors.name && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="register.name.field_error"
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="reg-email">Email *</Label>
                <Input
                  id="reg-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => {
                    set("email", e.target.value);
                    if (errors.email)
                      setErrors((er) => ({ ...er, email: undefined }));
                  }}
                  placeholder="jane@example.com"
                  data-ocid="register.email_input"
                />
                {errors.email && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="register.email.field_error"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="reg-phone">Phone</Label>
                <Input
                  id="reg-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  data-ocid="register.phone_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="reg-location">Location</Label>
                <Input
                  id="reg-location"
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  placeholder="San Francisco, CA"
                  data-ocid="register.location_input"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button
                type="button"
                onClick={nextStep}
                className="font-semibold"
                data-ocid="register.next_button"
              >
                Next: Professional Info
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Professional Info */}
        {step === 2 && (
          <div
            className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-5"
            data-ocid="register.step2.panel"
          >
            <h2 className="font-display font-semibold text-lg text-foreground">
              Professional Information
            </h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="reg-headline">Professional Headline</Label>
                <Input
                  id="reg-headline"
                  value={form.headline}
                  onChange={(e) => set("headline", e.target.value)}
                  placeholder="Senior Software Engineer at Acme Corp"
                  data-ocid="register.headline_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="reg-bio">Bio</Label>
                <Textarea
                  id="reg-bio"
                  value={form.bio}
                  onChange={(e) => set("bio", e.target.value)}
                  placeholder="Tell employers about your skills and experience..."
                  rows={3}
                  data-ocid="register.bio_textarea"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Experience Level</Label>
                <Select
                  value={form.experienceLevel}
                  onValueChange={(v) => set("experienceLevel", v)}
                >
                  <SelectTrigger data-ocid="register.experience_level_select">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">
                      Entry Level (0–2 years)
                    </SelectItem>
                    <SelectItem value="mid">Mid Level (3–5 years)</SelectItem>
                    <SelectItem value="senior">
                      Senior Level (6+ years)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Preferred Industries</Label>
                <p className="text-xs text-muted-foreground">
                  Select all that apply
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => toggleIndustry(ind)}
                      className={[
                        "flex items-center gap-2 px-3 py-2 rounded-lg border text-sm text-left transition-colors",
                        form.preferredIndustries.includes(ind)
                          ? "border-primary bg-primary/10 text-primary font-medium"
                          : "border-border bg-background text-foreground hover:border-primary/50",
                      ].join(" ")}
                      data-ocid={`register.industry.${ind.toLowerCase().replace(/[^a-z0-9]/g, "_")}_toggle`}
                    >
                      {form.preferredIndustries.includes(ind) && (
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      )}
                      <span className="truncate">{ind}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                data-ocid="register.back_button"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                className="font-semibold"
                data-ocid="register.next2_button"
              >
                Next: Preferences
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Preferences */}
        {step === 3 && (
          <div
            className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-5"
            data-ocid="register.step3.panel"
          >
            <h2 className="font-display font-semibold text-lg text-foreground">
              Job Preferences
            </h2>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label>Desired Salary Range (USD / year)</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Minimum</p>
                    <Input
                      type="number"
                      min={0}
                      step={1000}
                      value={form.desiredSalaryMin}
                      onChange={(e) => set("desiredSalaryMin", e.target.value)}
                      placeholder="40,000"
                      data-ocid="register.salary_min_input"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Maximum</p>
                    <Input
                      type="number"
                      min={0}
                      step={1000}
                      value={form.desiredSalaryMax}
                      onChange={(e) => set("desiredSalaryMax", e.target.value)}
                      placeholder="120,000"
                      data-ocid="register.salary_max_input"
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="text-sm font-medium text-foreground mb-1">
                  Job Type Preferences
                </p>
                <p className="text-sm text-muted-foreground">
                  You can filter jobs by type (Full Time, Part Time, Remote,
                  Contract) when browsing the job listings. Job type filtering
                  is available at search time.
                </p>
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                data-ocid="register.back2_button"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={createProfile.isPending}
                className="font-semibold"
                data-ocid="register.submit_button"
              >
                {createProfile.isPending
                  ? "Creating Profile..."
                  : "Create Profile"}
              </Button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
            data-ocid="register.login_link"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
