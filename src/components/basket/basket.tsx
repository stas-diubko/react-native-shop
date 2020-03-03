import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View, AsyncStorage, Button, Image, FlatList } from 'react-native';
import autoBind from 'react-autobind';
import { onLoader } from '../../redux/loader/actions';

export class Basket extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
          basket: [],
          numberOfProducts: 0,
          textLimit: 18
        };
        autoBind(this);
    }

    getStorageData = async () => {
        this.props.onLoader(true);
        let dataBasket = await AsyncStorage.getItem('Basket');
        let dataBasketParsed = JSON.parse(dataBasket);
        this.setState({
            basket: dataBasketParsed,
            numberOfProducts: 0 // dataBasketParsed.length
        }, () => {
        this.props.onLoader(false);
        })
    }

    componentDidMount() {
        this.getStorageData();
    }

    increaseProductAmount(id) {

    }

    decreaseProductAmount(id) {

    }

    removeproduct(id) {

    }

    Item (title:string, author:string, price:string,  bookImage:string, id:string) {
        return (
          <View style={styles.productItems}>
            <View style={styles.wrapImgAuthorData}>
                <View>
                    <Image source={{uri: bookImage}} style={styles.itemImg}/>
                </View>
                <View style={styles.authorData}>
                    <Text><Text style={styles.namesSection}>Title:</Text> { ((title).length > this.state.textLimit) ? (((title).substring(0, this.state.textLimit - 3)) + '...') : title }</Text>
                    <Text><Text style={styles.namesSection}>Author:</Text> { ((author).length > this.state.textLimit) ? (((author).substring(0, this.state.textLimit - 3)) + '...') : author }</Text>
                    <Text><Text style={styles.namesSection}>Price:</Text> {price}</Text>
                    <View style={styles.buttons}>
                        <Button
                            title="+"
                            color="lightgrey"
                            onPress={() => this.increaseProductAmount(id)}
                        />
                        <Text style={styles.itemQuantity}>0</Text>
                        <Button
                            title="-"
                            color="lightgrey"
                            onPress={() => this.decreaseProductAmount(id)}
                        />
                    </View>
                </View>
            </View>
            <Text style={styles.remove}>X</Text>
          </View>
        );
    }
    
    render() {

        return (
            <View style={styles.basketContainer}>
                <Text>Number of products: {this.state.numberOfProducts}</Text>
                <Text>Total price: </Text>
                <View>
                <FlatList
                    data={this.state.basket}
                    extraData={this.props}
                    renderItem={( { item } ) => this.Item(item.title, item.author, item.price, item.bookImage, item._id.toString())}
                    keyExtractor={(item:any) => item._id.toString()}
                />
                </View>

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
    wrapImgAuthorData: {
        display: 'flex',
        flexDirection: 'row'
    },
    homeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#eeeeee',
    },
    loaderNotActive: {
        display: 'none'
    },
    productItems: {
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 5,
        padding: 20,
        position: 'relative',
        overflow: 'hidden'

    },
    namesSection: {
        color: 'darkgreen'
    },
    itemImg: {
        width: 150, 
        height: 150,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 30,
        marginTop: 15
    },
    authorData: {
        padding: 10,
        overflow: 'hidden'
    },
    itemQuantity: {
        marginLeft: 8,
        marginRight: 8,
        fontSize: 24
    },
    remove: {
        position: 'absolute',
        display: 'flex',
        width: 25,
        height: 25,
        lineHeight: 17,
        textAlign: 'center',
        right: 0,
        padding: 4,
        marginRight: 10,
        marginTop: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'brown',
        borderRadius: 50,
        color: 'brown',
        backgroundColor: '#eeeeee'
    }
});

const mapStateToProps = (state) => {
    return {
        quantity: state.basket.numberBooks
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
      onLoader: (data) => dispatch( onLoader(data) ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket);