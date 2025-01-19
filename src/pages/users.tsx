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
import { useGetUsersQuery } from "../store/apis/library-api";
import ErrorAlert from "@/components/error-alert";
import LoadingSpinner from "@/components/loading-spinner";

export const UsersPage = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, error } = useGetUsersQuery();

  // Loading and error states
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Error loading users" />;

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
