import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Rating,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";

interface ReturnBookDialogProps {
  open: boolean;
  bookName: string;
  onClose: () => void;
  onSubmit: (score: number) => void;
}

export const ReturnBookDialog = ({ open, bookName, onClose, onSubmit }: ReturnBookDialogProps) => {
  const [rating, setRating] = useState<number>(0);

  const handleSubmit = () => {
    onSubmit(rating);
    setRating(0);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Return Book: {bookName}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, my: 2 }}>
          <Typography>Rate this book:</Typography>
          <Rating value={rating} onChange={(_, newValue) => setRating(newValue || 0)} max={10} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!rating}>
          Submit & Return
        </Button>
      </DialogActions>
    </Dialog>
  );
};
