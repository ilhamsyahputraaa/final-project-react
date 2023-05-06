
import LargeImage from '../assets/PlaceHolder/500.png';
import SmallImage from '../assets/PlaceHolder/100.png';
import {Card, Col} from 'react-bootstrap';

function PostCardSmall() {
  return (
    <Card className="bg-dark text-white">
      <Card.Img src={LargeImage} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Text >Last updated 3 mins ago</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}

export default PostCardSmall;