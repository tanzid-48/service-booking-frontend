"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Booking, BookingStatus } from "@/types/service";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const statusStyles: Record<BookingStatus, string> = {
  PENDING:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  CONFIRMED: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  COMPLETED: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const nextActions: Partial<
  Record<BookingStatus, { label: string; next: BookingStatus }[]>
> = {
  PENDING: [
    { label: "Confirm", next: "CONFIRMED" },
    { label: "Cancel", next: "CANCELLED" },
  ],
  CONFIRMED: [
    { label: "Mark Completed", next: "COMPLETED" },
    { label: "Cancel", next: "CANCELLED" },
  ],
};

export default function DashboardBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchBookings = () => {
    api
      .get<Booking[]>("/api/bookings")
      .then((res) => {
        const mine = res.data.filter((b) => b.service?.providerId === user?.id);
        setBookings(mine);
      })
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user) fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleStatusChange = async (id: number, status: BookingStatus) => {
    setUpdatingId(id);
    try {
      await api.put(`/api/bookings/${id}/status`, { status });
      toast.success(`Booking marked as ${status.toLowerCase()}`);
      fetchBookings();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-10 text-center">
        No booking requests yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {bookings.map((b) => (
        <Card key={b.id}>
          <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="font-semibold">{b.service?.title}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(b.bookingDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
                {b.customer && (
                  <span className="ml-2">· {b.customer.name}</span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={statusStyles[b.status]} variant="secondary">
                {b.status}
              </Badge>
              {nextActions[b.status]?.map((action) => (
                <Button
                  key={action.label}
                  size="sm"
                  variant="outline"
                  disabled={updatingId === b.id}
                  onClick={() => handleStatusChange(b.id, action.next)}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
