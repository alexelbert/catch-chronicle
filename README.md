# Catch Chronicle: Fish, Share and Connect 🎣

**Catch Chronicle** is a social media app dedicated to logging and sharing catches.


Simple joy of catching moments often goes overlooked, unless it's something extraordinary. **Catch Chronicle** urges you to embrace those everyday catches and celebrate the moments that matter with others.
Whether you're reeling in a big fish on a serene lake or capturing the laughter of your loved ones during a family gathering, log your catches and share these cherished memories with your fellow anglers and friends.

<hr>

**Key features:**

- **User Accounts & Profiles**: Create an account and customize your profile.
- **Log Catches with Geolocation**: Share your catches and location data.
- **Search for Catches**: Find catches by title or user.
- **User Interactions**: Like and comment on catches, follow users you like.

<hr>

Deployed application can be found here: [Catch Chronicle](https://catch-chronicle-61d760d135f4.herokuapp.com)

## Features

### Existing Features

- **User authentication and profiles**: Users can create an account, log in and log out. They can customize their profile by adding a profile picture, bio, location, name and other social media platforms.
- **Logging catches with geolocation**: Users can log catches and location data. They can also edit and delete their catches.
- **Catches list view with infinite scroll**: Users can see lists of catches (all catches, catches by followed users, liked catches). For better performance and user experience, the lists are paginated, and additional catches are loaded as the user scrolls towards the bottom of the page.
- **Catches search**: Users can search for catches by title or user.
- **User interactions**: Users can like and comment on catches and follow other users.


#### User Authentication

- Signed-out users can see a list of all catches and search for catches. To use the other features of the app, an account creation is required and sign in.

![Screen for signed-out users]()

- Signed in users can access their feed, their liked catches.
- Users can also log catches by clicking on the add catch link in the navigation bar.

![Screen for signed-in users]()

#### User Profiles

- Signed-in users can click on their username in the top navigation bar to access their profile.
- Users can edit their profile by clicking on the three dots in the top-right corner of the profile page.
- Also, change their username and password by clicking on the corresponding options on their profile page dropdown menu.
- Users can follow other users by clicking on the Follow button on their profile page or in the *Popular profiles* widget.

![Screen for user profile]()

#### Add Catch

- Users can add catches by clicking on the add catch link in the navigation bar.
- On the add catch page, users can add a catch. Users can add a caption, image, species, weight, length, lure, location data to their catch.
- Location data can be added automatically if the user grants the application access to their current location. Alternatively, users can type in location on their own.
- After submitting the form, the user will be redirected to the catch detail page, which can also be accessed by clicking on a catch.

![Screen for add catch]()

#### Editing and Deleting Sounds

- Users can edit and delete their catches by clicking on the dropdown menu indicated by three dots on the catch detail page.

![Screen for catch details]()

#### Comments and Likes

- Signed-in users can comment on sounds by submitting the comment form on the sound detail page.
- New comments will appear underneath the catch detail and can be edited or deleted by clicking on the dots in the comment dropdown menu.
- The number of comments will appear underneath the catches details.
- Users can like catches by clicking on the heart icon on the catch detail page.

![Screen for comments and likes]()


<hr>

## Technologies Used

### Frameworks and Languages

The application is built with [React](https://reactjs.org/), which is a frontend JavaScript library. The project was initiated with [Create React App](https://create-react-app.dev/).

### Additional JavaScript and React Libraries

- [Axios](https://axios-http.com/) for making HTTP requests to the API.
- [Bootstrap](https://getbootstrap.com/) and [React Bootstrap](https://react-bootstrap.github.io/) for layout and styling.
- [React Router](https://reactrouter.com/en/main) for routing.
- [React Infinite Scroll Component](https://www.npmjs.com/package/react-infinite-scroll-component) for infinite scroll.
- [JWT Decode](https://www.npmjs.com/package/jwt-decode) for JSON Web Tokens.
- [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for automated testing.

All used third party libraries contribute important features to the application. Axios stand out in particular for their essential role in the project: Axios for providing the connection between the frontend and the backend part of the project.

### Other Software

- [GitHub](https://github.com/) is used to store all project files in the [repository](https://github.com/alexelbert/catch-chronicle)
- [Heroku](https://heroku.com/) is used to deployment.
- [Visual Studio Code](https://code.visualstudio.com) was used as code editor.


## Deployment

The application was deployed to [Heroku](https://heroku.com). The Applications live version can be found at https://catch-chronicle-61d760d135f4.herokuapp.com.

Please follow these steps for deployment of the application:

1. Deploy your own version of the [Catch Chronicle API](https://github.com/alexelbert/catch-chronicle-api) by following the [deployment instructions for the Catch Chronicle API](https://github.com/alexelbert/catch-chronicle-api#deployment).

2. Clone or fork this repository. For forking it, go to https://github.com/alexelbert/catch-chronicle, click on `Fork` and follow the instructions. For cloning the repository, run `git clone https://github.com/alexelbert/catch-chronicle.git` in your terminal.

 
    ![Clone or fork repository](docs/deployment/fork-or-clone-repo.png)

    </hr>

3. Go to the repository folder and edit the file `src/api/axiosDefaults.js`. In the file, change the value of `axios.defaults.baseURL` to the URL of your own deployed API. You can find the URL by accessing your API app from Herokus dashboard and then copying the URL from the `Open app` button.

4. If you don't have a API app yet, login to [Heroku](https://heroku.com). Then start a new app from the [Heroku dashboard](https://dashboard.heroku.com) by clicking on `New` and then on `Create new app`.


    ![Create Heroku app](docs/deployment/new-heroku-app.png)


5. Give your app a name that is available and choose your region based of where you are located.

6. Click on the *Deploy* tab and connect the Heroku app to your GitHub repository.


    ![Connect Heroku app to GitHub repo](docs/deployment/connect-to-github-heroku.png)


7. Scroll down and select the branch you want to deploy in the *Manual deploy* section. Now click on `Deploy Branch` for the deployment of the application.


    ![Deploy branch](docs/deployment/heroku-deploy-branch.png)


8.  In case you run into any issues while deploying your App you can access Heroku logs by clicking on `More` and then `View logs` you can also check the *Activity* tab for debugging.


    ![Debugging](docs/deployment/issue-deploy-heroku.png)

9.  After successful deployment, click on `Open app` to open your deployed app.


    ![Open app](docs/deployment/open-heroku-deployed-app.png)


    If everything went ok, you should see the *Catch Chronicle* landing page.

