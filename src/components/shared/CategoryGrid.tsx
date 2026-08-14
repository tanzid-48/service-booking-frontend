"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Layers } from "lucide-react";
import { api } from "@/lib/api";
import { Category } from "@/types/service";
import { Card } from "@/components/ui/card";

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Category[]>("/api/categories")
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return <p className="text-sm text-muted-foreground">No categories yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((cat) => (
        <Link key={cat.id} href={`/services?category=${cat.id}`}>
          <Card className="h-24 flex flex-col items-center justify-center gap-2 hover:border-teal-500 hover:shadow-sm transition-colors">
            <Layers className="h-5 w-5 text-teal-600" />
            <span className="text-sm font-medium text-center px-2">
              {cat.name}
            </span>
          </Card>
        </Link>
      ))}
    </div>
  );
}
