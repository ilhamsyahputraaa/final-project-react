import AvatarImage from '../assets/PlaceHolder/100.png';
import NavBar from '../Components/NavBar';
import SmallImage from '../assets/PlaceHolder/100.png';
import {Button, Card, Row, Col, Container, Form} from 'react-bootstrap';
import BigImage from '../assets/PlaceHolder/1000.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams } from "react-router-dom";
import {faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';


function DetailPostPage() {
    
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const myKeysValues = window.location.search;

  const urlParams = new URLSearchParams(myKeysValues);
  const postId = urlParams.get('postId')
  console.log(window.location.search);

  const [postDetail, setPostDetail] = useState([])

// Get food and food review by ID
const getPostDetail = useCallback(() => {
    axios({
        method: "get",
        url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/post/${postId}`,
        headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${import.meta.env.VITE_REACT_JWT_TOKEN}`,
        },
    })
        .then((response) => {
            console.log(response)
        setPostDetail(response.data.data);
        setIsLoading(false);
        })
        .catch((error) => {
        console.log(error);
        });
    }, []);


    useEffect(() => {
        getPostDetail();
    }, [isLoading, postId]);

  



  return (
    <>
    <NavBar />
    <div className='body d-flex row gap-5'>

      {/* Content */}
      <div className='Content d-flex row gap-5 col-5'>
        <Card style={{ width: '100%' }} id='PostCard'>
            <Col id='UserPost'>
                <Col id='UserName'>
                    <div id='AvatarImage'><img src={SmallImage} alt="" className='AvatarPost' /></div>
                    UserName
            </Col>
            </Col>
            <Card.Img variant="top" src={BigImage} />
            
        </Card>
      </div>

      {/* Sidebar Kanan */}
      <div className=' SideBar col-3 d-flex row gap-4'>
        <Card id='PostCard' className='p-4 d-flex gap-4'>
            <Row>
                <Col id='ActionButtonPost'>
                    <FontAwesomeIcon icon={faHeart} />
                    <Col className='Likes'>234 Likes</Col>
                </Col>
                <Col id='ActionButtonPost'>
                    <FontAwesomeIcon icon={faComment} />
                    <Col className='Likes'>2,331 Comments</Col>
                </Col>
            </Row>
            
            <Card.Text>
            {postDetail.caption}
            </Card.Text>
        </Card>
        <Container id='ProfileBadge' className='gap-1 p-4'>
          <h6>Comments</h6>
          <Form.Group className="mb-5" controlId="review">
                <Form.Control
                className="detail-review-control mb-3"
                as="textarea"
                placeholder="Write A Comment"
                // onBlur={addReview.handleBlur}
                // onChange={addReview.handleChange}
                // value={addReview.values.review}
                />
                <Button variant="primary" type="submit">
                Post Comment
                </Button>   
            </Form.Group>
            
          <Row className='d-flex row gap-3 '>
            {/* Comments */}
            <div id='CommentItem' className='d-flex gap-3'>
                <span>
                    <img src={AvatarImage} alt="" className='AvatarPost' />
                </span>
                <span>
                    <h6>UserName</h6>
                    <p> Some quick example text to build on the card title and make up the
                bulk of the card's content. </p>
                </span>
            </div>

            <div id='CommentItem' className='d-flex gap-3'>
                <span>
                    <img src={AvatarImage} alt="" className='AvatarPost' />
                </span>
                <span>
                    <h6>UserName</h6>
                    <p> Some quick example text to build on the card title and make up the
                bulk of the card's content. </p>
                </span>
            </div>
            <div id='CommentItem' className='d-flex gap-3'>
                <span>
                    <img src={AvatarImage} alt="" className='AvatarPost' />
                </span>
                <span>
                    <h6>UserName</h6>
                    <p> Some quick example text to build on the card title and make up the
                bulk of the card's content. </p>
                </span>
            </div>
            <div id='CommentItem' className='d-flex gap-3'>
                <span>
                    <img src={AvatarImage} alt="" className='AvatarPost' />
                </span>
                <span>
                    <h6>UserName</h6>
                    <p> Some quick example text to build on the card title and make up the
                bulk of the card's content. </p>
                </span>
            </div>
          </Row>
        </Container>
      </div>
    </div>
    
    </>
  )
}

export default DetailPostPage
