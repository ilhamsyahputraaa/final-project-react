import NavBar from "../Components/NavBar";

import { Form, Button, Row } from "react-bootstrap";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const LoginPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const formErrorStyle = { color: "red", fontSize: "16px" };

  // Handle Show Password
  const handleShowPassword = () => {
    setPasswordShown(!passwordShown);
  };

  // Formik Login
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/api/v1/login`,
        headers: {
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        },
        data: {
          email: values.email,
          password: values.password,
        },
      })
        .then((response) => {
          localStorage.setItem("name", response.data.user.name);
          localStorage.setItem("id", response.data.user.id);
          localStorage.setItem("role", response.data.user.role);
          localStorage.setItem("token", response.data.token);
          alert("You have signed in!");
          window.location.assign("/");
        })
        .catch(() => {
          alert("Invalid Email or Password");
        });
    },
  });

  <>

  
  </>

  return (
    <>
        <NavBar />
        <div className='body d-flex row gap-5'>

            {/* Content */}
            <div className='Content d-flex row gap-5 col-4'>
            <div id="FollowingList" className="register-section p-5 ">
                <div className="login-regist-area">
                <div className="login-bubble mb-2 d-flex row gap-5">
                    <h1 className="login-title">Sign In</h1>
                    <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-4 " controlId="email">
                        <Form.Label className="login-label">Email</Form.Label>
                        <Form.Control placeholder="Enter Email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                        <Form.Text style={formErrorStyle}>{formik.touched.email && formik.errors.email}</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="password">
                        <Form.Label className="login-label">Password</Form.Label>
                        <Form.Control type={passwordShown ? "text" : "password"} placeholder="Enter Password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
                        <Form.Text style={formErrorStyle}>{formik.touched.password && formik.errors.password}</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check className="login-label" type="checkbox" label="Show Password" onClick={handleShowPassword} />
                    </Form.Group>

                    </Form>
                    <Row>
                    <Button disabled={!formik.isValid} type="submit" variant="primary">
                        Log In
                    </Button>
                    <span className="regist-text mt-4">
                    Didn't have an account? 
                    <a className="regist-link" href="/register">
                        Sign Up
                    </a>
                    </span>
                    </Row>
                </div>
                </div>
            </div>
            </div>

        </div>
    </>
  );
};

export default LoginPage;