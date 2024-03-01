import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import CatchCreateForm from "./pages/catches/CatchCreateForm";
import CatchPage from "./pages/catches/CatchPage";
import CatchesPage from "./pages/catches/CatchesPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import CatchEditForm from "./pages/catches/CatchEditForm";


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  
  return (
    
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route 
            exact 
            path="/" 
            render={() => (
              <CatchesPage message="No results found. Adjust your search." />
            )} 
          />
          <Route 
            exact 
            path="/feed" 
            render={() => (
              <CatchesPage 
                message="No results found. Adjust your search or follow a user." 
                filter={`owner__followed__owner__profile=${profile_id}&`} 
              />
            )} 
          />
          <Route 
            exact 
            path="/liked" 
            render={() => (
              <CatchesPage 
                message="No results found. Adjust your search or like a catch." 
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`} 
              />
            )} 
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/catches/create" render={() => <CatchCreateForm />} />
          <Route exact path="/catches/:id" render={() => <CatchPage />} />
          <Route exact path="/catches/:id/edit" render={() => <CatchEditForm />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;