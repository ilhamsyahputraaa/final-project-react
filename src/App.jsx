import { useState, useEffect, useCallback } from "react";
import "./App.css";
import axios from "axios";
import NavBar from "./Components/NavBar";
import { Card, Col, Row, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [toggleLike, setToggleLike] = useState(false);

  const [myInfo, setMyInfo] = useState({});
  const [myPost, setMyPost] = useState({});

  const [followingPost, setFollowingPost] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [explorePosts, setExplorePosts] = useState([]);
  const [commentCount, setCommentCount] = useState({});

  const jwtToken = localStorage.getItem("token");

  //Handle Is Login
  const handleIsLogin = () => {
    localStorage.getItem("id") ? setIsLogin(true) : setIsLogin(false);
  };

  // Handle Like
  const handleLikeButton = (post) => {
    const postId = post.id;
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
    const postId = post.id;
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
      url: `${
        import.meta.env.VITE_REACT_BASE_URL
      }/api/v1/user/${localStorage.getItem("id")}`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        console.log(response.data.data);
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
      url: `${
        import.meta.env.VITE_REACT_BASE_URL
      }/api/v1/explore-post?size=10&page=1`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        console.log(response.data.data.posts);
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
      url: `${
        import.meta.env.VITE_REACT_BASE_URL
      }/api/v1/following-post?size=100&page=1`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        const posts = response.data.data.posts;
        const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setIsLoading(false);
        setFollowingPost(sortedPosts);

        
        
        // Get comment count for each post
        posts.map((post) => {
          axios({
            method: "get",
            url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/post/${
              post.id
            }`,
            headers: {
              apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
              Authorization: `Bearer ${jwtToken}`,
            },
          })
            .then((response) => {
              const commentCount = response.data.data.comments.length;
              setCommentCount((prevCount) => ({
                ...prevCount,
                [post.id]: commentCount,
              }));
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Get My Following List
  const getFollowingList = () => {
    axios({
      method: "get",
      url: `${
        import.meta.env.VITE_REACT_BASE_URL
      }/api/v1/my-following?size=10&page=1`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        setIsLoading(false);
        setFollowingList(response.data.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Get My Followers List
  const getFollowersList = () => {
    axios({
      method: "get",
      url: `${
        import.meta.env.VITE_REACT_BASE_URL
      }/api/v1/my-followers?size=10&page=1`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        setFollowerList(response.data.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Get My Post
  const getMyPost = () => {
    axios({
      method: "get",
      url: `${
        import.meta.env.VITE_REACT_BASE_URL
      }/api/v1/users-post/${localStorage.getItem("id")}?size=10&page=1`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
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
      <div className="body d-flex row gap-5" >
        {/* Sidebar Kiri */}
        {myInfo.totalFollowing === 0 ? (null) : (
        <div className="SidebarHome SideBar col-lg-3 col-md-3 d-flex row gap-4 p-2 " >
          <Row id="ProfileBadge" className="gap-4 SidebarHome">
            <Col className="d-flex col UserName">
              <img
                src={myInfo.profilePictureUrl}
                alt=""
                className="AvatarImage"
                style={{ objectFit: "cover", aspectRatio: "1/1" }}
              />
              <Row>
                <h4>{myInfo.username}</h4>
                <p>{myInfo.name}</p>
              </Row>
            </Col>
            {myInfo.bio}
            <Col className="d-flex col mt-4 gap-4">
              <Row>
                {" "}
                <p>Posted</p> <h2>{myPost.totalItems}</h2>
              </Row>
              <Row>
                {" "}
                <p>Following</p> <h2>{myInfo.totalFollowing}</h2>
              </Row>
              <Row>
                {" "}
                <p>Followers</p> <h2>{myInfo.totalFollowers}</h2>
              </Row>
            </Col>
            <Button
              variant="primary"
              onClick={() =>
                window.location.assign(`/profile?userId=${myInfo.id}`)
              }
              className="MainButton">
              View Profile
            </Button>
          </Row>
        </div>          
        )}


        {/* Content */}
        {myInfo.totalFollowing === 0 ? (
          <div className="Content d-flex row gap-4 col-lg-3 col-md-12 p-2" style={{height:"80vh"}}>
          <Row id="ProfileBadge" className="gap-4 SidebarHome">
            <h3>You're Not Following Anyone.</h3>
            <p> Kunjungi halaman explore untuk mulai mengikuti teman atau orang yang anda kenal!</p>
            <div>
            <Button
              variant="primary"
              onClick={() =>
                window.location.assign(`/explore`)
              }
              className="MainButton">
              Visit Explore
            </Button>              
            </div>

          </Row>              
          </div>
) : 
        (
        <div className="Content d-flex row gap-4 col-lg-5 col-md-12 p-2">
          <div className="d-flex row p-0 gap-4 m-0 Content ">
            <div className="FollowingListHome p-0 m-0 ">
              <Container
                fluid
                id="FollowingList"
                className="d-flex  row FollowingListHome ">
                <h6>My Following</h6>
                <div className="FollowingListCont">
                  {followingList.map((following) => (
                  <Row
                    className="d-flex FollowingUser col-2 "
                    onClick={() =>
                      window.location.assign(`/profile?userId=${following.id}`)
                    }>
                    <div>
                      <img
                        src={following.profilePictureUrl}
                        alt=""
                        className="AvatarImage"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          aspectRatio: "1/1",
                        }}
                      />
                    </div>
                    <p>{following.username}</p>{" "}
                  </Row>
                ))}
                </div>
                
              </Container>
            </div>

            <div className="p-0 d-flex row gap-3 me-0">
              {followingPost.map((post) => (
                <Card style={{ width: "100%" }} id="PostCard" key={post.id}>
                  <Col
                    id="UserPost"
                    onClick={() =>
                      window.location.assign(`/profile?userId=${post.userId}`)
                    }>
                    <Col id="UserName" className="d-flex gap-4">
                      <div id="AvatarImage">
                        <img
                          src={post.user?.profilePictureUrl}
                          alt=""
                          className="AvatarPost"
                          style={{ objectFit: "cover", aspectRatio: "1/1" }}
                        />
                      </div>
                      <div>
                        {post.user?.username}
                        <Card.Text style={{ color: "grey" }}>
                          {format(
                            new Date(post.updatedAt),
                            "EEEE, dd MMMM yyyy"
                          )}{" "}
                        </Card.Text>
                      </div>
                    </Col>
                    <Button
                      variant="primary"
                      href={`/detail?postId=${post.id}`}
                      className="MainButton">
                      View Post
                    </Button>
                  </Col>
                  <Card.Img
                    variant="top"
                    src={post.imageUrl}
                    onClick={() =>
                      window.location.assign(`/detail?postId=${post.id}`)
                    }
                  />
                  <Card.Body className="d-flex row gap-3">
                    <Col
                      id="ActionButtonPost"
                      className="d-flex gap-4 column align-items-center">
                      <div className="d-flex column gap-2 align-items-center">
                        <FontAwesomeIcon
                          icon={faHeart}
                          style={
                            !post.isLike ? { color: "grey" } : { color: "red" }
                          }
                          onClick={() => {
                            post.isLike
                              ? handleUnlikeButton(post)
                              : handleLikeButton(post);
                          }}
                        />

                        <div className="Likes p-0 m-0">
                          {post.totalLikes} Likes
                        </div>
                      </div>
                      <div className="d-flex column gap-2 align-items-center">
                        <FontAwesomeIcon
                          icon={faComment}
                          style={{ color: "grey" }}
                        />

                        <div className="Likes p-0 m-0">
                          {commentCount[post.id] ?? 0} Comments
                        </div>
                      </div>
                    </Col>

                    <Card.Text>
                      <h6>{post.user?.username}</h6>
                      <p className="caption">{post.caption}</p>
                    </Card.Text>

                    <Col></Col>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>        
        )}

        {myInfo.totalFollowing === 0 ? (null) : (
        <div className="SidebarHome SideBar col-3 d-flex row p-2  ">
          <Row id="ProfileBadge" className=" SidebarHome ">
            <h6>My Followers</h6>

            {/* List Container */}
            <div className="d-flex row gap-3 ReccomendationAccount ReccomendationAccountCont">
              {/* Items */}
              {followerList.map((follower) => (
                <div className="d-flex ReccomendationAccount">
                  <div
                    className="d-flex gap-2 RecAcc"
                    onClick={() =>
                      window.location.assign(`/profile?userId=${follower.id}`)
                    }>
                    <div>
                      <img
                        src={follower.profilePictureUrl}
                        alt=""
                        className="AvatarImage"
                        style={{ objectFit: "cover", aspectRatio: "1/1" }}
                      />
                    </div>

                    <Row>
                      <h6>{follower.username}</h6>
                      <p>{follower.email}</p>
                    </Row>
                  </div>
                </div>
              ))}
            </div>
          </Row>
        </div>          
        )}

      </div>
    </>
  );
}

export default App;
