import { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useFormik, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import NavBar from "../Components/NavBar";

const UploadPost = () => {
  const jwtToken = localStorage.getItem("token");
  const myId = localStorage.getItem("id");
  const [imageFile , setImageFile] = useState(null);
  const [imageUrl , setImageUrl] = useState(null);
  const formErrorStyle = { color: "red", fontSize: "12px", padding: "0", margin: "0" };
  const [isLoading, setIsLoading] = useState(true);

  // Upload Post Formik
  const formik = useFormik({
    initialValues: {
      caption: "",
      imageUrl: "",
    },
    validationSchema: Yup.object({
      caption: Yup.string().required("Required"),
      imageUrl: Yup.string().url("Invalid URL").required("Required"),
    }),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/create-post`,
        headers: {
          apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
          Authorization: `Bearer ${jwtToken}`,
        },
        data: {
          caption: values.caption,
          imageUrl: imageUrl || values.imageUrl,
        },
      })
        .then(() => {
          alert("Your food has been successfully added!");
          window.location.assign(`/profile?userId=${myId}`);
        })
        .catch((error) => {
          alert("Something wrong happened!");
          console.log(error);
        });
    },
  });

  const validationSchema = Yup.object().shape({
    image: Yup.mixed()
      .required('Image is required')
      .test('fileType', 'Only image files are allowed', (value) => {
        return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
      }),
  });

  const handleUploadImage = (event) => {
    event.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.append('image' , imageFile);
    axios({
      method: "post",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/upload-image`,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "multipart/form-data"
      },
      data: bodyFormData
    })
      .then((response) => {
        alert("Your image has been successfully added!");
        setImageUrl(response.data.url);
        setIsLoading(false);
      })
      .catch((error) => {
        alert("Something wrong happened!");
        console.log(error);
      });
  };

  useEffect(() => {
    if (!isLoading && imageUrl) {
      formik.setFieldValue("imageUrl", imageUrl);
    }
  }, [isLoading, imageUrl]);

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


                <Formik onSubmit={handleUploadImage} validationSchema={validationSchema}>
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form>
                      <div>
                        <label htmlFor="image">Image:</label>
                        <Field
                          type="file"
                          id="image"
                          image="image" // <-- ubah properti name menjadi "image"
                          accept="image/jpeg,image/png,image/gif"
                          onChange={(event) => {
                            setFieldValue('image', event.currentTarget.files[0]);
                          }}
                        />
                        <ErrorMessage name="image" />
                      </div>

                      <button type="submit">Upload Image</button>
                    </Form>
                  )}
                </Formik>

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
}
  export default UploadPost;