import { useState, useEffect, useCallback } from 'react'
import './App.css'
import axios from 'axios'
import NavBar from './Components/NavBar';
import PostCard from './Components/PostCard';
import AvatarImage from './assets/PlaceHolder/100.png';
import { Col, Row, Button, Container } from 'react-bootstrap';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const [myInfo, setMyInfo] = useState ({});
  const [myPost, setMyPost] = useState ({});

  const [followingPost, setFollowingPost] = useState([])
  const [followingList, setFollowingList] = useState([])
  const [followerList, setFollowerList] = useState([])
  const [explorePosts, setExplorePosts] = useState([])

 
  const jwtToken = localStorage.getItem("token");

  //Handle Is Login
  const handleIsLogin = () => {
    localStorage.getItem("id") ? setIsLogin(true) : setIsLogin(false);
  };


  // Get My Info
  const getMyInfo = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/user/${localStorage.getItem("id")}`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        // setMostFavorite(response.data.data.sort((a, b) => b.totalLikes - a.totalLikes).filter((e, i) => i < 3));
        setIsLoading(false);
        setMyInfo(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get All Post
  const getExplorePost = useCallback(() => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/explore-post?size=10&page=1`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        // console.log(response.data.data);
        // setMostFavorite(response.data.data.sort((a, b) => b.totalLikes - a.totalLikes).filter((e, i) => i < 3));
        setExplorePosts(response.data.data.posts)
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Get Following Post
  const getFollowingPost = useCallback(() => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/following-post?size=10&page=1`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        // console.log(response.data.data.posts);
        // setMostFavorite(response.data.data.sort((a, b) => b.totalLikes - a.totalLikes).filter((e, i) => i < 3));
        setIsLoading(false);
        setFollowingPost(response.data.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Get My Following List
  const getFollowingList = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/my-following?size=10&page=1`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        // console.log(response.data.data);
        // setMostFavorite(response.data.data.sort((a, b) => b.totalLikes - a.totalLikes).filter((e, i) => i < 3));
        setIsLoading(false);
        setFollowingList(response.data.data.users)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Get My Followers List
  const getFollowersList = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/my-followers?size=10&page=1`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        // setMostFavorite(response.data.data.sort((a, b) => b.totalLikes - a.totalLikes).filter((e, i) => i < 3));
        setIsLoading(false);
        setFollowerList(response.data.data.users)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Get My Post
  const getMyPost = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/users-post/${localStorage.getItem("id")}?size=10&page=1`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        // console.log(response.data.data);
        // setMostFavorite(response.data.data.sort((a, b) => b.totalLikes - a.totalLikes).filter((e, i) => i < 3));
        setIsLoading(false);
        setMyPost(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMyInfo();
    getMyPost();
    getExplorePost();
    getFollowingPost();
    getFollowingList();
    getFollowersList();
    handleIsLogin();
  }, [isLoading, isLogin]);

  return (
    <>
    <NavBar />
    <div className='body d-flex row gap-5 py-5'>
      {/* Sidebar Kiri */}
      <div className=' SideBar col-3 d-flex row gap-4 p-2 '>

      {isLogin? (
      <Row id='ProfileBadge' className='gap-4'>
        <Col className='d-flex col UserName'>
          <img src={myInfo.profilePictureUrl} alt="" className='AvatarImage'/> 
            <Row>
              <h4>{myInfo.username}</h4> 
              <p>{myInfo.name}</p>
            </Row>  
        </Col>
        {myInfo.bio}
        <Col>
        </Col>
        <Col className='d-flex col mt-4 gap-4'>
          <Row> <p>Posted</p> <h2>{myPost.totalItems}</h2></Row>
          <Row> <p>Following</p> <h2>{myInfo.totalFollowing}</h2></Row>
          <Row> <p>Followers</p> <h2>{myInfo.totalFollowers}</h2></Row>
        </Col>
        <Button variant="primary" onClick={() => window.location.assign("/profile")}>View Profile</Button>
      </Row>) 
      : 
      (<Row id='ProfileBadge'>
        <h6>You have not Log In Yet!</h6>
        <p>To Access full feature please Log in An Account.</p>
        
        <Button variant="primary" onClick={() => window.location.assign("/login")}>Log In</Button>{' '}
        <Col className='RegisterButton'>
          <span>Or  </span>
          <a href="/register"> Register </a>
        </Col>
      </Row>)}
      </div>

      {/* Content */}
      <div className='Content d-flex row gap-4 col-5 p-2'>
        {isLogin ? 
        (
        <div className='d-flex row p-0 gap-4 m-0 Content'>
        <Container fluid id='FollowingList' className='d-flex  row'>
          <h6>My Following</h6>
          {followingList.map(following => (
          <Row className='d-flex FollowingUser col-2' onClick={() => window.location.assign(`/profile?userId=${following.id}`)}><img src={following.profilePictureUrl} alt="" className='AvatarImage' /> <p>{following.username}</p> </Row>
          ))}
        </Container>

        <div className='p-0 d-flex row gap-3 me-0'>
          {followingPost.map(post => (
            <PostCard 
              key={post.id}
              avatar={post.user.profilePictureUrl}
              username={post.user.username}
              postImage={post.imageUrl}
              likes={post.totalLikes}
              lastUpdate={post.updatedAt}
              caption={post.caption}
              postId={post.id}
            />
          ))}
        </div>          
        </div>

        ) : 
        (
        <div>
          {/* {explorePosts.map(posts=>(
            <PostCard 
            key={posts.id}
            username={posts.user.username}
            avatar={posts.user.profilePictureUrl}
            postImage={posts.imageUrl}
            likes={posts.totalLikes}
            lastUpdate={posts.updatedAt}
            caption={posts.caption}
            postId={posts.id}
            />
          ))} */}
        </div>
        )}


          

      </div>

      {/* Sidebar Kanan */}
        <div className=' SideBar col-3 d-flex row p-2 '>
          {isLogin ? (<Row id='ProfileBadge'>
          <h6>My Followers</h6>

          {/* List Container */}
          <div className='d-flex row gap-3 ReccomendationAccount'>

            {/* Items */}
            {followerList.map(follower => (
            <div className='d-flex ReccomendationAccount'>
              <div className='d-flex gap-2 RecAcc' onClick={() => window.location.assign(`/profile?userId=${follower.id}`)}>  
                <img src={follower.profilePictureUrl} alt="" className='AvatarImage' />
                  <Row>
                    <h6>{follower.username}</h6> 
                    <p>{follower.email}</p>
                  </Row> 
              </div >

            </div>                  
              ))}


          </div>
        </Row>) : (null)}
        
      </div>
    </div>
    
    </>
  )
}

export default App
