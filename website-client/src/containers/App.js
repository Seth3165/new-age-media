/*global localStorage*/
import React from 'react';
import {Provider} from "react-redux";
import {configureStore} from "../store";
import {BrowserRouter as Router} from "react-router-dom";
import MainNav from "./MainNav";
import {setAuthorizationToken, setCurrentUser} from "../store/actions/auth";
import jwtDecode from "jwt-decode";

const store = configureStore();

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  try{
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (e) {
    store.dispatch(setCurrentUser({}));
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="appViewport">
        <MainNav/>
      </div>
    </Router>
  </Provider>
);

export default App;
