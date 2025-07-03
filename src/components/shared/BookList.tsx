"use client";
import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import type { Book } from "@/types";
import { useGetBooksQuery } from "@/redux/features/book/bookApiSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";

function BooksTable() {
  const { data: books, isLoading } = useGetBooksQuery(undefined);
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);

  const handleDelete = (id: string, title: string) => {
    console.log({ id, title });
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="w-full rounded-md border">
      <Table>
        <TableCaption>A list of all books in the library.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead className="text-center">Copies</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books?.length > 0 ? (
            books.map((book: Book) => (
              <TableRow key={book._id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell className="text-center">{book.copies}</TableCell>
                <TableCell>
                  {/* <Badge
                    className={cn(
                      book.availability
                        ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400 hover:bg-green-200"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400 hover:bg-amber-200"
                    )}
                  >
                    {book.availability}
                  </Badge> */}
                  {book.available ? "✅" : "❌"}
                </TableCell>
                <TableCell className="text-right">
                  <AlertDialog>
                    <DropdownMenu
                      open={openMenuId === book._id}
                      onOpenChange={(isOpen) => {
                        setOpenMenuId(isOpen ? book._id : null);
                      }}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 cursor-pointer"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4 cursor-pointer" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="cursor-pointer"
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() =>
                            alert(`Viewing details for ${book.title}`)
                          }
                          className="cursor-pointer"
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => alert(`Editing ${book.title}`)}
                          className="cursor-pointer"
                        >
                          Edit Book
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => alert(`Borrowing ${book.title}`)}
                          className="cursor-pointer"
                        >
                          Borrow Book
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {/* This is the new trigger for the dialog */}
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/60"
                            // Prevent the dropdown from closing when this is clicked
                            onSelect={(e) => e.preventDefault()}
                          >
                            Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the book titled{" "}
                          <strong className="text-foreground">
                            {book.title}
                          </strong>{" "}
                          from the server.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpenMenuId(null)}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className={buttonVariants({ variant: "destructive" })}
                          onClick={() => {
                            handleDelete(book._id, book.title);
                            setOpenMenuId(null);
                          }}
                        >
                          Yes, delete book
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No books found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default BooksTable;
