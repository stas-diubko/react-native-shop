import React from 'react';
import autoBind from 'react-autobind';
import { StyleSheet, Text, View, } from 'react-native';
import { Link } from "react-router-native";
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

    onLogout = async () => {
      await removeStorageItem('token');
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

    // getIsLogin = async () => {
    //   let isLogin = await makeIsLoggedIn();
    //   this.setState({
    //     isAuth: isLogin
    //   })
    // }

    render() {
      this.getBasketLength()
      // this.getIsLogin()
        return (
            <View style={styles.container}>
              <View style={styles.wrapItems}>
                <Link
                  to="/"
                  underlayColor="#f0f4f7"
                >
                  <Text style={styles.menuItems}><Icon name='home'/></Text>
                </Link>
                <Link
                  to="/profile"
                  underlayColor="#f0f4f7"
                >
                  <Text style={this.props.isAuth ? styles.menuItems : styles.notDisplay}><Icon name='person'/></Text>
                </Link>
                <Link
                  to="/basket"
                  underlayColor="#f0f4f7"
                >
                  <Text style={this.props.isAuth ? styles.menuItems : styles.notDisplay}><Icon name='cart' style={this.state.basketLength > 0 ? styles.iconStyleActive : null}/></Text>
                </Link>
              </View>
              
              <View>
                <Link
                  to="/sign-in"
                  underlayColor="#f0f4f7"
                >
                  <Text style={!this.props.isAuth ? styles.menuItems : styles.notDisplay}><Icon name='log-in'/></Text>
                </Link>
                <Text style={this.props.isAuth ? styles.menuItems : styles.notDisplay} onPress={this.onLogout}><Icon name='log-out'/></Text>
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
      color: 'red'
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);