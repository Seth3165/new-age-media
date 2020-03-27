import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {removeError} from "../store/actions/errors";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import NewsList from "./NewsList";
import withAuth from "../hocs/withAuth";

const ScrollNav = props => {
  const {errors, removeError, currentUser} = props;
  
  return(
    <div className="scrollContainer">
      <Switch>
        <Route path="/users/:id/posts/new" render={props => <NewsList currentUser={currentUser} {...props}/>}/>
        <Route path="/users/:id/posts/:post_id/add" render={props => <MessageForm currentUser={currentUser} {...props}/>}/>
        <Route path="/users/:id/posts/:post_id" render={props => <MessageList currentUser={currentUser} {...props}/>}/>
        <Route path="/" render={props => <NewsList currentUser={currentUser} isAdmin={currentUser.user.isAdmin} {...props}/>}/>
      </Switch>
    </div>
  );
};

// 


function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(
  connect(mapStateToProps, {removeError})(ScrollNav)
);