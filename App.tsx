import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import { Provider } from 'react-redux';
import { Store } from "redux";
import Home from './src/components/home/home';
import SignUp from './src/components/auth/sign-up/sign-up';
import SignIn from './src/components/auth/sign-in/sign-in';
import Basket from './src/components/basket/basket';
import Profile from './src/components/profile/profile';
import configureStore from "./src/redux/store";
import {RootState} from './src/redux/root.reducer'
import { Menu } from './src/components/menu/menu';
import Loader from './src/common/loader/loaderComponent';

const store: Store<RootState> = configureStore();
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>

        <NativeRouter>
          <Menu/>
          <Loader/>
          <Route exact path="/" component={Home} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/basket" component={Basket} />
          <Route path="/profile" component={Profile} />
        </NativeRouter>
      </Provider>

    );
  }
}
