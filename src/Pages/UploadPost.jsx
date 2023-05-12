import { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useFormik, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import NavBar from "../Components/NavBar";

const UploadPost = () => {
  const jwtToken = localStorage.getItem("token");
  const myId = localStorage.getItem("id");

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setImagePreview] = useState(null);
  const formErrorStyle = { color: "red", fontSize: "12px", padding: "0", margin: "0" };
  const [isLoading, setIsLoading] = useState(true);

  // Create Post Formik
  const formik = useFormik({
    initialValues: {
      caption: "",
      imageUrl: "",
    },
    validationSchema: Yup.object({
      caption: Yup.string().required("Required"),
      imageUrl: Yup.string().url("Invalid URL").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios({
          method: "post",
          url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/create-post`,
          headers: {
            apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
            Authorization: `Bearer ${jwtToken}`,
          },
          data: {
            caption: values.caption,
            imageUrl: imageUrl,
          },
        });
        alert("Your photo has been successfully added!");
        window.location.assign(`/profile?userId=${myId}`);
      } catch (error) {
        alert("Something wrong happened!");
        console.log(error);
      }
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

  // On Image Upload
  const onUpload = (event) => {
    setImage(event.target.files[0]);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  // Upload Image
  // const handleSubmitImage = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append("imageFile", image);
  //   try {
  //     const response = await axios({
  //       method: "post",
  //       url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/upload-image`,
  //       formData,
  //       headers: {
  //         apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
  //         Authorization: `Bearer ${jwtToken}`,
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
     


  //     console.log("Response data:", response.data);
  //     setImageUrl(response.data.url);
  //     alert("Your photo has been uploaded successfully!");
  //   } catch (error) {
  //     alert("Failed to upload photo!");
  //     console.error(error);
  //   }
  // };

  const handleSubmitImage = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    axios({
      method: "post",
      url: `${import.meta.env.VITE_REACT_BASE_URL}/api/v1/upload-image`,
      data: formData,
      headers: {
        apiKey: `${import.meta.env.VITE_REACT_API_KEY}`,
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
      console.log(response.data);
      setImageUrl(response.data.url);
      alert("Your photo has been uploaded successfully!");
      })
      .catch(() => {
        alert("You have to login to use this feature!");
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


                <Formik
                  onSubmit={handleSubmitImage}
                >                    
                <Form>
                      <div>
                        <label htmlFor="imageFile">Image File</label>
                        <input
                          type="file"
                          id="imageFile"
                          name="imageFile"
                          onChange={onUpload}
                        />
                        <ErrorMessage name="imageFile" />
                      </div>
                      <button type="submit" >
                        Upload Photo
                      </button>
                    </Form>

                </Formik>
                <p>
                {preview && <img src={preview} alt="Uploaded Photo" />}
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