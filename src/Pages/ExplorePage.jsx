import {Container,  Row, Col, Button, Nav, Tabs, Tab} from 'react-bootstrap';
import AvatarImage from '../assets/PlaceHolder/100.png';
import NavBar from '../Components/NavBar';
import PostCardSmall from '../Components/PostCardSmall';

function ExplorePage() {
  return (
    <>
    <NavBar />
    <div className='body d-flex row'>
      <div className='Content d-flex row gap-5 col-6'>
        <Row className='Content d-flex row PhotoGrid'>
            <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} className='PhotoGridItem'>
            <PostCardSmall/>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} className='PhotoGridItem'>
            <PostCardSmall/>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} className='PhotoGridItem'>
            <PostCardSmall/>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} className='PhotoGridItem'>
            <PostCardSmall/>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} className='PhotoGridItem'>
            <PostCardSmall/>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} className='PhotoGridItem'>
            <PostCardSmall/>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} className='PhotoGridItem'>
            <PostCardSmall/>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} className='PhotoGridItem'>
            <PostCardSmall/>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} className='PhotoGridItem'>
            <PostCardSmall/>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} className='PhotoGridItem'>
            <PostCardSmall/>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} className='PhotoGridItem'>
            <PostCardSmall/>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} className='PhotoGridItem'>
            <PostCardSmall/>
            </Col>
            
        </Row>
      </div>
    </div>
    
    
    </>
  );
}

export default ExplorePage;