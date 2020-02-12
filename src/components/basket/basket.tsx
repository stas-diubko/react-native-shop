import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Basket extends React.Component {

    render() {

        return (
            <View style={styles.basketContainer}>
                <Text>Hello from basket component!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    basketContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#eeeeee',
    },
});