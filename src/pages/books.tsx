import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "../store/apis/library-api";

export const BooksPage = () => {
  const navigate = useNavigate();
  const { data: books, isLoading, error } = useGetBooksQuery();

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Typography color="error">Error loading books</Typography>;
  }

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
