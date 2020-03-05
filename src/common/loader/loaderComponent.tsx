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
                <ActivityIndicator style={this.props.isActiveLoader ? null : styles.loaderNotActive} size="small" color="#000" /> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loaderContainer: {
        position: 'absolute',
        right: 15,
        top: 10,
        zIndex: 1
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