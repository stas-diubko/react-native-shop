import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import Home from './src/components/home/home';
import SignUp from './src/components/auth/sign-up/sign-up';
import SignIn from './src/components/auth/sign-in/sign-in';
import Basket from './src/components/basket/basket';
import Profile from './src/components/profile/profile';

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Link
            to="/"
            underlayColor="#f0f4f7"
          >
            <Text style={styles.menuItems}>Home</Text>
          </Link>
          <Link
            to="/basket"
            underlayColor="#f0f4f7"
          >
            <Text style={styles.menuItems}>Basket</Text>
          </Link>
          <Link
            to="/profile"
            underlayColor="#f0f4f7"
          >
            <Text style={styles.menuItems}>Profile</Text>
          </Link>
        </View>
        <Route exact path="/" component={Home} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/basket" component={Basket} />
        <Route path="/profile" component={Profile} />
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    justifyContent: 'flex-start',
    paddingTop: 45,
  },
  menuItems: {
    color: 'green',
    fontSize: 18,
    marginLeft: 10
  }
});
