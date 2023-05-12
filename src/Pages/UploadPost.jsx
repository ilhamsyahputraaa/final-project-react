import { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useFormik, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import NavBar from "../Components/NavBar";

const UploadPost = () => {
  const jwtToken = localStorage.getItem("token");
  const myId = localStorage.getItem("id");
  const [imageUrl , setImageUrl] = useState(null);
  const formErrorStyle = { color: "red", fontSize: "12px", padding: "0", margin: "0" };
  const [isLoading, setIsLoading] = useState(true);

  // Create Post Formik
  const formik = useFormik({
    initialValues: {
      caption: `${imageUrl ? (imageUrl) : ("")}`,
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

  const initialValues = {
    imageFile: null,
  };

  const validationSchema = Yup.object().shape({
    caption: Yup.string().required("Required"),
    imageFile: Yup.mixed()
      .test("fileSize", "The file is too large", (value) => {
        return value && value.size <= 1024 * 1024;
      })
      .test("fileType", "Only image files are allowed", (value) => {
        return value && /^image\//.test(value.type);
      })
      .required("Required"),
  });

  const handleSubmitImage = async (values, actions) => {
    const jwtToken = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("imageFile", values.imageFile);

    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/create-post`,
        headers: {
          apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type" : "multipart/form-data"
        },
        data: formData
      });

      console.log("Response data:", response.data);
      setImageUrl(response.data.url);
      alert("Your photo has been uploaded successfully!");
    } catch (error) {
      alert("Failed to upload photo!");
      console.error(error);
    }

    actions.setSubmitting(false);
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


                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmitImage}
                >
                  {(props) => (
                    <Form>
                      <div>
                        <label htmlFor="imageFile">Image File</label>
                        <input
                          type="file"
                          id="imageFile"
                          name="imageFile"
                          onChange={(event) =>
                            props.setFieldValue("imageFile", event.currentTarget.files[0])
                          }
                        />
                        <ErrorMessage name="imageFile" />
                      </div>
                      <button type="submit" disabled={props.isSubmitting}>
                        {props.isSubmitting ? "Uploading..." : "Upload Photo"}
                      </button>
                    </Form>
                  )}
                </Formik>
                <p>
                {imageUrl && <img src={imageUrl} alt="Uploaded Photo" />}
                </p>


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