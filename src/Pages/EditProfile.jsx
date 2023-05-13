import {Container,  Row, Col, Button, Nav, Form} from 'react-bootstrap';
import NavBar from '../Components/NavBar';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState, useCallback } from 'react';



function EditProfile() {

  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  
  const jwtToken = localStorage.getItem("token");

  
  const formErrorStyle = { color: "red", fontSize: "14px", padding: "0", margin: "0" };
  

    // Get User Data
    const getUserData = useCallback(() => {
      axios({
        method: "get",
        url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/user/${localStorage.getItem("id")}`,
        headers: {
          apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => {
          console.log(response.data.data)
          setUserData(response.data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

  const formik = useFormik({
      initialValues: {
        name: userData.name,
        username: userData.username,
        email: userData.email,
        profilePictureUrl: userData.profilePictureUrl,
        phoneNumber: userData.phoneNumber,
        website: userData.website,
        bio: userData.bio,
      },
      validationSchema: Yup.object({
        name: Yup.string(),
        username: Yup.string(),
        email: Yup.string().email("Invalid email address"),
        profilePictureUrl: Yup.string(),
        phoneNumber: Yup.string()
          .matches(/^[0-9]*$/, "Must be a number")
          .min(8, "Must be 8 charaters or more")
          .max(12, "Must be 12 characters or less"),
        bio: Yup.string(),
        website: Yup.string(),
      }),
      onSubmit: (values) => {
        axios({
          method: "post",
          url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/update-profile`,
          headers: {
            apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
            Authorization: `Bearer ${jwtToken}`,
          },
          data: {
            name: values.name,
            email: values.email,
            profilePictureUrl: values.profilePictureUrl,
            phoneNumber: values.phoneNumber,
            website: values.website,
            bio: values.bio,
          },
        })
          .then(() => {
            alert("Changes has been successfully made!");
            window.location.assign(`/profile?userId=${userData.id}`);
          })
          .catch((error) => {
            alert("Something wrong happened!");
            console.log(error);
          });
      },
  });

  


  useEffect(() => {
      if (!isLoading) {
        if (Object.keys(userData).length) {
          formik.setFieldValue("name", userData.name);
          formik.setFieldValue("email", userData.email);
          formik.setFieldValue("profilePictureUrl", userData.profilePictureUrl);
          formik.setFieldValue("phoneNumber", userData.phoneNumber);
          formik.setFieldValue("website", userData.website);
          formik.setFieldValue("bio", userData.bio);
        }
      }
    }, [isLoading, userData]);

    useEffect(() => {
      getUserData();
    }, [getUserData]);

  return (
    <>
    <NavBar />
    <div className='body d-flex row'>
      <div className='Content d-flex row gap-5 col-6'>



            <Form onSubmit={formik.handleSubmit} id='FollowingList' className='d-flex row gap-4 p-5'>
                <Form.Group controlId="name">
                    <Form.Label className="register-label">Name</Form.Label>
                    <Form.Control placeholder="Enter Name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} />
                    <Form.Text style={formErrorStyle}>{formik.touched.name && formik.errors.name}</Form.Text>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label className="register-label">Email</Form.Label>
                    <Form.Control placeholder="Enter Email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                    <Form.Text style={formErrorStyle}>{formik.touched.email && formik.errors.email}</Form.Text>
                </Form.Group>

                <Form.Group controlId="phoneNumber">
                    <Form.Label className="register-label">Phone Number</Form.Label>
                    <Form.Control placeholder="Enter Phone Number" type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phoneNumber} />
                    <Form.Text style={formErrorStyle}>{formik.touched.phoneNumber && formik.errors.phoneNumber}</Form.Text>
                </Form.Group>

                <Form.Group controlId="profilePictureUrl" className="">
                    <Form.Label className="register-label">Profile Picture (Url)</Form.Label>
                    <Form.Control type="text" placeholder="Image Url" onChange={formik.handleChange} value={formik.values.profilePictureUrl} />
                </Form.Group>

                <Form.Group controlId="website" className="">
                    <Form.Label className="register-label"> Your Website</Form.Label>
                    <Form.Control type="text" placeholder="Your Website" onChange={formik.handleChange} value={formik.values.website} />
                </Form.Group>

                <Form.Group controlId="bio" className="">
                    <Form.Label className="register-label">Bio</Form.Label>
                    <Form.Control type="area" placeholder="Write Your Bio" onChange={formik.handleChange} value={formik.values.bio} />
                </Form.Group>


                <div></div>
                <Button variant="primary" type="submit" className='MainButton'>
                    Save Changes
                </Button>
            </Form>

      </div>
    </div>
    
    
    </>
  );
}

export default EditProfile;