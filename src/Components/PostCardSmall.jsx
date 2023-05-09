
import LargeImage from '../assets/PlaceHolder/500.png';
import SmallImage from '../assets/PlaceHolder/100.png';
import {Card, Col} from 'react-bootstrap';

function PostCardSmall(props) {
  return (
    <Card className="bg-dark text-white">
      <Card.Img src={props.imageUrl} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Text >{props.updatedAt}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}

export default PostCardSmall;