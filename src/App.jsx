import { useState, useEffect, useCallback } from 'react'
import './App.css'
import axios from 'axios'
import NavBar from './Components/NavBar';
import { Card, Col, Row, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';



function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [toggleLike, setToggleLike] = useState(false);


  const [myInfo, setMyInfo] = useState ({});
  const [myPost, setMyPost] = useState ({});

  const [followingPost, setFollowingPost] = useState([])
  const [followingList, setFollowingList] = useState([])
  const [followerList, setFollowerList] = useState([])
  const [explorePosts, setExplorePosts] = useState([])
  const [timeStamp, setTimeStamp] = useState("")

 
  const jwtToken = localStorage.getItem("token");

  //Handle Is Login
  const handleIsLogin = () => {
    localStorage.getItem("id") ? setIsLogin(true) : setIsLogin(false);
  };

  // Handle Like
  const handleLikeButton = (post) => {
    const postId = post.id
    axios({
      method: "post",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/like`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
      data: {
        postId: postId,
      },
    })
      .then(() => {
        setToggleLike((prevState) => !prevState);
      })
      .catch(() => {
        alert("You have to login to use this feature!");
      });
  };

  // Handle unlike
  const handleUnlikeButton = (post) => {
    const postId = post.id
    axios({
      method: "post",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/unlike`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
      data: {
        postId: postId,
      },
    })
      .then(() => {
        setToggleLike((prevState) => !prevState);
      })
      .catch(() => {
        alert("You have to login to use this feature!");
      });
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
  const getExplorePosts = useCallback(() => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/explore-post?size=10&page=1`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        console.log(response.data.data.posts);
        // setMostFavorite(response.data.data.sort((a, b) => b.totalLikes - a.totalLikes).filter((e, i) => i < 3));
        setIsLoading(false);
        setExplorePosts(response.data.data.posts);
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
        setFollowingPost(response.data.data.posts.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }));
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
    getExplorePosts();
    getFollowingPost();
    getFollowingList();
    getFollowersList();
    handleIsLogin();
  }, [isLoading, isLogin, toggleLike]);

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
            <Button variant="primary" onClick={() => window.location.assign(`/profile?userId=${myInfo.id}`)}>View Profile</Button>
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
            <Row className='d-flex FollowingUser col-2' onClick={() => window.location.assign(`/profile?userId=${following.id}`)}>
              <div>
              <img src={following.profilePictureUrl} alt="" className='AvatarImage' style={{ width: "100%", height: "100%", objectFit: "cover", aspectRatio: "1/1" }} /> 
              </div><p>{following.username}</p> </Row>
          ))}
        </Container>

        <div className='p-0 d-flex row gap-3 me-0'>
          {/* {followingPost.map(post => (
            <PostCard 
              key={post.id}
              avatar={post.user.profilePictureUrl}
              username={post.user.username}
              postImage={post.imageUrl}
              likes={post.totalLikes}
              lastUpdate={post.updatedAt}
              caption={post.caption}
              postId={post.id}
              handleLike={() => handleLikeButton(post.postId)}
              handleUnlike={() => handleUnlikeButton(post.postId)}
              isLike={post.isLike}
            />
          ))} */}
          {followingPost.map(post => (
            <Card style={{ width: '100%' }} id='PostCard' key={post.i}>
              <Col id='UserPost' onClick={() => window.location.assign("/profile")}>
                <Col id='UserName' className='d-flex gap-2'>
                  <div id='AvatarImage'><img src={post.user.profilePictureUrl} alt="" className='AvatarPost' style={{ objectFit: "cover", aspectRatio: "1/1" }} /></div>
                  {post.user.username}
                </Col>
                  <Button variant="primary" href={`/detail?postId=${post.id}`}>View Post</Button>
              </Col>
              <Card.Img variant="top" src={post.imageUrl} onClick={() => window.location.assign(`/detail?postId=${post.id}`)} />
              <Card.Body className='d-flex row gap-3'>
                <Col id='ActionButtonPost' className='d-flex gap-2 align-items-center'>
                  <FontAwesomeIcon icon={faHeart}
                    style={!post.isLike ? { color: "grey" } : { color: "red" }}
                    onClick={() => { post.isLike ? handleUnlikeButton(post) : handleLikeButton(post); }} />

                  <div className='Likes p-0 m-0'>{post.totalLikes} Likes</div>
                </Col>
                <Card.Text style={{ color: "grey" }}>Last updated {format(new Date(post.updatedAt), 'EEEE, dd MMMM yyyy')} </Card.Text>
                <Card.Text className='d-flex gap-2 align-items-end'>
                  <h6>{post.user.username}</h6><p className='caption'>{post.caption}</p>
                </Card.Text>
                <Col>
                </Col>
              </Card.Body>
            </Card>
          ))}
        </div>          
        </div>

        ) : 
        (
        <div>
          {/* {explorePosts.length > 0 && explorePosts.map((posts=>(
            <Card style={{ width: '100%' }} id='PostCard' key={post.i}>
              <Col id='UserPost' onClick={() => window.location.assign("/profile")}>
                <Col id='UserName' >
                  <div id='AvatarImage'><img src={post.user.profilePictureUrl} alt="" className='AvatarPost' /></div>
                  {post.user.username}
                </Col>
              </Col>
              <Card.Img variant="top" src={post.imageUrl} onClick={() => window.location.assign(`/detail?postId=${post.id}`)} />
              <Card.Body className='d-flex row gap-3'>
                <Col id='ActionButtonPost' >
                  <FontAwesomeIcon icon={faHeart}
                    style={!post.isLike ? { color: "grey" } : { color: "red" }}
                    onClick={() => { post.isLike ? handleUnlikeButton(post) : handleLikeButton(post); }} />

                  <div className='Likes'>{post.totalLikes} Likes</div>
                </Col>
                <Card.Text >Last updated {post.updatedAt}</Card.Text>
                <Card.Text>
                  <span><h6>{post.user.username}</h6></span><span><p>{post.caption}</p></span>

                </Card.Text>
                <Col>
                  <Button variant="primary" href={`/detail?postId=${post.id}`}>View Post</Button>
                </Col>
              </Card.Body>
            </Card>
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
                  <div>
                    <img src={follower.profilePictureUrl} alt="" className='AvatarImage' style={{objectFit: "cover", aspectRatio: "1/1" }} />
                  </div>
                  
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
