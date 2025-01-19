import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Box,
  Rating,
  Divider,
  Stack,
} from "@mui/material";
import {
  useGetBookByIdQuery,
  useGetUsersQuery,
  useBorrowBookMutation,
} from "@/store/apis/library-api";
import LoadingSpinner from "@/components/loading-spinner";
import ErrorAlert from "@/components/error-alert";

export const BookDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // RTK Query hooks with loading states
  const { data: book, isLoading: isLoadingBook } = useGetBookByIdQuery(Number(id));
  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  // Loading and error states
  if (isLoadingBook) return <LoadingSpinner />;
  if (!book) return <ErrorAlert message="Book not Found" />;

  const handleBorrow = async () => {
    try {
      setError(null);
      // Convert string back to number for API call
      await borrowBook({
        userId: parseInt(selectedUser, 10),
        bookId: book.id,
      }).unwrap();
      setDialogOpen(false);
      setSelectedUser("");
    } catch (err) {
      setError("Failed to borrow book. Please try again.");
      console.error("Failed to borrow book:", err);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedUser("");
    setError(null);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      {/* Book Details Section */}
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {book.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            by {book.author}
          </Typography>
        </Box>

        <Divider />

        {/* Book Information */}
        <Stack spacing={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1" sx={{ minWidth: 120 }}>
              Publication Year:
            </Typography>
            <Typography variant="body1">{book.year}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1" sx={{ minWidth: 120 }}>
              Rating:
            </Typography>
            {book.score === -1 ? (
              <Typography variant="body1" color="text.secondary">
                No ratings yet
              </Typography>
            ) : (
              <Box display="flex" alignItems="center" gap={1}>
                <Rating value={book.score / 2} precision={0.5} readOnly />
                <Typography variant="body1">({book.score}/10)</Typography>
              </Box>
            )}
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1" sx={{ minWidth: 120 }}>
              Status:
            </Typography>
            <Typography variant="body1" color={book.currentOwner ? "error.main" : "success.main"}>
              {book.currentOwner ? `Borrowed by ${book.currentOwner}` : "Available"}
            </Typography>
          </Box>
        </Stack>

        {/* Borrow Button */}
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setDialogOpen(true)}
            disabled={!!book.currentOwner}
            fullWidth
          >
            {book.currentOwner ? "Currently Unavailable" : "Borrow Book"}
          </Button>
        </Box>
      </Stack>

      {/* Borrow Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: { width: "100%", maxWidth: 500 },
        }}
      >
        <DialogTitle>Borrow "{book.name}"</DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="user-select-label">Select User</InputLabel>
            <Select
              labelId="user-select-label"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              label="Select User"
              disabled={isLoadingUsers || isBorrowing}
            >
              {isLoadingUsers ? (
                <MenuItem disabled>Loading users...</MenuItem>
              ) : (
                users?.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} disabled={isBorrowing}>
            Cancel
          </Button>
          <Button
            onClick={handleBorrow}
            disabled={!selectedUser || isBorrowing}
            variant="contained"
          >
            {isBorrowing ? "Borrowing..." : "Borrow"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
