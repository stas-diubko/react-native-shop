import React from 'react';
import autoBind from 'react-autobind';
import { StyleSheet, Text, View, } from 'react-native';
import { Link, withRouter } from "react-router-native";
import { connect } from "react-redux";
import { Icon } from 'native-base';

import { onLogout } from '../../redux/auth/actions';
import { removeStorageItem } from '../../helpers/asyncStorageHelper';
import { getStorageItem } from '../../helpers/asyncStorageHelper';
import { getToken } from '../../helpers/authHelper';
import { makeIsLoggedIn } from '../../helpers/authHelper';
export class Menu extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            basketLength: 0,
            isAuth: false
        };
        autoBind(this);
    }

    componentWillMount() {
      this.getIsLogin();
    }

    onLogout = async () => {
      await removeStorageItem('token');
      this.getIsLogin();
      return this.props.onLogout();
    }

    getBasketLength = async () => {
      let parsedToken = await getToken();
      if (parsedToken) {
        let dataBasketParsed = await getStorageItem(`Basket-${parsedToken.id}`)
        if(dataBasketParsed) {
          this.setState({
            basketLength: dataBasketParsed.length
          })
        }
      } else {
        return;
      }
    }

    getIsLogin = async () => {
      let isLogin = await makeIsLoggedIn();
      this.setState({
        isAuth: isLogin
      })
    }

    render() {
      this.getBasketLength();
      this.getIsLogin();
        return (
            <View style={styles.container}>
              <View style={styles.wrapItems}>
                <Link
                  to="/"
                  underlayColor="#f0f4f7"
                >
                  <Text style={styles.menuItems}><Icon name='home' style={this.props.location.pathname == '/' ? styles.activeScreen : styles.notActiveScreen}/></Text>
                </Link>
                <Link
                  to="/profile"
                  underlayColor="#f0f4f7"
                >
                  <Text style={this.state.isAuth ? styles.menuItems : styles.notDisplay}><Icon name='person' style={this.props.location.pathname == '/profile' ? styles.activeScreen : styles.notActiveScreen}/></Text>
                </Link>
                <Link
                  to="/basket"
                  underlayColor="#f0f4f7"
                >
                  <Text style={this.state.isAuth ? styles.menuItems : styles.notDisplay}><Icon name='cart' style={this.props.location.pathname == '/basket' ? styles.activeScreen : this.state.basketLength > 0 ? styles.iconStyleActive : styles.notActiveScreen}/></Text>
                </Link>
              </View>
              
              <View>
                <Link
                  to="/sign-in"
                  underlayColor="#f0f4f7"
                >
                  <Text style={!this.state.isAuth ? styles.menuItems : styles.notDisplay}><Icon name='log-in'/></Text>
                </Link>
                <Text style={this.state.isAuth ? styles.menuItems : styles.notDisplay} onPress={this.onLogout}><Icon name='log-out'/></Text>
              </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'lightgrey',
      justifyContent: 'space-between',
      paddingTop: 45,
    },
    wrapItems: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
    menuItems: {
      color: 'green',
      fontSize: 18,
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 10
    },
    notDisplay: {
      display: 'none'
    },
    iconStyleActive: {
      color: 'brown'
    },
    activeScreen: {
      color: '#000'
    },
    notActiveScreen: {
      color: 'darkgrey',
    }
});


const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(onLogout() ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu));