import React from 'react';
import { connect } from "react-redux";
import autoBind from 'react-autobind';
import { StyleSheet, Text, View } from 'react-native';

export class Profile extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
          
        };
        autoBind(this);
    }
    render() {

        return (
            <View style={styles.profileContainer}>
                <Text>Hello from Profile component! {this.props.menuNumber}</Text>
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

const mapStateToProps = (state) => {
    return {
        menuNumber: state.menu.quantity
    }

};

export default connect(mapStateToProps)(Profile);