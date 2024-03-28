import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Catch from "../catches/Catch";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import FollowButton from "../../components/FollowButton";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileCatches, setProfileCatches] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const {setProfileData, handleFollow, handleUnfollow} = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileCatches }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/catches/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileCatches(profileCatches);
        setHasLoaded(true);
      } catch (err) {
        //console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.profile_picture}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.catches_count}</div>
              <div>Catches</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>Followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>Following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
          {currentUser &&
            !is_owner &&
            <FollowButton
              isFollowing={profile?.following_id}
              handleFollow={handleFollow}
              handleUnfollow={handleUnfollow}
              profile={profile}
            />
          }
        </Col>
      </Row>
  
      {/* Display Name and Location */}
      <Row className="px-3 text-center">
        {profile?.name && <Col className="p-3">{profile.name}</Col>}
        {profile?.location && <Col className="p-3">{profile.location}</Col>}
      </Row>
  
      {/* Display Bio and URLs */}
      <Row className="px-3 text-center">
        <Col xs={12} className="p-3">
          {profile?.bio && <div>{profile.bio}</div>}
          <div className="urls">
            {profile?.facebook_url && (
              <a href={profile.facebook_url} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
            )}
            {profile?.twitter_url && (
              <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            )}
            {profile?.instagram_url && (
              <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            )}
            {/* Add more social media icons as needed */}
          </div>
        </Col>
      </Row>
    </>
  );

  const mainProfileCatches = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s catches</p>
      <hr />
      {profileCatches.results.length ? (
        <InfiniteScroll
          children={profileCatches.results.map((post) => (
            <Catch key={post.id} {...post} setCatches={setProfileCatches} />
          ))}
          dataLength={profileCatches.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileCatches.next}
          next={() => fetchMoreData(profileCatches, setProfileCatches)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results, ${profile?.owner} hasn't made a catch yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfileCatches}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;