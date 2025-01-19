import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Alert,
} from "@mui/material";
import { useGetUserByIdQuery, useReturnBookMutation } from "@/store/apis/library-api";
import { ReturnBookDialog } from "@/components/return-book-dialog";
import { BorrowedBook } from "@/types";
import ErrorAlert from "@/components/error-alert";
import LoadingSpinner from "@/components/loading-spinner";

export const UserDetailsPage = () => {
  // State management for the return book dialog
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BorrowedBook | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get user ID from URL parameters
  const { id } = useParams<{ id: string }>();

  // RTK Query hooks
  const { data: user, isLoading, error: fetchError } = useGetUserByIdQuery(Number(id));
  const [returnBook, { isLoading: isReturning }] = useReturnBookMutation();

  // Loading and error states
  if (isLoading) return <LoadingSpinner />;

  // Error state
  if (fetchError || !user)
    return (
      <ErrorAlert message={`${fetchError ? "Error loading user details" : "User not found"}`} />
    );

  const handleReturnBook = async (score: number) => {
    if (!selectedBook) return;

    try {
      setError(null);
      await returnBook({
        userId: user.id,
        bookId: selectedBook.id,
        score,
      }).unwrap();
      setReturnDialogOpen(false);
      setSelectedBook(null);
    } catch (err) {
      setError("Failed to return book. Please try again.");
      console.error("Failed to return book:", err);
    }
  };

  const openReturnDialog = (book: BorrowedBook) => {
    setSelectedBook(book);
    setReturnDialogOpen(true);
    setError(null);
  };

  return (
    <Paper sx={{ p: 3 }}>
      {/* User Header */}
      <Typography variant="h4" gutterBottom>
        {user.name}
      </Typography>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {/* Currently Borrowed Books Section */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Currently Borrowed Books
      </Typography>
      <List>
        {user.books.present.length === 0 ? (
          <ListItem>
            <ListItemText primary="No books currently borrowed" />
          </ListItem>
        ) : (
          user.books.present.map((book) => (
            <ListItem
              key={book.id}
              secondaryAction={
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => openReturnDialog(book)}
                  disabled={isReturning}
                >
                  Return
                </Button>
              }
            >
              <ListItemText primary={book.name} />
            </ListItem>
          ))
        )}
      </List>

      {/* Previously Borrowed Books Section */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>
        Previously Borrowed Books
      </Typography>
      <List>
        {user.books.past.length === 0 ? (
          <ListItem>
            <ListItemText primary="No borrowing history" />
          </ListItem>
        ) : (
          user.books.past.map((book) => (
            <ListItem key={book.id}>
              <ListItemText primary={book.name} secondary={`Your Rating: ${book.userScore}/10`} />
            </ListItem>
          ))
        )}
      </List>

      {/* Return Book Dialog */}
      <ReturnBookDialog
        open={returnDialogOpen}
        bookName={selectedBook?.name || ""}
        onClose={() => {
          setReturnDialogOpen(false);
          setSelectedBook(null);
          setError(null);
        }}
        onSubmit={handleReturnBook}
      />
    </Paper>
  );
};
