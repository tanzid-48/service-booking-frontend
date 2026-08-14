import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryGrid } from "@/components/shared/CategoryGrid";
import { FeaturedServices } from "@/components/shared/FeaturedServices";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-teal-50 to-background dark:from-teal-950/20">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
            <Sparkles className="h-3 w-3 text-teal-600" />
            Trusted local service providers
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Book local services,{" "}
            <span className="text-teal-600">hassle-free</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Find and book cleaning, tutoring, repairs, and more from trusted
            providers near you.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/services" />}
            >
              Browse Services <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/register" />}
            >
              Become a Provider
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-xl font-bold mb-6">Browse by category</h2>
        <CategoryGrid />
      </section>

      {/* Featured services */}
      <section className="max-w-6xl mx-auto px-4 py-14 border-t">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Featured services</h2>
          <Link
            href="/services"
            className="text-sm text-teal-600 hover:underline flex items-center gap-1"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <FeaturedServices />
      </section>
    </div>
  );
}
