import {Container,  Row, Col, Button, Nav} from 'react-bootstrap';
import NavBar from '../Components/NavBar';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect } from 'react';

function EditProfile() {

    const formik = useFormik({
        initialValues: {
          name: userData.name,
          email: userData.email,
          profilePictureUrl: userData.profilePictureUrl,
          phoneNumber: userData.phoneNumber,
        },
        validationSchema: Yup.object({
          name: Yup.string(),
          email: Yup.string().email("Invalid email address"),
          profilePictureUrl: Yup.string(),
          phoneNumber: Yup.string()
            .matches(/^[0-9]*$/, "Must be a number")
            .min(8, "Must be 8 charaters or more")
            .max(12, "Must be 12 characters or less"),
        }),
        onSubmit: (values) => {
          axios({
            method: "post",
            url: `${process.env.REACT_APP_BASEURL}/api/v1/update-profile`,
            headers: {
              apiKey: `${process.env.REACT_APP_APIKEY}`,
              Authorization: `Bearer ${jwtToken}`,
            },
            data: {
              name: values.name,
              email: values.email,
              profilePictureUrl: values.profilePictureUrl,
              phoneNumber: values.phoneNumber,
            },
          })
            .then(() => {
              localStorage.setItem("name", values.name);
              alert("Changes has been successfully made!");
              window.location.assign("/profile");
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
            formik.setFieldValue("phoneNumber", userData.phoneNumber);
          }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isLoading, userData]);

  return (
    <>
    <NavBar />
    <div className='body d-flex row'>
      <div className='Content d-flex row gap-5 col-6'>
            <img
            className="profile-modal-img p-1 mb-3"
            src={userData.profilePictureUrl || profile}
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = profile;
            }}
            alt="profilePicture"
            />

            <Form onSubmit={formik.handleSubmit}>
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

                <Form.Group controlId="profilePictureUrl" className="mb-5">
                    <Form.Label className="register-label">Profile Picture (Url)</Form.Label>
                    <Form.Control type="text" placeholder="Image Url" onChange={formik.handleChange} value={formik.values.profilePictureUrl} />
                </Form.Group>
                <Button className="btn-success profile-modal-btn" type="submit">
                    Save Changes
                </Button>
            </Form>

      </div>
    </div>
    
    
    </>
  );
}

export default EditProfile;