
import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import NavBar from "../Components/NavBar";

const UploadPost = () => {
  const jwtToken = localStorage.getItem("token");
  const formErrorStyle = { color: "red", fontSize: "12px", padding: "0", margin: "0" };

  const [ingredients, setIngredients] = useState([]);

  // Upload Post Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      caption: "",
      imageUrl: "",
      ingredients: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      caption: Yup.string().required("Required"),
      imageUrl: Yup.string().url("Invalid URL").required("Required"),
      ingredients: Yup.array().of(Yup.string()),
    }),
    // onSubmit: (values) => {
    //   axios({
    //     method: "post",
    //     url: `${process.env.REACT_APP_BASEURL}/api/v1/create-food`,
    //     headers: {
    //       apiKey: `${process.env.REACT_APP_APIKEY}`,
    //       Authorization: `Bearer ${jwtToken}`,
    //     },
    //     data: {
    //       caption: values.caption,
    //       imageUrl: values.imageUrl,
    //     },
    //   })
    //     .then(() => {
    //       alert("Your food has been successfully added!");
    //       window.location.assign("/foods");
    //     })
    //     .catch((error) => {
    //       alert("Something wrong happened!");
    //       console.log(error);
    //     });
    // },
  });

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
                        <Form onSubmit={formik.handleSubmit}>


                        <Form.Group controlId="caption" className="uploadPost-group mb-2">
                            <Form.Label className="uploadPost-label">Caption</Form.Label>
                            <Form.Control placeholder="Image Caption" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.caption} />
                            <Form.Text style={formErrorStyle}>{formik.touched.caption && formik.errors.caption}</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="imageUrl" className="uploadPost-group mb-2">
                            <Form.Label className="register-label">Image Url</Form.Label>
                            <Form.Control type="text" placeholder="Image Url" onChange={formik.handleChange} value={formik.values.imageUrl} />
                            <Form.Text style={formErrorStyle}>{formik.touched.imageUrl && formik.errors.imageUrl}</Form.Text>
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

export default UploadPost;