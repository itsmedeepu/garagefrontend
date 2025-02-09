import React, { useState, Suspense, useEffect } from "react";
import {
  useRouteLoaderData,
  Await,
  Form,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  TablePagination,
  InputAdornment,
  LinearProgress,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

function ViewProfessinoals() {
  const { profdata } = useRouteLoaderData("viewallprofs");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const navigate = useNavigation();
  const navigation = useNavigation();
  const data = useActionData();
  const submit = useSubmit();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (userid) => {
    submit({ formtype: "delete", userid }, { method: "post" });
  };

  const handleEdit = (user) => {
    setEditedUser({ ...user });
    setEditModalOpen(true);
  };

  const handleClose = () => {
    setEditModalOpen(false);
    setEditedUser(null);
  };

  useEffect(() => {
    if (data && data?.status == 200) {
      handleClose();
    }
  }, [data, navigation.state]);
  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        All Professinoals
      </Typography>
      <Suspense fallback={<LinearProgress />}>
        <Await resolve={profdata}>
          {(prof) => {
            const filteredProfs = prof.filter((user) =>
              Object.values(user).some(
                (value) =>
                  value && value.toString().toLowerCase().includes(searchTerm)
              )
            );

            return (
              <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
                <TextField
                  variant="outlined"
                  placeholder="Search users..."
                  fullWidth
                  value={searchTerm}
                  onChange={handleSearch}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <TableContainer>
                  <Table stickyHeader aria-label="user table">
                    <TableHead>
                      <TableRow>
                        <TableCell>SI No</TableCell>
                        <TableCell>Professional ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredProfs
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((user, index) => (
                          <TableRow hover key={user.id}>
                            <TableCell>
                              {page * rowsPerPage + index + 1}
                            </TableCell>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone || "N/A"}</TableCell>
                            <TableCell>
                              <IconButton
                                color="primary"
                                onClick={() => handleEdit(user)}
                              >
                                <Edit />
                              </IconButton>
                              <IconButton
                                color="error"
                                onClick={() => handleDelete(user.id)}
                              >
                                <Delete />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredProfs.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />

                {editedUser && (
                  <Dialog open={editModalOpen} onClose={handleClose}>
                    <Form method="post" action="">
                      <DialogTitle>Edit User</DialogTitle>
                      <input
                        type="hidden"
                        name="profid"
                        value={editedUser.id}
                      />
                      <DialogContent>
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Name"
                          fullWidth
                          name="name"
                          defaultValue={editedUser.name}
                        />
                        <TextField
                          margin="dense"
                          label="Email"
                          fullWidth
                          name="email"
                          defaultValue={editedUser.email}
                        />
                        <TextField
                          margin="dense"
                          label="Phone"
                          fullWidth
                          name="phone"
                          defaultValue={editedUser.phone || ""}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">
                          {" "}
                          {navigate.state === "submitting"
                            ? "Updating.."
                            : "Update"}
                        </Button>
                      </DialogActions>
                    </Form>
                  </Dialog>
                )}
              </Paper>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

export default ViewProfessinoals;
