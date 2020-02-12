import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Profile extends React.Component {

    render() {

        return (
            <View style={styles.profileContainer}>
                <Text>Hello from Profile component!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#eeeeee',
    },
});