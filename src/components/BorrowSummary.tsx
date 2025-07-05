import { BookOpen } from "lucide-react";
import { Book } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface BorrowSummaryListProps {
  _id: string;
  borrowed: number;
  book: Book;
}

export function BorrowSummaryList({
  borrows,
}: {
  borrows: BorrowSummaryListProps[];
}) {
  if (borrows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-6 text-center">
        <div className="mb-4 rounded-full border bg-secondary p-4">
          <BookOpen className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold">No Borrowed Books</h2>
        <p className="text-muted-foreground">
          When you borrow a book, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>
          A summary of all borrowed books by total quantity.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Book Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead className="text-right">
              Total Quantity Borrowed
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrows.length > 0 ? (
            borrows.map((summary) => (
              <TableRow key={summary._id}>
                <TableCell className="font-medium">
                  {summary.book.title}
                </TableCell>
                <TableCell>{summary.book.isbn}</TableCell>
                <TableCell className="text-right font-medium">
                  {summary.borrowed}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                No books are currently borrowed.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
