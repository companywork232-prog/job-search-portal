import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function JobCardSkeleton() {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Skeleton className="w-12 h-12 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <div className="flex gap-4 mt-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-8 w-24 mt-4 rounded-lg" />
      </CardContent>
    </Card>
  );
}

export function JobListSkeleton({ count = 6 }: { count?: number }) {
  const keys = Array.from(
    { length: count },
    (_, i) => `job-skel-${count}-${i}`,
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {keys.map((k) => (
        <JobCardSkeleton key={k} />
      ))}
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4 flex flex-col items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="space-y-1 w-full">
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <Skeleton className="h-3 w-1/2 mx-auto" />
        </div>
      </CardContent>
    </Card>
  );
}

export function CategoryListSkeleton({ count = 8 }: { count?: number }) {
  const keys = Array.from(
    { length: count },
    (_, i) => `cat-skel-${count}-${i}`,
  );
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
      {keys.map((k) => (
        <CategoryCardSkeleton key={k} />
      ))}
    </div>
  );
}

export function JobDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Skeleton className="w-16 h-16 rounded-xl" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-10 w-28 rounded-xl" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardContent className="p-6 space-y-4">
          {[
            "skel-full-a",
            "skel-45-a",
            "skel-full-b",
            "skel-45-b",
            "skel-full-c",
            "skel-45-c",
          ].map((k) => (
            <Skeleton
              key={k}
              className={`h-4 ${k.includes("full") ? "w-full" : "w-4/5"}`}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      {["name", "email", "phone", "location"].map((field) => (
        <div key={field} className="space-y-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}
