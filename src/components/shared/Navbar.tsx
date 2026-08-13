"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const { user } = useAuth();

  return (
    <>
      <Link
        href="/services"
        className="hover:text-primary"
        onClick={onNavigate}
      >
        Services
      </Link>

      {user?.role === "CUSTOMER" && (
        <Link
          href="/my-bookings"
          className="hover:text-primary"
          onClick={onNavigate}
        >
          My Bookings
        </Link>
      )}

      {user?.role === "PROVIDER" && (
        <Link
          href="/dashboard/services"
          className="hover:text-primary"
          onClick={onNavigate}
        >
          Dashboard
        </Link>
      )}

      {user?.role === "ADMIN" && (
        <Link
          href="/admin/users"
          className="hover:text-primary"
          onClick={onNavigate}
        >
          Admin Panel
        </Link>
      )}
    </>
  );
}

function AuthActions({ onNavigate }: { onNavigate?: () => void }) {
  const { user, logout, loading } = useAuth();

  if (loading) return null;

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
          {user.name}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled className="text-muted-foreground">
            {user.role}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              logout();
              onNavigate?.();
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        nativeButton={false}
        render={<Link href="/login" onClick={onNavigate} />}
      >
        Login
      </Button>
      <Button
        size="sm"
        nativeButton={false}
        render={<Link href="/register" onClick={onNavigate} />}
      >
        Register
      </Button>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">
        <Logo />

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLinks />
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <AuthActions />
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" />
            }
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[72vw] max-w-[250px] sm:max-w-[320px]"
          >
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 px-4 mt-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Theme
                </span>
                <ThemeToggle />
              </div>
              <div className="border-t pt-4 flex flex-col gap-4">
                <NavLinks onNavigate={() => setOpen(false)} />
              </div>
              <div className="border-t pt-4">
                <AuthActions onNavigate={() => setOpen(false)} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
