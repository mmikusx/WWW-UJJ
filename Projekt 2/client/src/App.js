import './App.css';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios.get("http://localhost:3001/auth/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        setAuthState({...authState, status: false});
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    });

  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({username: "", id: 0, status: false});
  };

  return (
      <div className="App">
        <AuthContext.Provider value={ { authState, setAuthState } }>
          <Router>
            <div className="navbar">
              <Link to="/">Home page</Link>
              <Link to="/createpost">Create a post</Link>
              {!authState.status ? (
                  <>
                    <Link to="/login">Logowanie</Link>
                    <Link to="/registration">Rejestracja</Link>
                  </>
              ) : (
                  <button onClick={logout}>Wyloguj</button>
              )}

              <h1>{authState.username}</h1>
            </div>
            <Switch>
              <Route path="/" exact component={ Home }></Route>
              <Route path="/createpost" exact component={ CreatePost }></Route>
              <Route path="/post/:id" exact component={ Post }></Route>
              <Route path="/registration" exact component={ Registration }></Route>
              <Route path="/login" exact component={ Login }></Route>
            </Switch>
          </Router>
        </AuthContext.Provider>
      </div>
);
}

export default App;
