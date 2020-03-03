import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from "react-router-native";
import { Button, Input } from 'react-native-elements';
import { Icon } from 'native-base';
export default class SignIn extends React.Component {

    render() {

        return (
            <View style={styles.signInWrap}>
                <View style={styles.container}>
                    <View style={styles.inputStyles}>
                        <Input placeholder='Enter your email'/>
                    </View>
                    <View style={styles.inputStyles}>
                        <Input placeholder='Enter your password' secureTextEntry={true} />
                    </View>
                    <View style={styles.buttonStyle}>
                        <Button title='Sign In'/>
                    </View>
                    <View style={styles.textUnderFormWrap}>
                        <Text style={styles.textUnderForm}>Don't have an account? </Text><Link to='/sign-up'><Text style={styles.textUnderFormLink}>Go to Sing Up</Text></Link>
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
    },
    textUnderForm: {
        fontSize: 16,
        color: 'blue'
    },
    textUnderFormLink: {
        fontSize: 16,
        color: 'green'
    },
    textUnderFormWrap: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
    },
});