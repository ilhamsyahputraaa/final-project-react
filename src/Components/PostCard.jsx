import {Button, Card, Row, Col, Container} from 'react-bootstrap';
import BigImage from '../assets/PlaceHolder/1000.png';
import SmallImage from '../assets/PlaceHolder/100.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faHeart, faComment } from '@fortawesome/free-solid-svg-icons'



function PostCard() {
  return (
    <Card style={{ width: '32rem' }}>
      <Col id='UserPost'>
        <Col id='UserName'>
            <div id='AvatarImage'><img src={SmallImage} alt="" className='AvatarPost' /></div>
            UserName
      </Col>
      <FontAwesomeIcon icon={faEllipsisVertical} id='MoreButton'/>
      </Col>
      <Card.Img variant="top" src={BigImage} />
      <Card.Body>
        <Col id='ActionButtonPost'>
        <FontAwesomeIcon icon={faHeart} />
        <FontAwesomeIcon icon={faComment} />
        </Col>
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