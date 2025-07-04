import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Book } from "@/types";

// Shadcn Ui imports
import { Button } from "@/components/ui/button";
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
import { useBorrowBookMutation } from "@/redux/features/borrow/borrowApiSlice";

interface BorrowFormProps {
  book: Book;
  trigger: React.ReactNode;
}

export function BorrowForm({ book, trigger }: BorrowFormProps) {
  const { _id, title, copies } = book;
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const formSchema = z.object({
    bookId: z.string(),
    quantities: z.coerce
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
      bookId: _id,
      quantities: copies > 0 ? 1 : 0,
      // Set the due date to 2 weeks from today
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Borrow request submitted:", {
      title,
      ...values,
    });
    borrowBook(values)
      .unwrap()
      .then(() => {
        form.reset();
        alert(`${values.quantities} copies of ${title} borrowed successfully.`);
      });
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
                name="quantities"
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
                <Button disabled={isLoading} type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading || copies === 0}>
                {isLoading ? "Borrowing..." : "Borrow"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
