import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "../store/apis/library-api";
import ErrorAlert from "@/components/error-alert";
import LoadingSpinner from "@/components/loading-spinner";

export const BooksPage = () => {
  const navigate = useNavigate();
  const { data: books, isLoading, error } = useGetBooksQuery();

  // Loading and error states
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Error loading books" />;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Library Books
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books?.map((book) => (
              <TableRow
                key={book.id}
                hover
                onClick={() => navigate(`/books/${book.id}`)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.name}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
