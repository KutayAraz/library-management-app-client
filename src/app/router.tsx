import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/components/main-layout";
import { BookDetailsPage } from "@/pages/book-details";
import { BooksPage } from "@/pages/books";
import { UsersPage } from "@/pages/users";
import { UserDetailsPage } from "@/pages/user-details";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <BooksPage />, // Using BooksPage as the landing page
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/users/:id",
        element: <UserDetailsPage />,
      },
      {
        path: "/books",
        element: <BooksPage />,
      },
      {
        path: "/books/:id",
        element: <BookDetailsPage />,
      },
    ],
  },
]);
