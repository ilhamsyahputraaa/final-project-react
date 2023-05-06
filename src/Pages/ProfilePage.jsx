import {Container,  Row, Col, Button, Nav, Tabs, Tab} from 'react-bootstrap';
import AvatarImage from '../assets/PlaceHolder/100.png';
import NavBar from '../Components/NavBar';
import PostCard from '../Components/PostCard';
import PostCardSmall from '../Components/PostCardSmall';

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
              <Row className='col-3'> <p>Photos</p> <h2>3</h2></Row>
              <Row className='col-3'> <p>Liked</p> <h2>42</h2></Row>
              <Row className='col-3'> <p>Following</p> <h2>12</h2></Row>
              <Row className='col-3'> <p>Followers</p> <h2>42</h2></Row>
            </Col>

        </Container>

        <Container className='justify-content-center'>
          <Tabs variant="pills" defaultActiveKey="tab-1"  className='justify-content-center'>

              {/* Tab Post */}
              <Tab eventKey="tab-1" title="Post">
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
                </Row>
              </Tab>

              {/* Tab Liked */}
              <Tab eventKey="tab-2" title="Liked">
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
                </Row>
              </Tab>

              {/* Tab Following */}
              <Tab eventKey="tab-3" title="Following">
              <Container className='Content '>

                {/* Following Item */}
                <div className='d-flex FollowingAcc mb-3'>
                  <div className='d-flex gap-2 RecAcc'>
                    <img src={AvatarImage} alt="" className='AvatarImage' />
                      <Row>
                        <h6>ilhamsyahzp</h6> 
                        <p>Ilhamsyah Putra</p>
                      </Row> 
                  </div >
                  <div className=' RecAcc'><Button variant="secondary">Unfollow</Button> </div>
                </div>

                
                {/* Following Item */}
                <div className='d-flex FollowingAcc mb-3'>
                  <div className='d-flex gap-2 RecAcc'>
                    <img src={AvatarImage} alt="" className='AvatarImage' />
                      <Row>
                        <h6>ilhamsyahzp</h6> 
                        <p>Ilhamsyah Putra</p>
                      </Row> 
                  </div >
                  <div className=' RecAcc'><Button variant="secondary">Unfollow</Button> </div>
                </div>
                
                {/* Following Item */}
                <div className='d-flex FollowingAcc mb-3'>
                  <div className='d-flex gap-2 RecAcc'>
                    <img src={AvatarImage} alt="" className='AvatarImage' />
                      <Row>
                        <h6>ilhamsyahzp</h6> 
                        <p>Ilhamsyah Putra</p>
                      </Row> 
                  </div >
                  <div className=' RecAcc'><Button variant="secondary">Unfollow</Button> </div>
                </div>
                
                {/* Following Item */}
                <div className='d-flex FollowingAcc mb-3'>
                  <div className='d-flex gap-2 RecAcc'>
                    <img src={AvatarImage} alt="" className='AvatarImage' />
                      <Row>
                        <h6>ilhamsyahzp</h6> 
                        <p>Ilhamsyah Putra</p>
                      </Row> 
                  </div >
                  <div className=' RecAcc'><Button variant="secondary">Unfollow</Button> </div>
                </div>
              </Container>
              </Tab>

              {/* Tab Followers */}
              <Tab eventKey="tab-4" title="Followers">
              <Container className='Content '>

                {/* Following Item */}
                <div className='d-flex FollowingAcc mb-3'>
                  <div className='d-flex gap-2 RecAcc'>
                    <img src={AvatarImage} alt="" className='AvatarImage' />
                      <Row>
                        <h6>ilhamsyahzp</h6> 
                        <p>Ilhamsyah Putra</p>
                      </Row> 
                  </div >
                  <div className=' RecAcc'><Button variant="primary">Follow</Button> </div>
                </div>

                {/* Following Item */}
                <div className='d-flex FollowingAcc mb-3'>
                  <div className='d-flex gap-2 RecAcc'>
                    <img src={AvatarImage} alt="" className='AvatarImage' />
                      <Row>
                        <h6>ilhamsyahzp</h6> 
                        <p>Ilhamsyah Putra</p>
                      </Row> 
                  </div >
                  <div className=' RecAcc'><Button variant="primary">Follow</Button> </div>
                </div>
                
                {/* Following Item */}
                <div className='d-flex FollowingAcc mb-3'>
                  <div className='d-flex gap-2 RecAcc'>
                    <img src={AvatarImage} alt="" className='AvatarImage' />
                      <Row>
                        <h6>ilhamsyahzp</h6> 
                        <p>Ilhamsyah Putra</p>
                      </Row> 
                  </div >
                  <div className=' RecAcc'><Button variant="secondary">Unfollow</Button> </div>
                </div>
                
                {/* Following Item */}
                <div className='d-flex FollowingAcc mb-3'>
                  <div className='d-flex gap-2 RecAcc'>
                    <img src={AvatarImage} alt="" className='AvatarImage' />
                      <Row>
                        <h6>ilhamsyahzp</h6> 
                        <p>Ilhamsyah Putra</p>
                      </Row> 
                  </div >
                  <div className=' RecAcc'><Button variant="secondary">Unfollow</Button> </div>
                </div>

              </Container>
              </Tab>
          </Tabs>
        </Container>
      </div>
    </div>
    
    
    </>
  );
}

export default ProfilePage;