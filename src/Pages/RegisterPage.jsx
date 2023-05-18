import { Form, Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import NavBar from "../Components/NavBar";
import RegistImage from "../assets/PlaceHolder/Register.png";

const RegisterPage = () => {
  const formErrorStyle = {
    color: "red",
    fontSize: "14px",
    padding: "0",
    margin: "0",
  };

  // Formik Register
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
      profilePictureUrl: "",
      phoneNumber: "",
      website: "",
      bio: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      passwordRepeat: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/register`,
        headers: {
          apiKey: `c7b411cc-0e7c-4ad1-aa3f-822b00e7734b`,
        },
        data: {
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
          passwordRepeat: values.passwordRepeat,
          profilePictureUrl: values.profilePictureUrl,
          phoneNumber: values.phoneNumber,
          bio: values.bio,
          website: values.website,
        },
      })
        .then(() => {
          alert("You have registered!");
          window.location.assign("/");
        })
        .catch(() => {
          alert("Something wrong happened!");
        });
    },
  });

  return (
    <>
      <div className="body d-flex row gap-5   justify-content-center align-items-center">
        {/* Content */}
        <div className="Content d-flex row gap-5 col-5">
          <div className="register-section p-5" id="FollowingList">
            <div className="register-regist-area">
              <div className="register-bubble m-auto">
                <h1 className="login-title mb-4">Sign Up</h1>

                <Form onSubmit={formik.handleSubmit} className="mb-4">
                  <Row className="mb-4">
                    <Col>
                      {/* Name */}
                      <Form.Group controlId="name">
                        <Form.Label className="register-label">Name</Form.Label>
                        <Form.Control
                          placeholder="Enter Name"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.name}
                        />
                        <Form.Text style={formErrorStyle}>
                          {formik.touched.name && formik.errors.name}
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col>
                      {/* Email */}
                      <Form.Group controlId="email">
                        <Form.Label className="register-label">
                          Email
                        </Form.Label>
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
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col>
                      {/* Password */}
                      <Form.Group controlId="password">
                        <Form.Label className="register-label">
                          Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter Password"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.password}
                        />
                        <Form.Text style={formErrorStyle}>
                          {formik.touched.password && formik.errors.password}
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col>
                      {/* Confirm Password */}
                      <Form.Group controlId="passwordRepeat">
                        <Form.Label className="register-label">
                          Confirm Password
                        </Form.Label>
                        <Form.Control
                          placeholder="Confirm Password"
                          type="password"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.passwordRepeat}
                        />
                        <Form.Text style={formErrorStyle}>
                          {formik.touched.passwordRepeat &&
                            formik.errors.passwordRepeat}
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Website */}
                  <Form.Group controlId="username" className="mb-4">
                    <Form.Label className="register-label">Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                  </Form.Group>

                  {/* Website */}
                  <Form.Group controlId="website" className="mb-4">
                    <Form.Label className="register-label">Website</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Website"
                      onChange={formik.handleChange}
                      value={formik.values.website}
                    />
                  </Form.Group>

                  {/* Phone Number */}
                  <Form.Group controlId="phoneNumber" className="mb-4">
                    <Form.Label className="register-label">
                      Phone Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Phone Number"
                      onChange={formik.handleChange}
                      value={formik.values.phoneNumber}
                    />
                  </Form.Group>

                  {/* Profile Picture */}
                  <Form.Group controlId="profilePictureUrl" className="mb-4">
                    <Form.Label className="register-label">
                      Profile Picture (Url)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Image Url"
                      onChange={formik.handleChange}
                      value={formik.values.profilePictureUrl}
                    />
                  </Form.Group>

                  {/* Bio */}
                  <Form.Group controlId="bio" className="mb-4">
                    <Form.Label className="register-label">Bio</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      placeholder="Write Your Bio"
                      onChange={formik.handleChange}
                      value={formik.values.bio}
                    />
                  </Form.Group>

                  <Button
                    disabled={!formik.isValid}
                    type="submit"
                    variant="primary"
                    className="MainButton">
                    Sign Up
                  </Button>
                </Form>

                <span className="regist-text mt-4 pb-3">
                  Already have an account?
                  <a className="regist-link" href="/">
                    Sign In
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="Content d-flex row gap-5 col-4">
          <div className="register-section p-5 ">
            <img
              src={RegistImage}
              alt=""
              style={{ objectFit: "cover", width: 600 }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
