"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { api } from "@/lib/api";
import { Service, Category } from "@/types/service";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ServicesContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryFromUrl,
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([
      api.get<Service[]>("/api/services"),
      api.get<Category[]>("/api/categories"),
    ])
      .then(([servicesRes, categoriesRes]) => {
        setServices(servicesRes.data);
        setCategories(categoriesRes.data);
      })
      .catch(() => {
        setServices([]);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = services.filter((s) => {
    const matchesCategory = selectedCategory
      ? String(s.categoryId) === selectedCategory
      : true;
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">All Services</h1>

      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          size="sm"
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            size="sm"
            variant={
              selectedCategory === String(cat.id) ? "default" : "outline"
            }
            onClick={() => setSelectedCategory(String(cat.id))}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No services match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={null}>
      <ServicesContent />
    </Suspense>
  );
}
