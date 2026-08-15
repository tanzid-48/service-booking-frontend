import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
        <ShieldAlert className="h-8 w-8 text-red-600 dark:text-red-400" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
      <p className="text-muted-foreground max-w-sm mb-8">
        You don&apos;t have permission to view this page. This area is
        restricted based on your account role.
      </p>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/" />}
        >
          Go to Home
        </Button>
        <Button nativeButton={false} render={<Link href="/services" />}>
          Browse Services
        </Button>
      </div>
    </div>
  );
}
