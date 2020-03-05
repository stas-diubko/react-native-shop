import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import autoBind from 'react-autobind';
import { connect } from "react-redux";
import { Redirect } from "react-router-native";

import { validateEmail, validatePassword, validateName } from '../../../helpers/validateHelper';
import { onRegisterAsync } from '../../../redux/auth/actions';
import { SignUpProps, SignUpState } from '../../../models/signUpModel'
import { setStorageItem } from '../../../helpers/asyncStorageHelper';
export class SignUp extends React.Component<SignUpProps, SignUpState> {
    constructor(props) {
        super(props);
        this.state = {
            nameText: '',
            emailText: '',
            passwordText: '',
            isValidName: true,
            isValidEmail: true,
            isValidPassword: true
        };
        autoBind(this);
    }
        
    onChangeName (text) {
        this.setState({
            nameText: text,
            isValidName: true,
        })
    }

    onChangeEmail (text) {
        this.setState({
            emailText: text,
            isValidEmail: true,
        })
    }

    onChangePassword (text) {
        this.setState({
            passwordText: text,
            isValidPassword: true
        })
    }

    onSubmit = async () => {
        if(!validateEmail(this.state.emailText) || !validatePassword(this.state.passwordText) || !validateName(this.state.nameText)) {
           
            if(!validateEmail(this.state.emailText)) {
                this.setState({
                    isValidEmail: false
                })
            }
            if(!validatePassword(this.state.passwordText)) {
                this.setState({
                    isValidPassword: false
                })
                
            }
            if(!validateName(this.state.nameText)) {
                this.setState({
                    isValidName: false
                })
                
            }
            
            return;
        }

        let registerData = {
                        name: this.state.nameText,
                        password: this.state.passwordText,
                        email: this.state.emailText,
                        image: 'data:image/jpeg;base64,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'
                    }
                
        await setStorageItem('registerCredential', {email: this.state.emailText, password: this.state.passwordText});

        this.setState({
            nameText: '',
            emailText: '',
            passwordText: '',
        })
        return this.props.onRegister(registerData);
    }

    render() {
       if (this.props.isRegister) {
            return <Redirect to="/sign-in"/>
        }
        return (
            <View style={styles.signInWrap}>
                <View style={styles.container}>
                    <View style={styles.inputStyles}>
                        <Input placeholder='Enter your name' value={this.state.nameText} onChangeText={text => this.onChangeName(text)} errorMessage={!this.state.isValidEmail ? 'Enter a valid name' : null}/>
                    </View>
                    <View style={styles.inputStyles}>
                        <Input placeholder='Enter your email' value={this.state.emailText} onChangeText={text => this.onChangeEmail(text)} errorMessage={!this.state.isValidEmail ? 'Enter a valid e-mail' : null}/>
                    </View>
                    <View style={styles.inputStyles}>
                        <Input placeholder='Enter your password' value={this.state.passwordText} secureTextEntry={true} onChangeText={text => this.onChangePassword(text)} errorMessage={!this.state.isValidPassword ? 'Enter a valid password' : null} />
                    </View>
                    <View style={styles.buttonStyle}>
                        <Button title='Sign Up' onPress={this.onSubmit}/>
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

const mapStateToProps = (state) => {
    return {
        isRegister: state.auth.isRegister
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
      onRegister: (data) => dispatch(onRegisterAsync(data) ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);