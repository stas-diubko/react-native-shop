import React from 'react';
import autoBind from 'react-autobind';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { connect } from "react-redux";

export class Loader extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
         
        }
        
        autoBind(this);
    }

    render() {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator style={this.props.isActiveLoader ? null : styles.loaderNotActive} size="small" color="#fff" /> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loaderContainer: {
        position: 'absolute',
        marginTop: 25,
        marginLeft: 175
    },
    loaderNotActive: {
        display: 'none',
    }
});

const mapStateToProps = (state) => {
    return {
        isActiveLoader: state.loader.isActiveLoader
    }
    
};

export default connect(mapStateToProps)(Loader);