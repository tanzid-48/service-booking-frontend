"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Star, User as UserIcon } from "lucide-react";
import { api } from "@/lib/api";
import { Service } from "@/types/service";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookingButton } from "@/components/Form/BookingButton";
import { ReviewForm } from "@/components/Form/ReviewForm";

export default function ServiceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchService = () => {
    api
      .get<Service>(`/api/services/${id}`)
      .then((res) => setService(res.data))
      .catch(() => setService(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="h-8 w-1/2 bg-muted animate-pulse rounded mb-4" />
        <div className="h-40 bg-muted animate-pulse rounded" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-muted-foreground">
        Service not found.
      </div>
    );
  }

  const avgRating =
    service.reviews && service.reviews.length > 0
      ? (
          service.reviews.reduce((sum, r) => sum + r.rating, 0) /
          service.reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {service.category && (
        <Badge variant="secondary" className="mb-3">
          {service.category.name}
        </Badge>
      )}
      <h1 className="text-2xl md:text-3xl font-bold">{service.title}</h1>

      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
        {service.provider && (
          <span className="flex items-center gap-1">
            <UserIcon className="h-3.5 w-3.5" />
            {service.provider.name}
          </span>
        )}
        {avgRating && (
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {avgRating} ({service.reviews?.length} reviews)
          </span>
        )}
      </div>

      <p className="mt-4 text-muted-foreground leading-relaxed">
        {service.description}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-2xl font-bold text-teal-600">
          ৳{Number(service.price).toLocaleString()}
        </span>
        <BookingButton serviceId={service.id} />
      </div>

      <div className="mt-10 border-t pt-8">
        <h2 className="text-lg font-bold mb-4">Reviews</h2>

        <ReviewForm serviceId={service.id} onSuccess={fetchService} />

        <div className="flex flex-col gap-3 mt-6">
          {service.reviews && service.reviews.length > 0 ? (
            service.reviews.map((r) => (
              <Card key={r.id}>
                <CardContent className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">
                      {r.customer?.name || "Customer"}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {r.rating}
                    </span>
                  </div>
                  {r.comment && (
                    <p className="text-sm text-muted-foreground">{r.comment}</p>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No reviews yet. Be the first to review!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
