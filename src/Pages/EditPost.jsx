
import { useState, useEffect, useCallback } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import NavBar from "../Components/NavBar";

const EditPost = () => {
    const jwtToken = localStorage.getItem("token");
    const myId = localStorage.getItem("id");
    const formErrorStyle = { color: "red", fontSize: "12px", padding: "0", margin: "0" };
    const [isLoading, setIsLoading] = useState(true);
    
    const [postDetail, setPostDetail] = useState([])

    // Get Post Id
    const myKeysValues = window.location.search;
    const urlParams = new URLSearchParams(myKeysValues);
    const postId = urlParams.get('postId');
    console.log(window.location.search);

        // Get post and post review by ID
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
                setIsLoading(false);
                })
                .catch((error) => {
                console.log(error);
                });
            }, []);

  // Upload Post Formik
  const updatePost = useFormik({
    initialValues: {
      caption: "",
      imageUrl: "",
    },
    validationSchema: Yup.object({
      caption: Yup.string().required("Required"),
      imageUrl: Yup.string().url("Invalid URL").required("Required"),
    }),
    onSubmit: (values) => {
        if (window.confirm("Are you sure? The changes you make will be saved in the system and cannot be undone.")){
      axios({
        method: "post",
        url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/update-post/${postId}`,
        headers: {
          apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
          Authorization: `Bearer ${jwtToken}`,
        },
        data: {
          caption: values.caption,
          imageUrl: values.imageUrl,
        },
      })
        .then(() => {
          alert("Your post has been successfully edited!");
          window.location.assign(`/detail?postId=${postId}`);
        })
        .catch((error) => {
          alert("Something wrong happened!");
          console.log(error);
        });
    }
    },
  });

  useEffect(() => {
    if (!isLoading) {
      if (Object.keys(postDetail).length) {
        updatePost.setFieldValue("caption", postDetail.caption);
        updatePost.setFieldValue("imageUrl", postDetail.imageUrl);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, postDetail]);

  useEffect(() => {
    getPostDetail();
  }, [getPostDetail, postId])

  return (
    <>
    <NavBar />
    <div className='body d-flex row gap-5   justify-content-center align-items-center' style={{ height: '100vh' }}>

        {/* Content */}
        <div className='Content d-flex row gap-5 col-4 ' >
            <div className="uploadPost-section p-5 gap-5" id="FollowingList">

                <div className="uploadPost-area">
                <div className="uploadPost-bubble  m-auto mb-5">
                    <h1 className="login-title">Upload Post</h1>
                    <Form onSubmit={updatePost.handleSubmit}>


                    <Form.Group controlId="caption" className="uploadPost-group mb-2">
                        <Form.Label className="uploadPost-label">Caption</Form.Label>
                        <Form.Control onBlur={updatePost.handleBlur} onChange={updatePost.handleChange} value={updatePost.values.caption} />
                        <Form.Text style={formErrorStyle}>{updatePost.touched.caption && updatePost.errors.caption}</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="imageUrl" className="uploadPost-group mb-2">
                        <Form.Label className="register-label">Image Url</Form.Label>
                        <Form.Control type="text" onChange={updatePost.handleChange} value={updatePost.values.imageUrl} />
                        <Form.Text style={formErrorStyle}>{updatePost.touched.imageUrl && updatePost.errors.imageUrl}</Form.Text>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Submit
                    </Button>
                    </Form>
                </div>
                </div>
            </div>
        </div>

    </div>
    </>

  );
};

export default EditPost;