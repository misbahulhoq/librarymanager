# Book Management System

This is a web application for managing a collection of books, built with Next.js, Redux, and TypeScript.

## Features

- **View Books:** Browse the list of available books.
- **Add Books:** Add new books to the collection.
- **Edit Books:** Update the details of existing books.
- **Borrow Books:** Manage book borrowing.
- **Borrow Summary:** View a summary of borrowed books.

## Project Structure

The project is organized as follows:

```
/
├── public/ # Static assets
└── src/
    ├── app/ # Next.js App Router
    │   ├── books/ # Book management pages
    │   ├── borrow-summary/ # Borrow summary page
    │   ├── layout.tsx # Root layout
    │   └── page.tsx # Home page
    ├── components/ # Reusable components
    │   ├── shared/ # Components shared across features
    │   └── ui/ # UI components from Shadcn
    ├── lib/ # Utility functions and hooks
    └── redux/ # Redux store and API slices
        ├── features/ # Redux features (book, borrow)
        ├── api.ts # Base API configuration
        └── store.ts # Redux store configuration
```
