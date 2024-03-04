import React, { useState } from "react"; // Add useState
import styles from "../../styles/Catch.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip, Modal, Button } from "react-bootstrap"; // Add Modal and Button
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Catch = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_picture,
    comments_count,
    likes_count,
    like_id,
    caption,
    image,
    time,
    weather,
    species,
    method,
    weight,
    length,
    location,
    latitude,
    longitude,
    lure,
    created_at,
    catchPage,
    setCatches,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      await axiosRes.delete(`/catches/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleEdit = () => {
    history.push(`/catches/${id}/edit`);
  };

    const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { catch: id });
      setCatches((prevCatches) => ({
        ...prevCatches,
        results: prevCatches.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setCatches((prevCatches) => ({
        ...prevCatches,
        results: prevCatches.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card className={styles.Catch}>
        <Card.Body>
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_picture} height={55} />
              {owner}
            </Link>
            <div className="d-flex align-items-center">
              <span>{created_at}</span>
              {is_owner && catchPage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          </Media>
        </Card.Body>
        <Link to={`/catches/${id}`}>
          <Card.Img src={image} alt={caption} />
        </Link>
        <Card.Body>
          {caption && <Card.Title className="text-center">{caption}</Card.Title>}
          {catchPage && (
            <div className="row">
              <div className="col-md-6">
                <ul className="list-unstyled">
                  <li><strong>Species:</strong> {species}</li>
                  <li><strong>Method:</strong> {method}</li>
                  <li><strong>Weight:</strong> {weight}</li>
                  <li><strong>Length:</strong> {length}</li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-unstyled">
                  <li><strong>Location:</strong> {location}</li>
                  <li><strong>Latitude:</strong> {latitude}</li>
                  <li><strong>Longitude:</strong> {longitude}</li>
                  <li><strong>Time:</strong> {time}</li>
                  <li><strong>Weather:</strong> {weather}</li>
                  <li><strong>Lure:</strong> {lure}</li>
                </ul>
              </div>
            </div>
          )}
          <div className={styles.PostBar}>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't like your own catch</Tooltip>}
              >
                <i className="fa-solid fa-thumbs-up" />
              </OverlayTrigger>
            ) : like_id ? (
              <span onClick={handleUnlike}>
                <i className={`fa-solid fa-thumbs-up ${styles.Thumb}`} />
              </span>
            ) : currentUser ? (
              <span onClick={handleLike}>
                <i className={`fa-solid fa-thumbs-up ${styles.ThumbOutline}`} />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to like posts!</Tooltip>}
              >
                <i className="fa-solid fa-thumbs-up" />
              </OverlayTrigger>
            )}
            {likes_count}
            <Link to={`/catches/${id}`}>
              <i className="fa-regular fa-comment" />
            </Link>
            {comments_count}
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Catch</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this catch?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Catch;
