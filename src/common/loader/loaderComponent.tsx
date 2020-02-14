import React from 'react';
import autoBind from 'react-autobind';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { RootState } from '../../redux/root.reducer';
import { connect } from "react-redux";

export interface LoaderProps {
    isActiveLoader: boolean;
}

export class Loader extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
         
        }
        
        autoBind(this);
    }

    render() {
        const {isActiveLoader} = this.props;
        console.log('LoaderComponent ********** ',this.props.isActiveLoader);
        
        return (
            <ActivityIndicator style={isActiveLoader ? null : styles.loaderNotActive} size="small" color="#00ff00" />
        )
    }
}

const styles = StyleSheet.create({
    loaderNotActive: {
        display: 'none'
    }
});

const mapStateToProps = (state) => {
    return {
        isActiveLoader: state.loader.isActiveLoader
    }
    
};

export default connect(mapStateToProps)(Loader);