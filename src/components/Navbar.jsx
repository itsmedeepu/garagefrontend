import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router"; // Corrected import

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">Garage App</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          onClick={() => setShowNav(!showNav)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={showNav}>
          <div className="d-flex justify-content-end w-100">
            <MDBNavbarNav
              right
              className="justify-content-end align-items-center"
            >
              <MDBNavbarItem>
                <NavLink
                  to=""
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  end
                >
                  Home
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <NavLink
                  to="about"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  About us
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <NavLink
                  to="contact"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Contact us
                </NavLink>
              </MDBNavbarItem>

              {/* Login Dropdown */}
              <MDBNavbarItem className="ms-2">
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link">
                    <MDBIcon icon="user" className="me-2" />
                    Logins
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link tag={NavLink} to="user/login">
                      User Login
                    </MDBDropdownItem>
                    <MDBDropdownItem link tag={NavLink} to="professional/login">
                      Professional Login
                    </MDBDropdownItem>
                    <MDBDropdownItem link tag={NavLink} to="admin/login">
                      Admin Login
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
