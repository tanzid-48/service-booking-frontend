"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Service } from "@/types/service";
import { ServiceCard } from "@/components/shared/ServiceCard";

export function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Service[]>("/api/services")
      .then((res) => setServices(res.data.slice(0, 6)))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-40 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No services available yet. Check back soon!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {services.map((s) => (
        <ServiceCard key={s.id} service={s} />
      ))}
    </div>
  );
}
