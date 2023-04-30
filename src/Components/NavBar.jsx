import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    <Navbar bg="light" expand="lg" id='NavBar'>
      <Container fluid  id='NavMenu'>
        {/* Brand */}
        <Navbar.Brand href="/">Photo Share</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        {/* BurgerMenu */}
        <Navbar.Collapse id="navbarScroll" >
          {/* Menu */}
          <Nav className='d-flex gap-3'>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#action1">Explore</Nav.Link>
              <Button variant="primary" href='/upload'>Upload</Button>
          </Nav>
          
        </Navbar.Collapse>
        {/* DropDown */}
        <NavDropdown title="Username" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
          <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">Log Out</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}

export default NavBar;