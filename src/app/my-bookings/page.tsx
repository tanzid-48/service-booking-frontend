"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { api } from "@/lib/api";
import { Booking, BookingStatus } from "@/types/service";
import { RouteGuard } from "@/components/shared/RouteGuard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusStyles: Record<BookingStatus, string> = {
  PENDING:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  CONFIRMED: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  COMPLETED: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

function MyBookingsContent() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Booking[]>("/api/bookings")
      .then((res) => setBookings(res.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-lg bg-muted animate-pulse mb-4"
          />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground mb-4">
          You haven&apos;t booked any service yet.
        </p>
        <Link
          href="/services"
          className="text-teal-600 hover:underline text-sm"
        >
          Browse services →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <div className="flex flex-col gap-4">
        {bookings.map((b) => (
          <Card key={b.id}>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {b.service?.title || `Service #${b.serviceId}`}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(b.bookingDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <Badge className={statusStyles[b.status]} variant="secondary">
                {b.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <RouteGuard allowedRoles={["CUSTOMER"]}>
      <MyBookingsContent />
    </RouteGuard>
  );
}
