import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link, Redirect } from "react-router-native";
import { Button, Input } from 'react-native-elements';
import { Icon } from 'native-base';
import autoBind from 'react-autobind';
import { connect } from "react-redux";
import { validateEmail, validatePassword } from '../../../helpers/validateHelper';
import { onLoginAsync } from '../../../redux/auth/actions';
import { getStorageItem } from '../../../helpers/asyncStorageHelper';
export class SignIn extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
           emailText: '',
           passwordText: '',
           isValidEmail: true,
           isValidPassword: true
        };
        autoBind(this);
    }

    componentDidMount() {
        if(this.props.isRegister) {
            this.setCredentialToInputs();
        }
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

    onSubmit () {
        if(!validateEmail(this.state.emailText) && !validatePassword(this.state.passwordText)) {
            this.setState({
                isValidEmail: false,
                isValidPassword: false
            })
            return;
        }
        if(!validateEmail(this.state.emailText)) {
            this.setState({
                isValidEmail: false
            })
            return;
        }
        if(!validatePassword(this.state.passwordText)) {
            this.setState({
                isValidPassword: false
            })
            return;
        }
        let loginData = {password: this.state.passwordText, username: this.state.emailText}
        this.setState({
            emailText: '',
            passwordText: '',
        })
        return this.props.onLoginAuth(loginData);
    }

    setCredentialToInputs = async () => {
        let credentials = await getStorageItem('registerCredential')
        if (credentials) {
            this.setState({
                emailText: credentials.email,
                passwordText: credentials.password,
            })
        }
    } 

    render() {
        
        if (this.props.isAuth) {
            return <Redirect to="/"/>
        }
        
        return (
            <View style={styles.signInWrap}>
                <View style={styles.container}>
                    <View style={styles.inputStyles}>
                        <Input placeholder='Enter your email' value={this.state.emailText} onChangeText={text => this.onChangeEmail(text)} errorMessage={!this.state.isValidEmail ? 'Enter a valid e-mail' : null}/>
                    </View>
                    <View style={styles.inputStyles}>
                        <Input placeholder='Enter your password' value={this.state.passwordText} secureTextEntry={true} onChangeText={text => this.onChangePassword(text)} errorMessage={!this.state.isValidPassword ? 'Enter a valid password' : null} />
                    </View>
                    <View style={styles.buttonStyle}>
                        <Button title='Sign In' onPress={this.onSubmit}/>
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

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        isRegister: state.auth.isRegister
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
      onLoginAuth: (data) => dispatch( onLoginAsync(data) ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
