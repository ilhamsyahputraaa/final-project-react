import {Card, Col} from 'react-bootstrap';

function PostCardSmall(props) {
  return (
    <Card className="bg-dark text-white" onClick={() => window.location.assign(`/detail?postId=${props.postId}`)}>
      <Card.Img src={props.imageUrl} alt="Card image" style={{ width: "100%", height: "100%", objectFit: "cover", aspectRatio: "1/1" }}  />
      <Card.ImgOverlay>
        <Card.Text >{props.updatedAt}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}

export default PostCardSmall;