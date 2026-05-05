import type { UpdateJobSeekerInput, WorkExperience } from "@/backend";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProfileSkeleton } from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useCreateOrUpdateProfile, useMyProfile } from "@/hooks/useUser";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { createRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Plus, Save, Trash2, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Route as rootRoute } from "./__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
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

function calcCompletion(
  form: FormState,
  hasWorkExp: boolean,
): { pct: number; missing: string[] } {
  const checks: Array<{ label: string; done: boolean }> = [
    { label: "Full name", done: !!form.name.trim() },
    { label: "Email", done: !!form.email.trim() },
    { label: "Phone", done: !!form.phone.trim() },
    { label: "Location", done: !!form.location.trim() },
    { label: "Headline", done: !!form.headline.trim() },
    { label: "Bio", done: !!form.bio.trim() },
    { label: "Experience level", done: !!form.experienceLevel },
    { label: "Resume URL", done: !!form.resumeUrl.trim() },
    {
      label: "Preferred industries",
      done: form.preferredIndustries.length > 0,
    },
    { label: "Work experience", done: hasWorkExp },
  ];
  const done = checks.filter((c) => c.done).length;
  const missing = checks.filter((c) => !c.done).map((c) => c.label);
  return { pct: Math.round((done / checks.length) * 100), missing };
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  bio: string;
  experienceLevel: string;
  resumeUrl: string;
  resumeName: string;
  preferredIndustries: string[];
  desiredSalaryMin: string;
  desiredSalaryMax: string;
  workExperience: WorkExperience[];
}

export default function ProfilePage() {
  const { isAuthenticated, login } = useInternetIdentity();
  const { data: profile, isLoading } = useMyProfile();
  const updateProfile = useCreateOrUpdateProfile();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    location: "",
    headline: "",
    bio: "",
    experienceLevel: "",
    resumeUrl: "",
    resumeName: "",
    preferredIndustries: [],
    desiredSalaryMin: "",
    desiredSalaryMax: "",
    workExperience: [],
  });

  const [initialized, setInitialized] = useState(false);
  if (profile && !initialized) {
    setInitialized(true);
    setForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone ?? "",
      location: profile.location ?? "",
      headline: profile.headline ?? "",
      bio: profile.bio ?? "",
      experienceLevel: profile.experienceLevel
        ? (profile.experienceLevel as string)
        : "",
      resumeUrl: profile.resumeUrl ?? "",
      resumeName: profile.resumeName ?? "",
      preferredIndustries: profile.preferredIndustries ?? [],
      desiredSalaryMin: profile.desiredSalaryMin
        ? profile.desiredSalaryMin.toString()
        : "",
      desiredSalaryMax: profile.desiredSalaryMax
        ? profile.desiredSalaryMax.toString()
        : "",
      workExperience: profile.workExperience,
    });
  }

  const { pct, missing } = calcCompletion(form, form.workExperience.length > 0);

  const toggleIndustry = (ind: string) =>
    setForm((f) => ({
      ...f,
      preferredIndustries: f.preferredIndustries.includes(ind)
        ? f.preferredIndustries.filter((i) => i !== ind)
        : [...f.preferredIndustries, ind],
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input: UpdateJobSeekerInput = {
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      location: form.location || undefined,
      headline: form.headline || undefined,
      bio: form.bio || undefined,
      experienceLevel: (form.experienceLevel ||
        undefined) as UpdateJobSeekerInput["experienceLevel"],
      resumeUrl: form.resumeUrl || undefined,
      resumeName: form.resumeName || undefined,
      preferredIndustries: form.preferredIndustries,
      desiredSalaryMin: form.desiredSalaryMin
        ? BigInt(form.desiredSalaryMin)
        : undefined,
      desiredSalaryMax: form.desiredSalaryMax
        ? BigInt(form.desiredSalaryMax)
        : undefined,
      workExperience: form.workExperience,
    };
    updateProfile.mutate(input, {
      onSuccess: () => toast.success("Profile saved!"),
      onError: (e) => toast.error(e.message),
    });
  };

  const addExperience = () =>
    setForm((f) => ({
      ...f,
      workExperience: [
        ...f.workExperience,
        { title: "", company: "", duration: "" },
      ],
    }));

  const removeExperience = (idx: number) =>
    setForm((f) => ({
      ...f,
      workExperience: f.workExperience.filter((_, i) => i !== idx),
    }));

  const updateExperience = (
    idx: number,
    field: keyof WorkExperience,
    value: string,
  ) =>
    setForm((f) => ({
      ...f,
      workExperience: f.workExperience.map((exp, i) =>
        i === idx ? { ...exp, [field]: value } : exp,
      ),
    }));

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-background px-4"
        data-ocid="profile.unauthenticated_state"
      >
        <User className="w-12 h-12 text-primary mb-4" />
        <h2 className="font-display font-bold text-xl text-foreground mb-2">
          Sign in to manage your profile
        </h2>
        <p className="text-muted-foreground text-sm mb-6 text-center">
          Create your profile and start applying to jobs.
        </p>
        <Button
          onClick={login}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          data-ocid="profile.login_button"
        >
          Sign In
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <ProfileSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen" data-ocid="profile.page">
      {/* Page header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Breadcrumb
            items={[
              { label: "Dashboard", to: "/dashboard" },
              { label: "Edit Profile" },
            ]}
          />
          <h1 className="font-display font-bold text-xl text-foreground mt-2">
            Edit Profile
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Profile completion */}
        <div
          className="mb-6 bg-card border border-border rounded-2xl p-4"
          data-ocid="profile.completion_card"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Profile Completion
            </span>
            <span
              className={[
                "text-sm font-bold",
                pct >= 80
                  ? "text-accent"
                  : pct >= 50
                    ? "text-primary"
                    : "text-destructive",
              ].join(" ")}
            >
              {pct}%
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={[
                "h-full rounded-full transition-all duration-500",
                pct >= 80
                  ? "bg-accent"
                  : pct >= 50
                    ? "bg-primary"
                    : "bg-destructive",
              ].join(" ")}
              style={{ width: `${pct}%` }}
            />
          </div>
          {missing.length > 0 && pct < 100 && (
            <p className="text-xs text-muted-foreground mt-2">
              Complete:{" "}
              <span className="font-medium text-foreground">
                {missing.slice(0, 3).join(", ")}
                {missing.length > 3 && ` + ${missing.length - 3} more`}
              </span>
            </p>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          data-ocid="profile.form"
        >
          {/* Personal info */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-base">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Jane Doe"
                    required
                    data-ocid="profile.name_input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="jane@example.com"
                    required
                    data-ocid="profile.email_input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    placeholder="+1 (555) 000-0000"
                    data-ocid="profile.phone_input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={form.location}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, location: e.target.value }))
                    }
                    placeholder="San Francisco, CA"
                    data-ocid="profile.location_input"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="headline">Professional Headline</Label>
                <Input
                  id="headline"
                  value={form.headline}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, headline: e.target.value }))
                  }
                  placeholder="Senior Software Engineer at Acme Corp"
                  data-ocid="profile.headline_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={form.bio}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, bio: e.target.value }))
                  }
                  placeholder="Tell employers a bit about yourself..."
                  rows={3}
                  data-ocid="profile.bio_textarea"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Experience Level</Label>
                <Select
                  value={form.experienceLevel}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, experienceLevel: v }))
                  }
                >
                  <SelectTrigger data-ocid="profile.experience_level_select">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Preferred Industries */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-base">
                Preferred Industries
              </CardTitle>
            </CardHeader>
            <CardContent>
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
                    data-ocid={`profile.industry.${ind.toLowerCase().replace(/[^a-z0-9]/g, "_")}_toggle`}
                  >
                    {form.preferredIndustries.includes(ind) && (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    )}
                    <span className="truncate">{ind}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Job preferences */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-base">
                Job Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
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
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          desiredSalaryMin: e.target.value,
                        }))
                      }
                      placeholder="40,000"
                      data-ocid="profile.salary_min_input"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Maximum</p>
                    <Input
                      type="number"
                      min={0}
                      step={1000}
                      value={form.desiredSalaryMax}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          desiredSalaryMax: e.target.value,
                        }))
                      }
                      placeholder="120,000"
                      data-ocid="profile.salary_max_input"
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="text-sm font-medium text-foreground mb-1">
                  Job Type Filtering
                </p>
                <p className="text-sm text-muted-foreground">
                  Job type (Full Time, Part Time, Remote, Contract) can be
                  filtered when browsing job listings. Use the filters on the
                  Jobs page to narrow your search.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Work experience */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-base">
                Work Experience
              </CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addExperience}
                data-ocid="profile.add_experience_button"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {form.workExperience.length === 0 ? (
                <p
                  className="text-sm text-muted-foreground text-center py-4"
                  data-ocid="profile.experience_empty_state"
                >
                  No work experience added yet.
                </p>
              ) : (
                form.workExperience.map((exp, i) => (
                  <div
                    key={
                      exp.company
                        ? `${exp.company}-${exp.title}`
                        : `exp-new-${i}`
                    }
                    className="border border-border rounded-xl p-4 space-y-3 relative"
                    data-ocid={`profile.experience.item.${i + 1}`}
                  >
                    <button
                      type="button"
                      onClick={() => removeExperience(i)}
                      className="absolute top-3 right-3 p-1 rounded text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove experience"
                      data-ocid={`profile.experience.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs">Job Title</Label>
                        <Input
                          value={exp.title}
                          onChange={(e) =>
                            updateExperience(i, "title", e.target.value)
                          }
                          placeholder="Software Engineer"
                          data-ocid={`profile.experience.title_input.${i + 1}`}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs">Company</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(i, "company", e.target.value)
                          }
                          placeholder="Acme Corp"
                          data-ocid={`profile.experience.company_input.${i + 1}`}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Duration</Label>
                      <Input
                        value={exp.duration}
                        onChange={(e) =>
                          updateExperience(i, "duration", e.target.value)
                        }
                        placeholder="Jan 2020 – Dec 2022"
                        data-ocid={`profile.experience.duration_input.${i + 1}`}
                      />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Resume */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-base">Resume</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="resumeName">Resume File Name</Label>
                <Input
                  id="resumeName"
                  value={form.resumeName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, resumeName: e.target.value }))
                  }
                  placeholder="my-resume-2024.pdf"
                  data-ocid="profile.resume_name_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="resumeUrl">Resume URL</Label>
                <Input
                  id="resumeUrl"
                  type="url"
                  value={form.resumeUrl}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, resumeUrl: e.target.value }))
                  }
                  placeholder="https://drive.google.com/..."
                  data-ocid="profile.resume_url_input"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Link to="/dashboard">
              <Button
                type="button"
                variant="outline"
                data-ocid="profile.cancel_button"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={updateProfile.isPending}
              data-ocid="profile.save_button"
            >
              <Save className="w-4 h-4 mr-2" />
              {updateProfile.isPending ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
