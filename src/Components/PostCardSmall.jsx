import {Card, Col} from 'react-bootstrap';

function PostCardSmall(props) {
  return (
    <Card className="bg-dark text-white cardOverlay" onClick={() => window.location.assign(`/detail?postId=${props.postId}`)}>
      <Card.Img src={props.imageUrl} alt="Card image" style={{ width: "100%", height: "100%", objectFit: "cover", aspectRatio: "1/1" }} className='cardOverlayImg' />
      <Card.ImgOverlay className='cardOverlay d-flex gap-2'>
        <div className='d-flex gap-2 accountInfo'>
          <img src={props.profilImage} alt="" style={{ height: "2rem", objectFit: "cover", aspectRatio: "1/1", borderRadius:"100%" }}/>
          <div>
          <Card.Text ><h6>{props.username}</h6></Card.Text>
          <Card.Text >{props.name}</Card.Text>
          </div>
        </div>

      </Card.ImgOverlay>
    </Card>
  );
}

export default PostCardSmall;