"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RouteGuard } from "@/components/shared/RouteGuard";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/dashboard/services", label: "My Services" },
  { href: "/dashboard/bookings", label: "Booking Requests" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <RouteGuard allowedRoles={["PROVIDER", "ADMIN"]}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Provider Dashboard</h1>
        <div className="flex gap-1 border-b mb-8">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                pathname === tab.href
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>
        {children}
      </div>
    </RouteGuard>
  );
}
