import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View } from 'react-native';

export class Basket extends React.Component<any,any> {

    render() {

        return (
            <View style={styles.basketContainer}>
                <Text>Hello from basket component!</Text>
                <Text>quantity in basket: {this.props.quantity}</Text>

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

const mapStateToProps = (state) => {
    return {
        quantity: state.basket.numberBooks
    }

};

export default connect(mapStateToProps)(Basket);