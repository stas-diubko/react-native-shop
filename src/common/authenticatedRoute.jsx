import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from "react-router-native";
import { makeIsLoggedIn } from '../helpers/authHelper';

let getIsLogin = async () => {
  let isLogin = await makeIsLoggedIn();
  return isLogin
}

const AuthenticatedRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  
  const _render = (props) => {
    return getIsLogin() ? (
      <Component {...props} />
    ) : (
        <Redirect to='/' />
      );
  };
  return (
    <Route {...rest} render={_render} />
  );
};

const mapStateToProps = (state) => {
  return {
    // isLoggedIn: state.auth.isAuth
  };
};

const mapDispatchToProps = (_dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute));