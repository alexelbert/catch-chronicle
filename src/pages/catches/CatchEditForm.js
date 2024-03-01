import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import styles from "../../styles/CatchCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function CatchEditForm() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    caption: "",
    species: "",
    method: "",
    weight: "",
    length: "",
    location: "",
    latitude: null,
    longitude: null,
    time: "",
    weather: "",
    lure: "",
    image: "",
  });

  const {
    caption,
    species,
    method,
    weight,
    length,
    location,
    latitude,
    longitude,
    time,
    weather,
    lure,
    image,
  } = postData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/catches/${id}/`);
        const {
          caption,
          species,
          method,
          weight,
          length,
          location,
          latitude,
          longitude,
          time,
          weather,
          lure,
          image,
          is_owner,
        } = data;

        is_owner ? setPostData({ caption, species, method, weight, length, location, latitude, longitude, time, weather, lure, image }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("caption", caption);
    formData.append("species", species);
    formData.append("method", method);
    formData.append("weight", weight);
    formData.append("length", length);
    formData.append("location", location);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("time", time);
    formData.append("weather", weather);
    formData.append("lure", lure);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/catches/${id}/`, formData);
      history.push(`/catches/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };



  const textFields = (
    <div className="text-center">
      {/* Caption */}
      <Form.Group>
        <Form.Label>Caption</Form.Label>
        <Form.Control
            type="text"
            name="caption"
            value={caption}
            onChange={handleChange}
        />
      </Form.Group>
      {errors?.caption?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Species */}
      <Form.Group>
        <Form.Label>Species</Form.Label>
        <Form.Control
            type="text"
            name="species"
            value={species}
            onChange={handleChange}
        />
      </Form.Group>
      {errors?.species?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Method */}
      <Form.Group>
        <Form.Label>Method</Form.Label>
        <Form.Control
            as="select"
            name="method"
            value={method}
            onChange={handleChange}
        >
            <option value="">Select method</option>
            <option value="flyrod">Fly Rod</option>
            <option value="spinning">Spinning</option>
            <option value="trolling">Trolling</option>
        </Form.Control>
      </Form.Group>
      {errors?.method?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Weight */}
      <Form.Group>
        <Form.Label>Weight</Form.Label>
        <Form.Control
            type="number"
            name="weight"
            value={weight}
            onChange={handleChange}
        />
      </Form.Group>
      {errors?.weight?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Length */}
      <Form.Group>
        <Form.Label>Length</Form.Label>
        <Form.Control
            type="number"
            name="length"
            value={length}
            onChange={handleChange}
        />
      </Form.Group>
      {errors?.length?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Location */}
      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control
            type="text"
            name="location"
            value={location}
            onChange={handleChange}
        />
      </Form.Group>
      {errors?.location?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Latitude */}
      <Form.Group>
        <Form.Label>Latitude</Form.Label>
        <Form.Control
            type="number"
            name="latitude"
            value={latitude}
            onChange={handleChange}
        />
        </Form.Group>

      {/* Longitude */}
      <Form.Group>
        <Form.Label>Longitude</Form.Label>
        <Form.Control
            type="number"
            name="longitude"
            value={longitude}
            onChange={handleChange}
        />
      </Form.Group>

      {/* Time */}
      <Form.Group>
        <Form.Label>Time</Form.Label>
        <Form.Control
            type="time"
            name="time"
            value={time}
            onChange={handleChange}
        />
      </Form.Group>

      {/* Weather */}
      <Form.Group>
        <Form.Label>Weather</Form.Label>
        <Form.Control
            as="select"
            name="weather"
            value={weather}
            onChange={handleChange}
        >
            <option value="">Select weather</option>
            <option value="sunny">Sunny</option>
            <option value="cloudy">Cloudy</option>
            <option value="rainy">Rainy</option>
            <option value="stormy">Stormy</option>
        </Form.Control>
      </Form.Group>

      {/* Lure */}
      <Form.Group>
        <Form.Label>Lure</Form.Label>
        <Form.Control
            type="text"
            name="lure"
            value={lure}
            onChange={handleChange}
        />
      </Form.Group>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
                  <figure>
                    <Image
                      className={appStyles.Image}
                      src={postData.image}
                      rounded
                    />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default CatchEditForm;
