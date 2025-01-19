export interface BorrowedBook {
  id: number;
  name: string;
}

export interface PastBook {
  id: number;
  name: string;
  userScore: number;
}

export interface UserDetails {
  id: number;
  name: string;
  books: {
    past: PastBook[];
    present: BorrowedBook[];
  };
}
