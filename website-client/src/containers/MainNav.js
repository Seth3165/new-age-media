import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import UserNav from "./UserNav";
import AuthForm from "../components/AuthForm";
import {authUser} from "../store/actions/auth";
import {removeError} from "../store/actions/errors";
import withAuth from "../hocs/withAuth";

const MainNav = props => {
  const {authUser, errors, removeError, currentUser} = props;
  return(
    <div className="navContainer">
      <Switch>
        <Route exact path="/" render={props => <UserNav currentUser={currentUser} {...props}/>}/>
        <Route 
          exact 
          path="/signin" 
          render={props => {
            return(
              <AuthForm 
                removeError={removeError}
                errors={errors}
                onAuth={authUser} 
                buttonText="Log in" 
                heading="Welcome Back." 
                {...props}
              />
            );
          }}
        />
        <Route
          exact 
          path="/signup" 
          render={props => {
            return(
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                signUp
                buttonText="Sign me up!" 
                heading="New Age Media Sign Up" 
                {...props}
              />
            );
          }}
        />
      </Switch>
    </div>
  );
};

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(
  connect(mapStateToProps, {authUser, removeError})(MainNav)
);
