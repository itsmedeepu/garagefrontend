import React, { Suspense, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  MdDashboard,
  MdAnalytics,
  MdInventory,
  MdCarCrash,
  MdCarRepair,
  MdCarRental,
  MdBookOnline,
} from "react-icons/md";
import { FiSettings, FiMenu, FiLogOut } from "react-icons/fi";
import { ToastContainer, toast, Bounce } from "react-toastify";
import {
  Await,
  NavLink,
  Link,
  useRouteLoaderData,
  Form,
  redirect,
  Navigate,
  useNavigate,
  useLoaderData,
} from "react-router";

const drawerWidth = 240;

const Dashboard = ({
  children,
  profileImage = "https://via.placeholder.com/40",
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const { userdata } = useRouteLoaderData("maindashboard");

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sidebarItems = [
    { icon: <MdDashboard />, text: "Dashboard", link: "" },
    { icon: <MdBookOnline />, text: "Book Service", link: "bookservice" },
    { icon: <MdInventory />, text: "Booked services", link: "viewbookings" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${isSidebarOpen ? drawerWidth : 0}px)`,
          ml: isSidebarOpen ? `${drawerWidth}px` : 0,
          bgcolor: "#1976D2",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Sidebar Toggle */}
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FiMenu />
          </IconButton>

          {/* Profile Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Suspense fallback={<p>Loading....</p>}>
              <Await resolve={userdata}>
                {(user) => <Typography variant="h6">{user?.name}</Typography>}
              </Await>
            </Suspense>

            <IconButton onClick={handleProfileClick}>
              <Avatar src={profileImage} sx={{ width: 40, height: 40 }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to="profile">
                  {" "}
                  <FiSettings /> Profile Settings
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Form action="/garage/user/logout" method="post">
                  <button>
                    {" "}
                    <FiLogOut /> Logout
                  </button>
                </Form>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="persistent"
        open={isSidebarOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#263238",
            color: "white",
          },
        }}
      >
        <Toolbar />
        <List>
          {sidebarItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.link}
                sx={{
                  "&.active": {
                    backgroundColor: "#455A64", // Highlight active link
                    color: "white",
                  },
                }}
                end
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "auto",
          mt: 8,
        }}
      >
        {children}
      </Box>

      {/* Main Content */}
    </Box>
  );
};

export default Dashboard;
