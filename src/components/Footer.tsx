import Link from "next/link";
import { BookMarked } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-muted/40">
      <div className="container-center flex flex-col items-start justify-between space-y-8 py-10 md:flex-row md:space-y-0">
        {/* Site Info Section */}
        <div className="flex flex-col space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <BookMarked className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">LibrarySys</span>
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            A modern, intuitive system for managing library resources
            efficiently.
          </p>
        </div>

        {/* Quick Links Section (optional but recommended) */}
        <div className="flex flex-col space-y-2 text-sm">
          <h3 className="font-semibold text-foreground">Quick Links</h3>
          <Link
            href="/books"
            className="text-muted-foreground hover:text-primary"
          >
            All Books
          </Link>
          <Link
            href="/books/add"
            className="text-muted-foreground hover:text-primary"
          >
            Add Book
          </Link>
          <Link
            href="/borrow-summary"
            className="text-muted-foreground hover:text-primary"
          >
            Borrow Summary
          </Link>
        </div>

        {/* Credits and Copyright Section */}
        <div className="flex flex-col items-start space-y-2 text-sm md:items-end">
          <p className="text-muted-foreground">
            Built by{" "}
            <a
              href="https://github.com/misbahulhoq"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              Md Mezbah Uddin
            </a>
            .
          </p>
          <p className="text-muted-foreground">
            The source code is available on{" "}
            <a
              href="https://github.com/misbahulhoq/librarymanager"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              GitHub
            </a>
            .
          </p>
          <p className="pt-4 text-xs text-muted-foreground">
            © {currentYear} LibrarySys. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
