"use client";
// default imports
import React from "react";
import Swal from "sweetalert2";
import z from "zod";
// default imports end

// Hooks import start
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/redux/features/book/bookApiSlice";
import { useForm } from "react-hook-form";
// Hooks import end

// Named imports
import { MoreHorizontal, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Book } from "@/types";
// Named imports end

// Shadcn Ui imports
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

function BooksTable() {
  const { data: books, isLoading } = useGetBooksQuery(undefined);
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
  const [deleteBookById] = useDeleteBookMutation();

  const handleDelete = (id: string, title: string) => {
    console.log({ id, title });
    deleteBookById(id)
      .unwrap()
      .then(() => {
        Swal.fire({
          title: "Delete Successful",
          text: `"${title}" has been deleted successfully`,
          icon: "success",
          draggable: true,
        });
      });
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
                <TableCell>{book.copies > 0 ? "✅" : "❌"}</TableCell>
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
                        <BorrowForm
                          book={book}
                          trigger={
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              className="cursor-pointer"
                            >
                              Borrow Book
                            </DropdownMenuItem>
                          }
                        />

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

interface BorrowFormProps {
  book: Book;
  trigger: React.ReactNode;
}

export function BorrowForm({ book, trigger }: BorrowFormProps) {
  const { title, copies } = book;
  const formSchema = z.object({
    quantity: z.coerce
      .number()
      .min(1, { message: "Quantity must be at least 1." })
      .max(copies, { message: "Quantity cannot exceed available copies." }),
    dueDate: z
      .date({
        required_error: "A due date is required.",
      })
      .refine(
        (date) => {
          // Ensure the selected date is not in the past (comparing against start of today)
          const startOfToday = new Date();
          startOfToday.setHours(0, 0, 0, 0);
          return date >= startOfToday;
        },
        { message: "Due date cannot be in the past." }
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
      // Set the due date to 2 weeks from today
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Borrow request submitted:", {
      title,
      ...values,
    });
    alert(
      `Borrowing ${values.quantity} of ${title} until ${format(
        values.dueDate,
        "PPP"
      )}`
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Borrow: {title}</DialogTitle>
          <DialogDescription>
            Select the quantity and due date for your borrow request.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          // Disable past dates for better UX
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">Borrow</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
