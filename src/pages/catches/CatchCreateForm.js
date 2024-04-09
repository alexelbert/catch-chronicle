import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";
import Button from "../../components/Button";
import buttonStyles from "../../styles/Button.module.css";

import Upload from "../../assets/upload.png";

import styles from "../../styles/CatchCreateEditForm.module.css";
import appStyles from "../../App.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import { useEffect } from "react";
import axios from 'axios';

async function getAddressFromCoords(lat, lng) {
  try {
    const response = await axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lng}&format=json`, { withCredentials: false });
    return response.data.address.town;
  } catch (error) {
    return '';
  }
}

function CatchCreateForm() {

  useRedirect("loggedOut");

  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    caption: '',
    species: '',
    method: '',
    weight: '',
    length: '',
    location: '',
    latitude: '',
    longitude: '',
    time: '',
    weather: '',
    lure: '',
    image: '',
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
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/catches/", formData);
      history.push(`/catches/${data.id}`);
    } catch (err) {
      
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  // Get user's current location and time
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const location = await getAddressFromCoords(lat, lng);
  
      setPostData((prevData) => ({
        ...prevData,
        latitude: lat,
        longitude: lng,
        location: location,
      }));
    });
  
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    setPostData((prevData) => ({
      ...prevData,
      time: currentTime,
    }));
  }, []);

  const textFields = (
    <div className="text-center">
      {/* Caption */}
      <Form.Group>
        <Form.Label>Caption</Form.Label>
        <Form.Control
          as="textarea"
          rows={3} // Adjust this number to change the height of the textarea
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
            min="0"
            step="0.01"
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
            min="0"
            step="0.01"
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
        label="cancel" 
        handleClick={() => history.goBack()} 
        additionalClasses={buttonStyles.CancelButton} 
      />
      <Button 
        label="create" 
        type="submit" 
      />
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
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                  <Form.Label
                      className={`${buttonStyles.Button} Button`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

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

export default CatchCreateForm;