import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        {/* Brand */}
        <Navbar.Brand href="#">InstaReal</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        {/* BurgerMenu */}
        <Navbar.Collapse id="navbarScroll">
          {/* Menu */}
          <Nav>
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action1">Explore</Nav.Link>
          </Nav>
          {/* DropDown */}
          <NavDropdown title="Username" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">View Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Log Out</NavDropdown.Item>
            </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;