import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {removeError} from "../store/actions/errors";
import withAuth from "../hocs/withAuth";

const ScrollNav = props => {
  const {errors, removeError, currentUser} = props;
  
  return(
    <div className="scrollContainer"></div>
  );
};

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(
  connect(mapStateToProps, {removeError})(ScrollNav)
);