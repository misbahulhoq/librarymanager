import { Book } from "@/types";
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

const ViewBookDetails = ({
  book,
  trigger,
}: {
  book: Book;
  trigger: React.ReactNode;
}) => {
  const { title, description, author, genre, isbn, copies, available } = book;
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogTitle title={title}></DialogTitle>
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-3">
            {/* Left Column: Book Cover Placeholder */}
            <div className="flex items-center justify-center bg-secondary p-8 md:p-12">
              <BookOpen
                className="h-32 w-32 text-muted-foreground"
                strokeWidth={1}
              />
            </div>

            {/* Right Column: Book Information */}
            <div className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">
                  {title}
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  by {author}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Availability Badge */}
                <div className="flex items-center gap-4">
                  <Badge
                    variant={available ? "default" : "destructive"}
                    className="text-sm"
                  >
                    {available ? "Available" : "Checked Out"}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    <strong>{copies}</strong> copies available
                  </p>
                </div>

                {/* Description */}
                <div className="text-sm text-muted-foreground">
                  <p>{description}</p>
                </div>

                {/* Metadata List */}
                <div className="space-y-2 border-t pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Genre</span>
                    <span className="font-medium">{genre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ISBN</span>
                    <span className="font-medium">{isbn}</span>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ViewBookDetails;
