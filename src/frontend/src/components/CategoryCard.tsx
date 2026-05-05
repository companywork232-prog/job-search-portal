import type { JobCategory } from "@/backend";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

const CATEGORY_COLORS: Record<string, string> = {
  technology: "bg-blue-50 text-blue-600 border-blue-200",
  finance: "bg-emerald-50 text-emerald-600 border-emerald-200",
  healthcare: "bg-rose-50 text-rose-600 border-rose-200",
  marketing: "bg-orange-50 text-orange-600 border-orange-200",
  education: "bg-violet-50 text-violet-600 border-violet-200",
  design: "bg-pink-50 text-pink-600 border-pink-200",
  sales: "bg-amber-50 text-amber-600 border-amber-200",
  operations: "bg-cyan-50 text-cyan-600 border-cyan-200",
  legal: "bg-slate-50 text-slate-600 border-slate-200",
  default: "bg-primary/5 text-primary border-primary/20",
};

interface CategoryCardProps {
  category: JobCategory;
  index?: number;
}

export function CategoryCard({ category, index = 1 }: CategoryCardProps) {
  const colorKey = category.slug.toLowerCase();
  const colors = CATEGORY_COLORS[colorKey] ?? CATEGORY_COLORS.default;

  return (
    <Link
      to="/jobs"
      search={{ category: category.slug }}
      data-ocid={`category.item.${index}`}
    >
      <Card className="group hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer bg-card border-border h-full">
        <CardContent className="p-4 flex flex-col items-center text-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border ${
              colors
            }`}
          >
            {category.icon}
          </div>
          <div>
            <p className="font-display font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
              {category.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {Number(category.jobCount).toLocaleString()} jobs
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
