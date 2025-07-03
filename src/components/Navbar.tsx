"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookMarked, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose, // Import SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button"; // Often used for triggers

const navLinks = [
  { href: "/books", label: "All Books" },
  { href: "/books/add", label: "Add Book" },
  { href: "/borrow-summary", label: "Borrow Summary" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between">
        {/* Logo and Desktop Navigation */}
        <Link href="/" className="mr-6 ml-2 flex items-center space-x-2">
          <BookMarked className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">LibrarySys</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === link.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation (Hamburger Menu) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="lg">
                <Menu className="h-10 w-10" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="mr-6 flex mt-4 items-center space-x-2"
                >
                  <BookMarked className="h-6 w-6 text-primary" />
                  <span className="font-bold">LibrarySys</span>
                </Link>
                <div className="flex h-full flex-col space-y-3 pt-4 pl-3">
                  {navLinks.map((link) => (
                    // Use SheetClose to automatically close the sheet on navigation
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "rounded-md p-2 transition-colors hover:bg-muted",
                          pathname === link.href
                            ? "bg-muted font-semibold text-foreground"
                            : "text-foreground/70"
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
