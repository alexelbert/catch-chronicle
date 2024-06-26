import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "../../components/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import buttonStyles from "../../styles/Button.module.css";

import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import appStyles from "../../App.module.css";

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    location: "",
    profile_picture: "",
    facebook_url: "",
    twitter_url: "",
    instagram_url: "",
  });
  
  const { name, bio, location, profile_picture, facebook_url, twitter_url, instagram_url } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, bio, location, profile_picture, facebook_url, twitter_url, instagram_url } = data;
          setProfileData({ name, bio, location, profile_picture, facebook_url, twitter_url, instagram_url });
        } catch (err) {
          
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("location", location);
    formData.append("facebook_url", facebook_url);
    formData.append("twitter_url", twitter_url);
    formData.append("instagram_url", instagram_url);
    
    if (imageFile?.current?.files[0]) {
      formData.append("profile_picture", imageFile?.current?.files[0]);
    }
    
    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_picture: data.profile_picture,
      }));
      history.goBack();
    } catch (err) {
      
      setErrors(err.response?.data);
    }
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={handleChange}
          name="name"
        />
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          value={bio}
          onChange={handleChange}
          name="bio"
          rows={7}
        />
        {errors?.bio?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
        ))}
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          value={location}
          onChange={handleChange}
          name="location"
        />
        <Form.Label>Facebook URL</Form.Label>
        <Form.Control
          type="url"
          value={facebook_url}
          onChange={handleChange}
          name="facebook_url"
        />
        <Form.Label>Twitter URL</Form.Label>
        <Form.Control
          type="url"
          value={twitter_url}
          onChange={handleChange}
          name="twitter_url"
        />
        <Form.Label>Instagram URL</Form.Label>
        <Form.Control
          type="url"
          value={instagram_url}
          onChange={handleChange}
          name="instagram_url"
        />
      </Form.Group>

      {errors?.bio?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Button
        label="Cancel"
        handleClick={() => history.goBack()}
        additionalClasses={buttonStyles.CancelButton}
      />
      <Button
        label="Save"
        type="submit"
      />
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
          <Container className={appStyles.Content}>
            <Form.Group>
              {profile_picture && (
                <figure>
                  <Image src={profile_picture} fluid />
                </figure>
              )}
              {errors?.profile_picture?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  className={`${buttonStyles.Button} Button`}
                  htmlFor="image-upload"
                >
                  Change Image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      profile_picture: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEditForm;