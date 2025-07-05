"use client";
import { BorrowSummaryList } from "@/components/BorrowSummary";
import { useGetBorrowsQuery } from "@/redux/features/borrow/borrowApiSlice";
import React from "react";

const BorrowSummary = () => {
  const { data, isLoading } = useGetBorrowsQuery(undefined);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="container-center py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Borrowed Books Summary</h1>
        <p className="text-muted-foreground">
          A summary of all unique books currently on loan.
        </p>
      </div>
      <BorrowSummaryList borrows={data} />
    </div>
  );
};

export default BorrowSummary;
