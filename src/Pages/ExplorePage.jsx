import {Container,  Row, Col, Button, Nav, Tabs, Tab} from 'react-bootstrap';
import AvatarImage from '../assets/PlaceHolder/100.png';
import NavBar from '../Components/NavBar';
import PostCardSmall from '../Components/PostCardSmall';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

function ExplorePage() {

  
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [explorePosts, setExplorePosts] = useState([])
  const jwtToken = localStorage.getItem("token");
  const [exploreUser, setExploreUser] = useState([])

  const [number, setNumber] = useState(9)

  // HandleViewMore
  const handleViewMore = () => {
    setNumber(prevState => prevState + 9);
    console.log(number);
  }

  // Get All Post
  const getExplorePosts = useCallback(() => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/explore-post?size=100&page=1`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        console.log(response.data.data.posts);
        setIsLoading(false);

        // Filter out items with duplicate userId
        const uniqueUsers = Object.values(response.data.data.posts.reduce((acc, post) => {
          if (!acc[post.userId]) {
            acc[post.userId] = post;
          }
          return acc;
        }, {}));
        
        setExplorePosts(response.data.data.posts.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }));
        setExploreUser(uniqueUsers.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Handle Is Login
  const handleIsLogin = () => {
    localStorage.getItem("id") ? setIsLogin(true) : setIsLogin(false);
  };

  useEffect(() => {
    getExplorePosts();
  }, [number, isLoading, isLogin]);

  return (
    <>
    <NavBar />
    <div className='body d-flex row'>
      <div className='Content d-flex row gap-3 col-9'>


      <Container fluid id='FollowingList' className='d-flex  row'>
        <h6>Sugestion</h6>
        {exploreUser.map(explore => (
          <Row className='d-flex FollowingUser col-1' onClick={() => window.location.assign(`/profile?userId=${explore.user?.id}`)}>
            <div>
            <img src={explore.user?.profilePictureUrl} alt="" className='AvatarImage' style={{ width: "100%", height: "100%", objectFit: "cover", aspectRatio: "1/1" }} /> 
            </div><p>{explore.user?.username}</p> </Row>
        ))}
      </Container>


        <Row className='Content d-flex row PhotoGrid'>
          {explorePosts.map(post => (
            <Col key={post?.id} xs={12} sm={6} md={6} lg={4} xl={4} xxl={4} className='PhotoGridItem'  >
              <PostCardSmall
                imageUrl={post?.imageUrl}
                updatedAt={post?.updatedAt}
                postId={post?.id}
                style={{ height: "100%", objectFit: "cover" }}
              />
            </Col>   
          ))}
        </Row>
        <div>
        <Button variant='primary' onClick={handleViewMore}> View More </Button>
        </div>
      </div>
    </div>
    
    
    </>
  );
}

export default ExplorePage;