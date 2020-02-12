import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Home extends React.Component {

    render() {

        return (
            <View style={styles.homeContainer}>
                <Text >Hello from Home component!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#eeeeee',
    },
});
  