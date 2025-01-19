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
import { useGetUsersQuery } from "../store/apis/library-api";

export const UsersPage = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, error } = useGetUsersQuery();

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Typography color="error">Error loading users</Typography>;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Library Members
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow
                key={user.id}
                hover
                onClick={() => navigate(`/users/${user.id}`)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>View Details</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
