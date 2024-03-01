import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Catch from "./Catch";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function CatchPage() {
  const { id } = useParams();
  const [catches, setCatches] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: catches }] = await Promise.all([
          axiosReq.get(`/catches/${id}`),
        ]);
        setCatches({ results: [catches] });
        console.log(catches);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles view for mobile</p>
        <Catch {...catches.results[0]} setCatches={setCatches} catchPage />
        <Container className={appStyles.Content}>
        {currentUser ? (
        <CommentCreateForm
          profile_id={currentUser.profile_id}
          profileImage={profile_image}
          id={id}
          setCatches={setCatches}
          setComments={setComments}
        />
        ) : comments.results.length ? (
          "Comments"
        ) : null}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles view for desktop
      </Col>
    </Row>
  );
}

export default CatchPage;