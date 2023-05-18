import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import LoginImage from "../assets/PlaceHolder/Login.png";

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
        url: `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/login`,
        headers: {
          apiKey: `c7b411cc-0e7c-4ad1-aa3f-822b00e7734b`,
        },
        data: {
          email: values.email,
          password: values.password,
        },
      })
        .then((response) => {
          localStorage.setItem("name", response.data.user.name);
          localStorage.setItem("id", response.data.user.id);
          localStorage.setItem("username", response.data.user.username);
          localStorage.setItem("token", response.data.token);
          alert("You have signed in!");
          window.location.assign("/home");
        })
        .catch(() => {
          alert("Invalid Email or Password");
        });
    },
  });

  return (
    <>
      <div className="body d-flex row gap-5   justify-content-center align-items-center">
        {/* Container */}
        <div className="Content d-flex row gap-5 col-6">
          <div className="register-section p-5 ">
            <img
              src={LoginImage}
              alt=""
              style={{ objectFit: "cover", width: 600 }}
            />
          </div>
        </div>
        {/* Container */}
        <div className="Content d-flex row gap-5 col-4">
          <div id="FollowingList" className="register-section p-5 ">
            <div className="login-regist-area">
              <div className="login-bubble mb-2 d-flex row gap-5">
                {/* Content */}
                <h1 className="login-title">Sign In</h1>
                <Form onSubmit={formik.handleSubmit}>
                  {/* Email */}
                  <Form.Group className="mb-4 " controlId="email">
                    <Form.Label className="login-label">Email</Form.Label>
                    <Form.Control
                      placeholder="Enter Email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    <Form.Text style={formErrorStyle}>
                      {formik.touched.email && formik.errors.email}
                    </Form.Text>
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-4" controlId="password">
                    <Form.Label className="login-label">Password</Form.Label>
                    <Form.Control
                      type={passwordShown ? "text" : "password"}
                      placeholder="Enter Password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <Form.Text style={formErrorStyle}>
                      {formik.touched.password && formik.errors.password}
                    </Form.Text>
                  </Form.Group>

                  {/* Show Password */}
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      className="login-label"
                      type="checkbox"
                      label="Show Password"
                      onClick={handleShowPassword}
                    />
                  </Form.Group>

                  {/* Log In */}
                  <Row>
                    <Button
                      disabled={!formik.isValid}
                      type="submit"
                      variant="primary"
                      className="MainButton">
                      {" "}
                      Log In{" "}
                    </Button>
                    <Col className="RegisterButton">
                      <span>Or </span>
                      <a href="/register"> Register </a>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
