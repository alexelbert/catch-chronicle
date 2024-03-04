import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Catch from "./Catch";
import Comment from "../comments/Comment";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

function CatchPage() {
  const { id } = useParams();
  const [catches, setCatches] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_picture = currentUser?.profile_picture;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: catches }, {data: comments}] = await Promise.all([
          axiosReq.get(`/catches/${id}`),
          axiosReq.get(`comments/?catches=${id}`),
        ]);
        setCatches({ results: [catches] });
        setComments(comments);
      } catch (err) {
        //console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Catch {...catches.results[0]} setCatches={setCatches} catchPage />
        <Container className={appStyles.Content}>
        {currentUser ? (
        <CommentCreateForm
          profile_id={currentUser.profile_id}
          profilePicture={profile_picture}
          id={id}
          setCatches={setCatches}
          setComments={setComments}
        />
        ) : comments.results.length ? (
          "Comments"
        ) : null}
        {comments.results.length ? (
            <InfiniteScroll
            children={comments.results.map((comment) => (
              <Comment
                key={comment.id}
                {...comment}
                setCatches={setCatches}
                setComments={setComments}
              />
            ))}
            dataLength={comments.results.length}
            loader={<Asset spinner />}
            hasMore={!!comments.next}
            next={() => fetchMoreData(comments, setComments)}
          />
        ) : currentUser ? (
          <span>No comments yet, be the first to comment!</span>
        ) : (
          <span>No comments... yet</span>
        )}
      </Container>
    </Col>
    <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
      
    </Col>
  </Row>
);
}

export default CatchPage;