import {Container,  Row, Col, Button, Nav} from 'react-bootstrap';
import AvatarImage from '../assets/PlaceHolder/100.png';
import NavBar from '../Components/NavBar';

function ProfilePage() {
  return (
    <>
    <NavBar />
    <div className='body d-flex row'>
      <div className='Content d-flex row gap-5 col-6'>
        <Container id='ProfileBadge' className='d-flex row'>
            <Col id='UserPost'>
              <Col className='d-flex UserName'>
                <img src={AvatarImage} alt="" className='AvatarImage'/>  
                <Row>
                  <h4>ilhamsyahzp</h4> 
                  <p>Ilhamsyah Putra</p>
                </Row> 
                
              </Col>
              <Button variant="primary">Edit Profile</Button>{' '}
            </Col>
            

            <Col className='d-flex UserName'> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> </Col>
            <Col className=' d-flex gap-4'>
              <Col className='d-flex UserName'><h6>Website</h6> <p>IlhamsyahPutra.com</p> </Col>
              <Col className='d-flex UserName'><h6>Phone Number</h6> <p>Ilhamsyah Putra</p> </Col>
            </Col>
            <Col className='d-flex mt-4 gap-5 UserNumber'>
              <Row> <p>Photos</p> <h2>3</h2></Row>
              <Row> <p>Following</p> <h2>12</h2></Row>
              <Row> <p>Followers</p> <h2>42</h2></Row>
            </Col>
        </Container>

        <Container>
          <Nav variant="pills" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link eventKey="link-1">Photos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2">Liked</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-3">Following</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-4">Followers</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </div>
    </div>
    
    
    </>
  );
}

export default ProfilePage;