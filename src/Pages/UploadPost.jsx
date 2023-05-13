
import { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import NavBar from "../Components/NavBar";

const UploadPost = () => {
  const jwtToken = localStorage.getItem("token");
  const myId = localStorage.getItem("id");
  const formErrorStyle = { color: "red", fontSize: "12px", padding: "0", margin: "0" };
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  // On Image Upload
  const onUpload = (event) => {
    setImage(event.target.files[0]);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  // On copy
  const onCopy = (event) => {
    setImagePreview(event.target)
  }

  // Handle Upload Image
  const handleSubmitImage = (event) => {
    event.preventDefault()
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
      setIsLoading(false);
      })
      .catch(() => {
        alert("You have to login to use this feature!");
      });
  };

  useEffect(() => {
    // if (!isLoading && imageUrl) {
    //   formik.setFieldValue("imageUrlField", imageUrl);
    // }
  }, [isLoading, imageUrl]);

  // Upload Post Formik
  const formik = useFormik({
    initialValues: {
      caption: "",
      imageUrlField: "",
    },
    validationSchema: Yup.object({
      caption: Yup.string().required("Required"),
      imageUrlField: Yup.string().url("Invalid URL"),
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
          imageUrl: imageUrl || values.imageUrlField,
        },
      })
        .then(() => {
          alert("Your Image has been successfully posted!");
          window.location.assign(`/profile?userId=${myId}`);
        })
        .catch((error) => {
          alert("Something wrong happened!");
          console.log(error);
        });
    },
  });

  return (
    <>
    <NavBar />
    <div className='body d-flex row gap-5   justify-content-center align-items-center'>

            {/* Content */}
            <div className='Content d-flex row gap-5 col-4 ' >
                <div className="uploadPost-section p-5 gap-5" id="FollowingList">

                    <div className="uploadPost-area">
                    <div className="uploadPost-bubble  m-auto mb-5">
                        <h1 className="login-title">Upload Post</h1>

                        <form className="upload-field mt-4 mb-4" >
                          <div >
                            <label htmlFor="imageFile" className="mb-3">You can chose to either upload a file or copy the image Url to the 'Image Url' Field.</label>

                            <div className="mb-3">
                                {preview && <img src={preview} alt="Uploaded Photo" style={{width : 300}}/>}
                            </div>

                            <input
                              type="file"
                              id="imageFile"
                              name="imageFile"
                              onChange={onUpload}
                            />
                          </div>
                          <button onClick={handleSubmitImage} className='MainButton'>
                            Upload Photo
                          </button>
                        </form>





                        <Form onSubmit={formik.handleSubmit}>

                        <Form.Group controlId="imageUrlField" className="uploadPost-group mb-2">
                            <Form.Label className="register-label">Image Url</Form.Label>
                            <Form.Control type="text" placeholder="Image Url" onChange={formik.handleChange} value={formik.values.imageUrlField} />
                            <Form.Text style={formErrorStyle}>{formik.touched.imageUrlField && formik.errors.imageUrlField}</Form.Text>
                        </Form.Group>
                        <p>
                          If you already upload an image, please skip this step
                        </p>

                        <Form.Group controlId="caption" className="uploadPost-group mb-2 mt-4">
                            <Form.Label className="uploadPost-label">Caption</Form.Label>
                            <Form.Control placeholder="Image Caption" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.caption} />
                            <Form.Text style={formErrorStyle}>{formik.touched.caption && formik.errors.caption}</Form.Text>
                        </Form.Group>



                        <Button type="submit" variant="primary" className='MainButton'>
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