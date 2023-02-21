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
    // eslint-disable-next-line
  }, []);

  function showLogout() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

// Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({username: "", id: 0, status: false});
  };

  return (
      <div className="App">
        <AuthContext.Provider value={ { authState, setAuthState } }>
          <Router>
            <div className="navbar">
                  {!authState.status ? (
                      <>
                        <div className="notLoggedIn">
                          <Link to="/"><b>Strona główna</b></Link>
                          <Link to="/createpost"><b>Dodaj ogłoszenie</b></Link>
                          <Link to="/login"><b>Logowanie</b></Link>
                        </div>
                      </>
                  ) : (
                      <>
                        <div className="notLoggedIn">
                          <Link to="/"><b>Strona główna</b></Link>
                          <Link to="/createpost"><b>Dodaj ogłoszenie</b></Link>
                        </div>
                        <div className="loggedIn">

                          <div className="dropdown">
                            <button className="dropbtn" onClick={showLogout}>
                              Witaj,&nbsp;<b><span style={{color: "#ff6700"}}>{authState.username}</span></b>
                              <i className="fa fa-caret-down"></i>
                            </button>
                            <div className="dropdown-content" id="myDropdown">
                              <label onClick={logout}>Wyloguj</label>
                            </div>
                          </div>
                        </div>
                      </>
                  )}
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
