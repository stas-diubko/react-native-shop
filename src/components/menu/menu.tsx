import React from 'react';
import autoBind from 'react-autobind';
import { StyleSheet, Text, View, Button, ActivityIndicator, FlatList, Image } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import { connect } from "react-redux";
import { getBooksAsync } from '../../redux/home/actions';
import Loader from '../../common/loader/loaderComponent';

export class Menu extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
          
        };
        autoBind(this);
    }

    render() {
      
        return (
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
            <Loader/>
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
      justifyContent: 'flex-start',
      paddingTop: 45,
    },
    menuItems: {
      color: 'green',
      fontSize: 18,
      marginLeft: 15,
      marginBottom: 10
    }
});


const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps)(Menu);