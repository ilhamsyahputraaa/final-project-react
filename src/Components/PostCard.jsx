import {Button, Card, Row, Col, Container} from 'react-bootstrap';
import BigImage from '../assets/PlaceHolder/1000.png';
import SmallImage from '../assets/PlaceHolder/100.png'
import { Figure } from 'react-bootstrap';


function PostCard() {
  return (
    <Card style={{ width: '32rem' }}>
        <Row>
            <Col>
            <Img></Img></Col>
            <Col>Username</Col>
            <Col></Col>
        </Row>
        <Container className='d-flex'>
            
            <p></p>
        </Container>
      <Card.Img variant="top" src={BigImage} />
      <Card.Body>
        <div className='actionButton'>
        </div>
        <div className='Likes'>2,331 Likes</div>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">View Coments</Button>
      </Card.Body>
    </Card>
  );
}

export default PostCard;