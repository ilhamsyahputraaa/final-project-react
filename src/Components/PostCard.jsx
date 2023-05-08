import {Button, Card, Row, Col, Container} from 'react-bootstrap';
import BigImage from '../assets/PlaceHolder/1000.png';
import SmallImage from '../assets/PlaceHolder/100.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHeart, faComment } from '@fortawesome/free-solid-svg-icons'



function PostCard(props) {
  return (
    <Card style={{ width: '100%' }} id='PostCard'>
      <Col id='UserPost'onClick={() => window.location.assign("/profile")}>
        <Col id='UserName' >
            <div id='AvatarImage'><img src={props.avatar} alt="" className='AvatarPost' /></div>
            {props.username}
      </Col>
      </Col>
      <Card.Img variant="top" src={props.postImage} onClick={() => window.location.assign(`/detail?postId=${props.postId}`)}/>
      <Card.Body className='d-flex row gap-3'>
        <Col id='ActionButtonPost' >
        <FontAwesomeIcon icon={faHeart} onClick={props.handleLike} />
        <FontAwesomeIcon icon={faComment} onClick={() => window.location.assign("/detail")} />
        </Col>
        <div className='Likes'>{props.likes} Likes</div>
        <Card.Text >Last updated {props.lastUpdate}</Card.Text>
        <Card.Text>
          <span><h6>{props.username}</h6>{props.caption}</span><span></span>
          
        </Card.Text>
        <Col>
          <Button variant="primary" href={`/detail?postId=${props.postId}`}>View Post</Button>
        </Col>
      </Card.Body>
    </Card>
  );
}

export default PostCard;