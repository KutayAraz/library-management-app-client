import { PastBook, BorrowedBook } from "@/types";

export interface User {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  name: string;
  author: string;
  year: number;
  currentOwner: string | null;
  score: number;
}

export interface UserDetails {
  id: number;
  name: string;
  books: {
    past: PastBook[];
    present: BorrowedBook[];
  };
}

export interface BorrowBookArgs {
  userId: number;
  bookId: number;
}

export interface ReturnBookArgs {
  userId: number;
  bookId: number;
  score: number;
}
