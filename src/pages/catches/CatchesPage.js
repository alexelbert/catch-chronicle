import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Catch from "./Catch";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/CatchesPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function CatchesPage({message, filter = ""}) {
    const [catches, setCatches] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchCatches = async () => {
          try {
            const { data } = await axiosReq.get(`/catches/?${filter}search=${query}`);
            setCatches(data);
            setHasLoaded(true);
          } catch (err) {
            console.log(err);
          }
        };
    
        setHasLoaded(false);
        const timer = setTimeout(() => {
          fetchCatches();
        }, 1000);
    
        return () => {
          clearTimeout(timer);
        };
      }, [filter, query, pathname]);
  
      return (
        <Row className="h-100">
          <Col className="py-2 p-0 p-lg-2" lg={8}>
            <p>Popular profiles mobile</p>
            <i className={`fas fa-search ${styles.SearchIcon}`} />
            <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
            >
            <Form.Control
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="text"
                className="mr-sm-2"
                placeholder="Search catches"
            />
            </Form>
            {hasLoaded ? (
              <>
                {catches.results.length ? (
                <InfiniteScroll
                    children={catches.results.map((post) => (
                        <Catch key={post.id} {...post} setCatches={setCatches} />
                    ))}
                    dataLength={catches.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!catches.next}
                    next={() => fetchMoreData(catches, setCatches)}
                />
                ) : (
                  <Container className={appStyles.Content}>
                    <Asset src={NoResults} message={message} />
                  </Container>
                )}
              </>
            ) : (
              <Container className={appStyles.Content}>
                <Asset spinner />
              </Container>
            )}
          </Col>
          <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
            <p>Popular profiles for desktop</p>
          </Col>
        </Row>
      );
    }

export default CatchesPage;