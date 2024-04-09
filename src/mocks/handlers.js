import { rest } from "msw";

const baseURL = "https://catch-chronicle-api-d205d9d4b14c.herokuapp.com/";

export const handlers = [
  rest.post(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(ctx.json(
      {
        "pk": 1,
        "username": "alex",
        "email": "",
        "first_name": "",
        "last_name": "",
        "profile_id": 1,
        "profile_picture": "https://res.cloudinary.com/dfqbtlccb/image/upload/v1/media/images/default_xriyar"
      }
    ));
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`${baseURL}/profiles/3`, (req, res, ctx) => {
    return res(
      ctx.json({
        "id": 3,
        "owner": "testuser3",
        "is_owner": true,
        "following_id": null,
        "created_at": "05 Apr 2024",
        "updated_at": "05 Apr 2024",
        "catches_count": 0,
        "name": "",
        "bio": "",
        "location": "",
        "profile_picture": "https://res.cloudinary.com/dfqbtlccb/image/upload/v1/media/../default_profile_zsweuz",
        "facebook_url": "",
        "twitter_url": "",
        "instagram_url": "",
        "following_count": 1,
        "followers_count": 0
    })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/token/refresh/`, (req, res, ctx) => {
    return res(
      ctx.json({
        access: "test-access-token",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/login/`, (req, res, ctx) => {
    return res(
      ctx.json({
        user: {
            pk: 1,
            username: "testuser",
            email: "",
            first_name: "",
            last_name: "",
            profile_id: 1,
            profile_picture: "https://res.cloudinary.com/dfqbtlccb/image/upload/v1/media/../default_profile_zsweuz"
        },
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/registration/`, (req, res, ctx) => {
    return res(
      ctx.json({
        user: {
            pk: 1,
            username: "testuser",
            email: "",
            first_name: "",
            last_name: "",
            profile_id: 1,
            profile_picture: "https://res.cloudinary.com/dfqbtlccb/image/upload/v1/media/../default_profile_zsweuz"
        },
      })
    );
  }),
  rest.post(`${baseURL}catches/`, (req, res, ctx) => {
    return res(ctx.status(400));
  }),
  rest.get(`${baseURL}catches/1`, (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        owner: "testuser",
        is_owner: false,
        profile_id: 1,
        like_id: null,
        likes_count: "",
        comments_count: "",
        profile_picture: "https://res.cloudinary.com/dfqbtlccb/image/upload/v1/media/../default_profile_zsweuz",
        created_at: "04 Mar 2024",
        caption: "Test description",
        species: "Sea trout",
        method: "flyrod",
        weight: "1.30",
        length: "41.00",
        location: "test",
        latitude: 123.123,
        longitude: 123.123,
        time: "12:35:00",
        weather: "cloudy",
        lure: "pattegrisen",
        image: "test.jpeg"
      })
    );
  }),
  rest.get(`${baseURL}profiles/`, (req, res, ctx) => {
    return res(
      ctx.json({
        count: 2,
        next: null,
        previous: null,
        results: [
          {
            id: 1,
            owner: "testuser",
            is_owner: false,
            following_id: null,
            created_at: "04 Mar 2024",
            updated_at: "04 Mar 2024",
            catches_count: 0,
            name: "testname",
            bio: "Test description",
            location: "testlocation",
            profile_picture: "https://res.cloudinary.com/dfqbtlccb/image/upload/v1/media/../default_profile_zsweuz",
            facebook_url: "",
            twitter_url: "",
            instagram_url: "",
            following_count: 0,
            followers_count: 0
          },
          {
            id: 2,
            owner: "testuser",
            is_owner: false,
            following_id: null,
            created_at: "04 Mar 2024",
            updated_at: "04 Mar 2024",
            catches_count: 1,
            name: "testname2",
            bio: "Test description 2",
            location: "testlocation2",
            profile_picture: "https://res.cloudinary.com/dfqbtlccb/image/upload/v1/media/../default_profile_zsweuz",
            facebook_url: "",
            twitter_url: "",
            instagram_url: "",
            following_count: 1,
            followers_count: 1
          },
        ],
      })
    );
  }),
  rest.get(`${baseURL}comments/`, (req, res, ctx) => {
    return res(
      ctx.json({
        count: 2,
        next: null,
        previous: null,
        results: [
          {
            id: 2,
            owner: "testuser",
            catch: 1,
            content: "Test comment 1",
            is_owner: false,
          },
          {
            id: 1,
            owner: "testuser",
            catch: 1,
            content: "Test comment 2",
            is_owner: false,
          },
        ],
      })
    );
  }),

];