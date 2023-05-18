import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import LogoImage from "../assets/PlaceHolder/Logo (3).png";

function NavBar() {
  const [isLogin, setIsLogin] = useState(false);
  const jwtToken = localStorage.getItem("token");
  const myId = localStorage.getItem("id");

  const handleIsLogin = () => {
    localStorage.getItem("id") ? setIsLogin(true) : setIsLogin(false);
  };

  // Handle Logout
  const handleLogout = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/logout`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${import.meta.env.VITE_REACT_JWT_TOKEN}`,
      },
    })
      .then((response) => {
        alert("You have logged out!");
        localStorage.removeItem("name");
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        setIsLogin(false);
        window.location.assign("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleIsLogin();

    if (isLogin) {
      axios({
        method: "get",
        url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/user`,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        },
      })
        .then()
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLogin, jwtToken]);

  return (
    <Navbar expand="lg" id="NavBar">
      <Container fluid id="NavMenu">
        {/* Brand */}
        <img src={LogoImage} alt="Logo Image" className="me-2" />
        <Navbar.Brand href="/home" className="col-3 NavLogo">
          PhotoShare
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        {/* BurgerMenu */}
        <Navbar.Collapse id="navbarScroll" className="col-6 NavMenus">
          {/* Menu */}
          <Nav className="d-flex gap-3">
            <Nav.Link href="/home" activeClassName="active-link">
              Feed
            </Nav.Link>
            <Nav.Link href="/explore" activeClassName="active-link">
              Explore
            </Nav.Link>
            <Button variant="primary" href="/upload" className="MainButton">
              Upload
            </Button>
          </Nav>

          {/* DropDown */}
          <div className="col-3 NavProfile NavProfileMobile">
            {isLogin ? (
              <NavDropdown
                title={localStorage.getItem("username")}
                id="navbarScrollingDropdown">
                <NavDropdown.Item href={`/profile?userId=${myId}`}>
                  View Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button
                variant="primary"
                onClick={() => window.location.assign("/")}
                className="MainButton">
                Log In
              </Button>
            )}
          </div>
        </Navbar.Collapse>

        {/* DropDown */}
        <div className="col-3 NavProfile NavProfileDesktop">
          {isLogin ? (
            <NavDropdown
              title={localStorage.getItem("username")}
              id="navbarScrollingDropdown">
              <NavDropdown.Item href={`/profile?userId=${myId}`}>
                View Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Button
              variant="primary"
              onClick={() => window.location.assign("/")}>
              Log In
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
