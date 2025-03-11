import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Drawer,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonIcon from "@mui/icons-material/Person";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LockIcon from "@mui/icons-material/Lock";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import StraightIcon from "@mui/icons-material/Straight";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Store/reducers/theme/themeSlice";
import {
  addUser,
  changeStatus,
  deleteUser,
  editUser,
  searchByName,
  selectByCity,
  selectByStatus,
} from "../Store/reducers/tableUser/tableUserSlice/tableUserSlice";

export default function TableUser() {
  const dispatch = useDispatch();
  const users = useSelector((state) =>
    state.users.filteredData?.length
      ? state.users.filteredData
      : state.users.data
  );
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [status, setStatus] = useState("");
  const [city, setCity] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openModalEdit, setOpenModalEdit] = React.useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const open = Boolean(anchorEl);
  const handleChange = (event) => setStatus(event.target.value);
  const handleChangeCity = (event) => setCity(event.target.value);

  const handleClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(user.id);
    setSelectedUser(user);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
    setOpenModalEdit(false);
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
    handleClose();
  };
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleOpenModalEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
    setOpenModalEdit(true);
    setIsDrawerOpen(false)
  };

  const handleOpenModalAdd = () => {
    setSelectedUser({
      avatar: "",
      name: "",
      email: "",
      city: "",
      status: "",
      phone: "",
    });
    setIsEditing(false);
    setOpenModalEdit(true);
  };

  return (
    <Container sx={{
      backgroundColor: darkMode ? "#121212" : "#ffffff",
      color: darkMode ? "#ffffff" : "#000000",
      minHeight: "100vh",
      transition: "0.3s all ease-in-out",
    }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          User List
        </Typography>
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Button variant="contained" onClick={handleOpenModalAdd}>
            + NEW
          </Button>
          <ButtonGroup>
          <Button
            color="inherit"
            sx={{ fontWeight: "bold" }}
            onClick={() => dispatch(toggleTheme())}
          >
            {darkMode ? (
              <>
                <LightModeIcon /> Light
              </>
            ) : (
              <>
                <DarkModeIcon /> Dark
              </>
            )}
          </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10vh 0",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", gap: "20px" }}>
          <FormControl sx={{ width: "20%",color: darkMode ? "#ffffff" : "#000000" }}>
            <InputLabel sx={{color: darkMode ? "#ffffff" : "#000000"}}>Status</InputLabel>
            <Select sx={{color: darkMode ? "#ffffff" : "#000000",}}  value={status}
              onChange={(e) => {
                handleChange(e);
                dispatch(selectByStatus(e.target.value));
              }}>
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
          </FormControl>
          <FormControl  sx={{ width: "20%" ,color: darkMode ? "#ffffff" : "#000000" }}>
            <InputLabel sx={{color: darkMode ? "#ffffff" : "#000000"}}>City</InputLabel>
            <Select
            
            sx={{color: darkMode ? "#ffffff" : "#000000"}}
              value={city}
              onChange={(e) => {
                handleChangeCity(e);
                dispatch(selectByCity(e.target.value));
              }}
            >
              <MenuItem value="Dushanbe">Dushanbe</MenuItem>
              <MenuItem value="Bokhtar">Bokhtar</MenuItem>
              <MenuItem value="Kulob">Kulob</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          color={darkMode?"info" : "inherit"}
          onChange={(e) => dispatch(searchByName(e.target.value))}
          label="Search"
          placeholder="name, e-mail, etc..."
          focused
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: darkMode?"#000000": "#F8F9FD"}}>
              <TableCell sx={{ color: darkMode ? "#ffffff" : "#000000" }}>
                <PersonIcon fontSize="small" /> Name
              </TableCell>
              <TableCell sx={{ color: darkMode ? "#ffffff" : "#000000" }}>
                <LockIcon fontSize="small" /> City
              </TableCell>
              <TableCell sx={{ color: darkMode ? "#ffffff" : "#000000" }}>
                <AccessTimeFilledIcon fontSize="small" /> Status{" "}
                <StraightIcon fontSize="small" />
              </TableCell>
              <TableCell sx={{ color: darkMode ? "#ffffff" : "#000000" }}>
                <PhoneEnabledIcon fontSize="small" /> Phone
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell
                  sx={{ display: "flex", alignItems: "center", gap: "10px", color: darkMode ? "#ffffff" : "#000000" }}
                >
                  <Avatar alt={user.name} src={user.avatar} />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6" color="primary">
                      {user.name}
                    </Typography>
                    <Typography variant="body2">{user.email}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: darkMode ? "#ffffff" : "#000000"}}>{user.city}</TableCell>
                <TableCell sx={{ color: darkMode ? "#ffffff" : "#000000"}}>
                  <Button
                    sx={{ width: "80px" }}
                    color={user.status ? "success" : "inherit"}
                    variant="contained"
                    onClick={() => dispatch(changeStatus(user.id))}
                  >
                    {user.status ? "ACTIVE" : "INACTIVE"}
                  </Button>
                </TableCell>
                <TableCell sx={{ color: darkMode ? "#ffffff" : "#000000"}}>{user.phone}</TableCell>
                <TableCell sx={{ color: darkMode ? "#ffffff" : "#000000"}}>
                  <Button
                    onClick={(event) => handleClick(event, user)}
                    aria-controls={open ? "menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <MoreHorizIcon fontSize="large" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem onClick={openDrawer}>
          <AccountCircleIcon /> <Typography>View profile</Typography>
        </MenuItem>
        <MenuItem
          onClick={()=>handleOpenModalEdit(selectedUser)}
          sx={{ borderBottom: "1px solid lightgrey" }}
        >
          <CreateIcon /> <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(deleteUser(selectedUserId));
            handleClose();
          }}
        >
          <DeleteIcon color="error" />
          <Typography color="error">Delete</Typography>
        </MenuItem>
      </Menu>
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
        <Box sx={{ width: 300, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "2px solid lightgrey",
              padding: "3vh 0",
              width: "100%",
            }}
          >
            <Button
              color="error"
              variant="contained"
              size="small"
              onClick={closeDrawer}
            >
              X
            </Button>
            <Typography variant="h6">User info</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              borderBottom: "2px solid lightgrey",
              height: "45vh",
              justifyContent: "center",
              gap: "3vh",
            }}
          >
            <Avatar
              sx={{ width: "125px", height: "135px" }}
              alt="usersAvatar"
              src={selectedUser.avatar}
            ></Avatar>
            <Typography>{selectedUser.name}</Typography>
            <Typography>{selectedUser.email}</Typography>
          </Box>
          <Box sx={{ borderBottom: "2px solid lightgrey" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "15px 0",
                alignItems: "center",
              }}
            >
              <Typography>
                <LockIcon fontSize="smal" /> City
              </Typography>
              <Typography>{selectedUser.city}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "15px 0",
                alignItems: "center",
              }}
            >
              <Typography>
                <LockIcon fontSize="smal" /> Status
              </Typography>
              <Typography>
                <Button
                  sx={{ width: "80px" }}
                  color={selectedUser.status ? "success" : "inherit"}
                  variant="contained"
                  onClick={() => dispatch(changeStatus(selectedUser.id))}
                >
                  {selectedUser.status ? "ACTIVE" : "INACTIVE"}
                </Button>
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "15px 0",
                alignItems: "center",
              }}  
            >
              <Typography>
                <LockIcon fontSize="smal" /> Phone
              </Typography>
              <Typography>{selectedUser.phone}</Typography>
            </Box>
          </Box>
          <Box sx={{display:"flex",justifyContent:"space-between", margin:"5vh"}}>
            <Button variant="contained" color="primary" onClick={()=>handleOpenModalEdit(selectedUser)}><EditIcon/> Edit</Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                dispatch(deleteUser(selectedUser.id));
                closeDrawer();
              }}
            >
              <DeleteIcon color="error" /> Delete
            </Button>
          </Box>
        </Box>
      </Drawer>
      <Modal
        open={openModalEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "none",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2vh",
            textAlign: "center",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "2px solid lightgrey",
              padding: "10px 0",
            }}
          >
            <Typography variant="h5">Add new</Typography>
            <Button onClick={handleClose} color="inherit">
              X
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2vh",
              textAlign: "center",
              width: "90%",
              p: 2,
            }}
          >
            <TextField
              value={selectedUser?.avatar || ""}
              onChange={(e) =>
                setSelectedUser((prev) => ({ ...prev, avatar: e.target.value }))
              }
              label="image"
              focused
              color="inherit"
              placeholder=".png/ .jpg/ .jpeg"
              sx={{ width: "100%" }}
            />

            <TextField
              value={selectedUser?.name || ""}
              onChange={(e) =>
                setSelectedUser((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Name"
              sx={{ width: "100%" }}
            />

            <TextField
              value={selectedUser?.email || ""}
              onChange={(e) =>
                setSelectedUser((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="E-mail"
              sx={{ width: "100%" }}
            />

            <FormControl sx={{ width: "100%" }}>
              <InputLabel color="inherit">Choose Status</InputLabel>
              <Select
                value={selectedUser?.status || ""}
                onChange={(e) =>
                  setSelectedUser((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
                label="choose status"
                color="inherit"
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ width: "100%" }}>
              <InputLabel color="inherit">City</InputLabel>
              <Select
                value={selectedUser?.city || ""}
                onChange={(e) =>
                  setSelectedUser((prev) => ({ ...prev, city: e.target.value }))
                }
                label="city"
                color="inherit"
              >
                <MenuItem value="Dushanbe">Dushanbe</MenuItem>
                <MenuItem value="Bokhtar">Bokhtar</MenuItem>
                <MenuItem value="Kulob">Kulob</MenuItem>
              </Select>
            </FormControl>

            <TextField
              value={selectedUser?.phone || ""}
              onChange={(e) =>
                setSelectedUser((prev) => ({ ...prev, phone: e.target.value }))
              }
              label="phone"
              focused
              color="inherit"
              placeholder="phone number"
              sx={{ width: "100%" }}
            />
            <Box
              sx={{
                display: "flex",
                gap: "30px",
                justifyContent: "start",
                width: "100%",
                borderTop: "2px solid lightgrey",
                padding: "10px 0",
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  if (isEditing) {
                    dispatch(editUser(selectedUser));
                  } else {
                    dispatch(addUser({ ...selectedUser, id: Date.now() }));
                  }
                  handleClose();
                }}
              >
                {isEditing ? "Save" : "Add"}
              </Button>

              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
