import Link from "next/link";
import { Star } from "lucide-react";
import { Service } from "@/types/service";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ServiceCard({ service }: { service: Service }) {
  const avgRating =
    service.reviews && service.reviews.length > 0
      ? (
          service.reviews.reduce((sum, r) => sum + r.rating, 0) /
          service.reviews.length
        ).toFixed(1)
      : null;

  return (
    <Link href={`/services/${service.id}`}>
      <Card className="h-full hover:border-teal-500 hover:shadow-sm transition-colors">
        <CardContent className="flex flex-col gap-2">
          {service.category && (
            <Badge variant="secondary" className="w-fit text-xs">
              {service.category.name}
            </Badge>
          )}
          <h3 className="font-semibold leading-tight">{service.title}</h3>
          {service.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {service.description}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <span className="font-bold text-teal-600">
            ৳{Number(service.price).toLocaleString()}
          </span>
          {avgRating && (
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {avgRating}
            </span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
