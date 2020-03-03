import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

export default class SignUp extends React.Component {

    render() {

        return (
            <View style={styles.signInWrap}>
                <View style={styles.container}>
                    <View style={styles.inputStyles}>
                        <Input placeholder='Enter your name'/>
                    </View>
                    <View style={styles.inputStyles}>
                        <Input placeholder='Enter your email'/>
                    </View>
                    <View style={styles.inputStyles}>
                        <Input placeholder='Enter your password' secureTextEntry={true} />
                    </View>
                    <View style={styles.buttonStyle}>
                        <Button title='Sign Up' />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    signInWrap: {
      display:'flex',
      paddingTop: '20%',
      paddingLeft: 20,
      paddingRight: 20
    },
    container: {
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
    },
    inputStyles: {
        width: 300,
        marginBottom: 20
    },
    buttonStyle: {
        width: 200
    }
});