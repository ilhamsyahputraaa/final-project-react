import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';

function NavBar() {

  const [isLogin, setIsLogin] = useState(false);
  const jwtToken = localStorage.getItem("token");

  const handleIsLogin = () => {
    localStorage.getItem("id") ? setIsLogin(true) : setIsLogin(false);
  };

  //Get My Followers List
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleIsLogin()
  
    if (isLogin) {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/user`,
      headers :{
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
    <Navbar bg="light" expand="lg" id='NavBar'>
      <Container fluid  id='NavMenu' >
        {/* Brand */}
        <Navbar.Brand href="/">Photo Share</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        {/* BurgerMenu */}
        <Navbar.Collapse id="navbarScroll" >
          {/* Menu */}
          <Nav className='d-flex gap-3'>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/explore">Explore</Nav.Link>
              <Nav.Link href="#action1">About</Nav.Link>
              <Button variant="primary" href='/upload'>Upload</Button>
          </Nav>
          
        </Navbar.Collapse>

        {/* DropDown */}
        {isLogin ? 
        (<NavDropdown title={localStorage.getItem("username")} id="navbarScrollingDropdown">
          <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
        </NavDropdown>): 
        (<Button variant="primary" onClick={() => window.location.assign("/login")}>Log In</Button> )}

      </Container>
    </Navbar>
  );
}

export default NavBar;