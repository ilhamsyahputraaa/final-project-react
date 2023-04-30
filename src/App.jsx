import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import NavBar from './Components/NavBar';
import PostCard from './Components/PostCard';
import AvatarImage from './assets/PlaceHolder/100.png';
import { Col, Row, Button, Container } from 'react-bootstrap';


function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Get All Post
  const getExploreList = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/explore-post?size=10&page=1`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${import.meta.env.VITE_REACT_JWT_TOKEN}`,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        // setMostFavorite(response.data.data.sort((a, b) => b.totalLikes - a.totalLikes).filter((e, i) => i < 3));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getExploreList();
  }, [isLoading]);

  return (
    <>
    <NavBar />
    <div className='body d-flex row gap-5 py-5'>
      {/* Sidebar Kiri */}
      <div className=' SideBar col-3 d-flex row gap-4 p-2 '>
        <Row id='ProfileBadge' className='gap-4'>
          <Col className='d-flex col UserName'>
            <img src={AvatarImage} alt="" className='AvatarImage'/> 
              <Row>
                <h4>ilhamsyahzp</h4> 
                <p>Ilhamsyah Putra</p>
              </Row>  
          </Col>
        <Col className='d-flex col mt-4 gap-4'>
        <Row> <p>Posted</p> <h2>3</h2></Row>
        <Row> <p>Following</p> <h2>12</h2></Row>
        <Row> <p>Followers</p> <h2>42</h2></Row>
        </Col>
        <Button variant="primary" onClick={() => window.location.assign("/profile")}>View Profile</Button>{' '}
        </Row>

        <Row id='ProfileBadge'>
        <h6>You have not Log In Yet!</h6>
        <p>To Access full feature please Log in An Account.</p>
        
        <Button variant="primary" onClick={() => window.location.assign("/login")}>Log In</Button>{' '}
        <Col className='RegisterButton'>
          <span>Or  </span>
          <a href="/register"> Register </a>
        </Col>

        </Row>
        

      </div>

      {/* Content */}
      <div className='Content d-flex row gap-4 col-5 p-2'>
        <Container fluid id='FollowingList' className='d-flex '>
          <Row className='d-flex FollowingUser col-2'><img src={AvatarImage} alt="" className='AvatarImage'/> <p>UserName</p> </Row>
          <Row className='d-flex FollowingUser col-2'><img src={AvatarImage} alt="" className='AvatarImage'/> <p>UserName</p> </Row>
          <Row className='d-flex FollowingUser col-2'><img src={AvatarImage} alt="" className='AvatarImage'/> <p>UserName</p> </Row>
          <Row className='d-flex FollowingUser col-2'><img src={AvatarImage} alt="" className='AvatarImage'/> <p>UserName</p> </Row>
          <Row className='d-flex FollowingUser col-2'><img src={AvatarImage} alt="" className='AvatarImage'/> <p>UserName</p> </Row>
          <Row className='d-flex FollowingUser col-2'><img src={AvatarImage} alt="" className='AvatarImage'/> <p>UserName</p> </Row>
          <Row className='d-flex FollowingUser col-2'><img src={AvatarImage} alt="" className='AvatarImage'/> <p>UserName</p> </Row>
          <Row className='d-flex FollowingUser col-2'><img src={AvatarImage} alt="" className='AvatarImage'/> <p>UserName</p> </Row>
        </Container>
        <PostCard />
        <PostCard />
        <PostCard />
      </div>

      {/* Sidebar Kanan */}
      <div className=' SideBar col-3 d-flex row p-2'>
        <Row id='ProfileBadge'>
          <h6>Suggested Account</h6>
          <p>Expand your following Circle</p>
          <div className='d-flex row gap-3 '>
            <div className='d-flex ReccomendationAccount '>
            <div className='d-flex gap-2 RecAcc'>
                <div><img src={AvatarImage} alt="" className='AvatarPost' /></div>
                UserName
            </div>
            <Button variant="primary">Follow</Button>{' '}
          </div>
          <div className='d-flex ReccomendationAccount'>
            <div className='d-flex gap-2 RecAcc'>
                <div><img src={AvatarImage} alt="" className='AvatarPost' /></div>
                UserName
            </div>
            <Button variant="primary">Follow</Button>{' '}
          </div>
          <div className='d-flex ReccomendationAccount'>
            <div className='d-flex gap-2 RecAcc'>
                <div><img src={AvatarImage} alt="" className='AvatarPost' /></div>
                UserName
            </div>
            <Button variant="primary">Follow</Button>{' '}
          </div>
          <div className='d-flex ReccomendationAccount'>
            <div className='d-flex gap-2 RecAcc'>
                <div><img src={AvatarImage} alt="" className='AvatarPost' /></div>
                UserName
            </div>
            <Button variant="primary">Follow</Button>{' '}
          </div>

          <div className='d-flex ReccomendationAccount'>
            <div className='d-flex gap-2 RecAcc'>
                <div><img src={AvatarImage} alt="" className='AvatarPost' /></div>
                UserName
            </div>
            <Button variant="primary">Follow</Button>{' '}
          </div>
          </div>
        </Row>
      </div>
    </div>
    
    </>
  )
}

export default App
