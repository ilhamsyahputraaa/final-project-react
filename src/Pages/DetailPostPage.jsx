
import NavBar from '../Components/NavBar';
import {Button, Card, Row, Col, Container, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams } from "react-router-dom";
import {faHeart, faComment, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useCallback } from 'react';

import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from "yup";


function DetailPostPage() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  // Get Post Id
  const myKeysValues = window.location.search;
  const urlParams = new URLSearchParams(myKeysValues);
  const postId = urlParams.get('postId');

  const [postDetail, setPostDetail] = useState([])
  const [postUser, setPostUser] = useState([])
  const [commentList, setCommentList] = useState([])
  const jwtToken = localStorage.getItem("token");

  const [totalLikes, setTotalLikes] = useState(0);
  const [isLikes, setIsLikes] = useState(false);
  const [toggleLike, setToggleLike] = useState(false);
  const [commentCount, setCommentCount] = useState({});

  


    // Get Post Detail
    const getPostDetail = useCallback(() => {
    axios({
        method: "get",
        url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/post/${postId}`,
        headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
        },
    })
        .then((response) => {
          console.log(response.data.data);
          setPostDetail(response.data.data);
          setPostUser(response.data.data.user);
          setCommentList(response.data.data.comments);
          setIsLoading(false);
          const commentCount = response.data.data.comments.length;
            setCommentCount((prevCount) => ({
              ...prevCount,
              [postId]: commentCount,
            }));

        })
        .catch((error) => {
        console.log(error);
        });
    }, []);

    // Add Comment Submission
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        addComment.submitForm();
    };

    // Add Comment
    const addComment = useFormik({
        initialValues: {
          comment: "",
        },
        validationSchema: Yup.object({
          comment: Yup.string().required(),
        }),
        onSubmit: (values) => {
          axios({
            method: "post",
            url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/create-comment`,
            headers: {
              apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
              Authorization: `Bearer ${jwtToken}`,
            },
            data: {
              postId: postId,
              comment: values.comment,
            },
          })
            .then(() => {
              getPostDetail()
              // alert("Comment has been submitted");
              // window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
        },
    });
  
  // Handle Like
  const handleLikeButton = (postDetail) => {
    const postId = postDetail.id
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
  const handleUnlikeButton = (postDetail) => {
    const postId = postDetail.id
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


    // Delete Comment
    const handleDeleteComment = (commentId) => {
        if (window.confirm("Are you sure you want to delete this comment? This change cannot be undone!")) {
        axios({
            method: "delete",
            url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/delete-comment/${commentId}`,
            headers: {
            apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
            Authorization: `Bearer ${jwtToken}`,
            },
        })
            .then(() => {
              getPostDetail()
            // alert(`This Comment has been deleted.`);
            // window.location.reload();
            })
            .catch((error) => {
            console.log(error);
            });
        }
    };

    // Delete Post
    const handleDeletePost = (postId) => {
      if (window.confirm("Are you sure you want to delete this Post? This change cannot be undone!")) {
      axios({
          method: "delete",
          url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/delete-post/${postId}`,
          headers: {
          apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
          Authorization: `Bearer ${jwtToken}`,
          },
      })
          .then(() => {
          alert(`This Post has been deleted.`);
          window.location.assign("/home");
          })
          .catch((error) => {
          console.log(error);
          });
      }
    };

    // Get All Post
    const getLikesOfPost = () => {
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
          const post = response.data.data.posts.find((post) => post.id === postId);
          if (post) {
            setTotalLikes(post)
            setIsLikes(post)
          } else {
            console.log(`Post with postId ${postId} not found`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    





    useEffect(() => {
        getPostDetail();
        getLikesOfPost();
    }, [isLoading, postId, toggleLike]);

  



  return (
    <>
    <NavBar />
    <div className='body d-flex row gap-5 BodyDetailPost'>

      {/* Content */}
      <div className='detailPostContent Content d-flex row  col-lg-5 col-md-12 '>
        <Card style={{ width: '100%' }} id='PostCard'>
            <Col id='UserPost' >
              <Col id='UserName' className='d-flex row gap-4'>
                    <div id='AvatarImage' ><img src={postUser.profilePictureUrl} alt="" className='AvatarPost' onClick={() => window.location.assign(`/profile?userId=${postDetail.userId}`)} style={{objectFit: "cover", aspectRatio: "1/1" }}/></div>{postUser.username}
            </Col>
            {postUser.id === localStorage.getItem("id") ? 
            (<div className='d-flex gap-4'>
              <FontAwesomeIcon icon={faTrash} onClick={() => handleDeletePost(postDetail.id)}/>
              <FontAwesomeIcon icon={faPenToSquare} onClick={()=> window.location.assign(`/editpost?postId=${postId}`)}/>
                </div>) : (<Button variant='primary' onClick={() => window.location.assign(`/profile?userId=${postDetail.userId}`)} className='MainButton'>View Profile</Button>)}
            </Col>
            <Card.Img variant="top" src={postDetail.imageUrl} />
            
        </Card>
      </div>

      {/* Sidebar Kanan */}
      <div className='detailPostComent SideBar col-lg-3 col-md-12 d-flex row gap-4 '>
        <Card id='PostCard' className='p-4 d-flex gap-4'>
            <Row>
                <Col id='ActionButtonPost' className='d-flex gap-4 column align-items-center'>
                  <div className='d-flex column gap-2 align-items-center'>
                  <FontAwesomeIcon icon={faHeart} style={!isLikes.isLike ? { color: "grey" } : { color: "red" }} onClick={() => { isLikes.isLike ? handleUnlikeButton(postDetail) : handleLikeButton(postDetail); }} />
                    <Col className='Likes'>{totalLikes.totalLikes} Likes</Col>
                  </div>
                  <div className='d-flex column gap-2 align-items-center'>
                    <FontAwesomeIcon icon={faComment}
                    style={{ color: "grey" }}
                     />

                  <Col className='Likes p-0 m-0'>{commentCount[postDetail.id] ?? 0} Comments</Col>
                  </div>
                  
                </Col>
            </Row>
            <Card.Text style={{ color: "grey" }}> {postDetail.createdAt}
            </Card.Text>
            
            <Card.Text style={{fontSize : 18}}>
            {postDetail.caption}
            </Card.Text>
        </Card>
        <Container id='ProfileBadge' className='gap-1 p-4'>
          <h6>Comments</h6>
          <Form onSubmit={handleCommentSubmit}>
            <Form.Group className="mb-5" controlId="comment" >
                <Form.Control
                className="detail-review-control mb-3"
                as="textarea"
                placeholder="Write A Comment"
                onChange={addComment.handleChange}
                value={addComment.values.comment}
                />
                <Button variant="primary" type="submit" className='MainButton'>
                Post Comment
                </Button>   
            </Form.Group>
          </Form>
          
            
          <Row className='d-flex row gap-3 '>
            {/* Comments */}
            {commentList.map(comment => (
            <div id='CommentItem' className='d-flex gap-3'>
                <div className='d-flex gap-3'>
                <span>
                  <img src={comment.user.profilePictureUrl} alt="" className='AvatarPost' onClick={() => window.location.assign(`/profile?userId=${comment.user.id}`)} style={{objectFit: "cover", aspectRatio: "1/1" }}/>
                </span>
                <span>
                    <h6>{comment.user.username}</h6>
                    <p> {comment.comment}</p>
                </span>                  
                </div>
                {comment.user.id === localStorage.getItem("id") ? (<FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteComment(comment.id)}/>) : (null)}
            </div>                
            ))}
          </Row>
        </Container>
      </div>
    </div>
    
    </>
  )
}

export default DetailPostPage
