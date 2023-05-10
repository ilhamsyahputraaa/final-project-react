import axios from 'axios';
import { useState, useEffect} from 'react';
import {Container,  Row, Col, Button, Nav, Tabs, Tab} from 'react-bootstrap';
import AvatarImage from '../assets/PlaceHolder/100.png';
import NavBar from '../Components/NavBar';
import PostCard from '../Components/PostCard';
import PostCardSmall from '../Components/PostCardSmall';

function ProfilePage() {

  const [toggleFollow, setToggleFollow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // States
  const [userInfo, setUserInfo] = useState([]);
  const [postCount, setPostCount] = useState("");
  const [userPost, setUserPost] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const [myFollowing, setMyFollowing] = useState([])




  // Get UserID
  const myKeysValues = window.location.search;
  const urlParams = new URLSearchParams(myKeysValues);
  const userProfileId = urlParams.get('userId');



  // Get From Local Storage
  const jwtToken = localStorage.getItem("token");

  // Get User Info
  const getUserInfo = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/user/${userProfileId}`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        // setMostFavorite(response.data.data.sort((a, b) => b.totalLikes - a.totalLikes).filter((e, i) => i < 3));
        setIsLoading(false);
        setUserInfo(response.data.data);
        // const isFollowing = isUserFollowing(response.data.data.id);
        // setToggleFollow(isFollowing);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get Post by Id
  const getUserPost = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/users-post/${userProfileId}?size=10&page=1`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        console.log(response.data.data)
        setIsLoading(false);
        setUserPost(response.data.data.posts)
        setPostCount(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // does this user follow me?
  const isFollowed = (userProfileId, myFollowing) => {
    return myFollowing.some((following) => following.id === userProfileId);
  };
  const isUserFollowed = isFollowed(userProfileId, myFollowing);
  console.log(isUserFollowed);


  

  // Get my Following
  const getMyFollowing = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/my-following?size=10&page=1`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        setIsLoading(false);
        setMyFollowing(response.data.data.users)
      })
      .catch((error) => {
        console.log(error);
      });
  }



  // Get Followers by Id
  const getUserFollowsers = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/followers/${userProfileId}?size=10&page=1`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        setIsLoading(false);
        setUserFollowers(response.data.data.users)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get Following by Id
  const getUserFollowing = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/following/${userProfileId}?size=10&page=1`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        setIsLoading(false);
        setUserFollowing(response.data.data.users)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle follow
  const handleFollow = async () => {
    try {
      await axios({
        method: "post",
        url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/follow`,
        headers: {
          apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
          Authorization: `Bearer ${jwtToken}`,
        },
        data: {
          userIdFollow: `${userProfileId}`,
        },
      });
      // setToggleFollow(true);
      
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnFollow = async () => {
    try {
      await axios({
        method: "delete",
        url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/unfollow/${userProfileId}`,
        headers: {
          apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
          Authorization: `Bearer ${jwtToken}`,
        }
      });
      // setToggleFollow(false);
      
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
    getUserFollowing();
    getUserFollowsers();
    getUserPost();
    getMyFollowing();
  }, [isLoading]);


  return (
    <>
    <NavBar />
    <div className='body d-flex row'>
      <div className='Content d-flex row gap-5 col-6'>
        <Container id='ProfileBadge' className='d-flex row'>
            <Col id='UserPost'>
              <Col className='d-flex UserName'>
                <img src={userInfo.profilePictureUrl} alt="" className='AvatarImage'/>  
                <Row>
                  <h4>{userInfo.username}</h4> 
                  <p>{userInfo.name}</p>
                </Row> 
                
              </Col>
              
              {userInfo.id === localStorage.getItem("id") ?
              (<Button variant="primary">Edit Profile</Button>) :
              (isUserFollowed? 
              (<Button variant="secondary" onClick={handleUnFollow}>Unfollow</Button>) :
              (<Button variant="primary" onClick={handleFollow}>Follow</Button>))}
              
              </Col>
            

            <Col className='d-flex UserName'> <p>{userInfo.bio}</p> </Col>
            <Col className=' d-flex gap-4'>
              <Col className='d-flex UserName'><h6>Website</h6> <p>{userInfo.website}</p> </Col>
              <Col className='d-flex UserName'><h6>Phone Number</h6> <p>{userInfo.phoneNumber}</p> </Col>
            </Col>

            <Col className='d-flex mt-4 gap-5 UserNumber'>
              <Row className='col-3'> <p>Photos</p> <h2>{postCount.totalItems}</h2></Row>
              <Row className='col-3'> <p>Following</p> <h2>{userInfo.totalFollowing}</h2></Row>
              <Row className='col-3'> <p>Followers</p> <h2>{userInfo.totalFollowers}</h2></Row>
            </Col>

        </Container>

        <Container className='justify-content-center'>
          <Tabs variant="pills" defaultActiveKey="tab-1"  className='justify-content-center'>

              {/* Tab Post */}
              <Tab eventKey="tab-1" title="Post">
                <Row className='Content d-flex row PhotoGrid'>
                    {userPost.map(post => (
                      <Col key={post.id} xs={12} sm={6} md={6} lg={4} xl={4} xxl={4} className='PhotoGridItem'  >
                        <PostCardSmall
                            imageUrl={post.imageUrl}
                            updatedAt={post.updatedAt}
                            style={{ height: "100%", objectFit: "cover" }}
                        />
                      </Col>   
                    ))}
                </Row>
              </Tab>


              {/* Tab Following */}
              <Tab eventKey="tab-3" title="Following">
              <Container className='Content '>

                {userFollowing.map(following=> (
                <div className='d-flex FollowingAcc mb-3'>
                  <div className='d-flex gap-2 RecAcc'>
                    <img src={following.profilePictureUrl} alt="" className='AvatarImage' />
                      <Row>
                        <h6>{following.username}</h6> 
                        <p>{following.email}</p>
                      </Row> 
                  </div >
                  <div className=' RecAcc'>
                    <Button variant="primary" onClick={() => window.location.assign(`/profile?userId=${following.id}`)}>View Profile</Button> 
                    </div>
                </div>                  
                ))}

              </Container>
              </Tab>

              {/* Tab Followers */}
              <Tab eventKey="tab-4" title="Followers">
              <Container className='Content '>

                {/* Following Item */}
                {userFollowers.map(followers=> (
                <div className='d-flex FollowingAcc mb-3'>
                  <div className='d-flex gap-2 RecAcc'>
                    <img src={followers.profilePictureUrl} alt="" className='AvatarImage' />
                      <Row>
                        <h6>{followers.username}</h6> 
                        <p>{followers.email}</p>
                      </Row> 
                  </div >
                  <div className=' RecAcc'>
                    <Button variant="primary" onClick={() => window.location.assign(`/profile?userId=${followers.id}`)}>View Profile</Button> 
                    </div>
                </div>                  
                ))}


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