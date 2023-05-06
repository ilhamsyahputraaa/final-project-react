import {Button, Card, Row, Col, Container} from 'react-bootstrap';
import BigImage from '../assets/PlaceHolder/1000.png';
import SmallImage from '../assets/PlaceHolder/100.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHeart, faComment } from '@fortawesome/free-solid-svg-icons'



function PostCard() {
  return (
    <Card style={{ width: '100%' }} id='PostCard'>
      <Col id='UserPost'onClick={() => window.location.assign("/profile")}>
        <Col id='UserName' >
            <div id='AvatarImage'><img src={SmallImage} alt="" className='AvatarPost' /></div>
            UserName
      </Col>
      </Col>
      <Card.Img variant="top" src={BigImage} onClick={() => window.location.assign("/detail")}/>
      <Card.Body className='d-flex row gap-3'>
        <Col id='ActionButtonPost' >
        <FontAwesomeIcon icon={faHeart} />
        <FontAwesomeIcon icon={faComment} />
        </Col>
        <div className='Likes'>2,331 Likes</div>
        <Card.Text >Last updated 3 mins ago</Card.Text>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Col>
        <Button variant="primary" href='/detail'>View Post</Button>
        </Col>
      </Card.Body>
    </Card>
  );
}

export default PostCard;