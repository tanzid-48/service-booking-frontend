"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export function BookingButton({ serviceId }: { serviceId: number }) {
  const { user } = useAuth();
  const router = useRouter();
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (!user) {
      toast.info("Please login first to book a service.");
      router.push("/login");
      return;
    }
    if (user.role !== "CUSTOMER") {
      toast.error("Only customer accounts can book services.");
      return;
    }
    setOpen(true);
  };

  const handleConfirm = async () => {
    if (!date) {
      toast.error("Please select a date.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/api/bookings", {
        bookingDate: new Date(date).toISOString(),
        serviceId,
      });
      toast.success('Booking created! Check "My Bookings" for status.');
      setOpen(false);
      setDate("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={handleClick}>Book Now</Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book this service</DialogTitle>
          <DialogDescription>
            Pick a date you&apos;d like the provider to visit.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 py-2">
          <Label htmlFor="bookingDate">Preferred date</Label>
          <Input
            id="bookingDate"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button onClick={handleConfirm} disabled={loading}>
            {loading ? "Booking..." : "Confirm Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
