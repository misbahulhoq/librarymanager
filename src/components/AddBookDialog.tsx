"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddBookForm from "./shared/AddBookForm";

const AddBookDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new book</DialogTitle>
        </DialogHeader>
        <div className="">
          <AddBookForm isModal={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookDialog;
