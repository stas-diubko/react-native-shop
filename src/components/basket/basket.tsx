import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View, AsyncStorage, Button, Image, FlatList } from 'react-native';
import autoBind from 'react-autobind';
import { Icon } from 'native-base';
import { getStorageItem, setStorageItem } from '../../helpers/asyncStorageHelper';
import { getToken } from '../../helpers/authHelper';
export class Basket extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
          basket: [],
          textLimit: 18,
          totalCartPrice: 0
        };
        autoBind(this);
    }

    componentDidMount() {
        this.getStorageData();
    }

    getStorageData = async () => {
        let decoded = await getToken();
        let dataBasket = await getStorageItem(`Basket-${decoded.id}`);
        
        let countTotalCartPrice:number = 0;

        if(dataBasket) {
            for(let i = 0; i < dataBasket.length; i++) {
                countTotalCartPrice += Number(dataBasket[i].amount) * Number(dataBasket[i].price)
            }
            this.setState({
                basket: dataBasket,
                totalCartPrice: countTotalCartPrice
            }) 
        }
    }

    updateStorageItem = async (id, action) => {
        let decoded = await getToken();
        let dataBasket = await getStorageItem(`Basket-${decoded.id}`);
        let index = dataBasket.findIndex((item) => item._id == id)
        let updatingBook = dataBasket.find(item => {
            return item._id == id;
        });

        switch (action) {
            case 'plus': 
                updatingBook.amount += 1;
                break;
            case 'minus': 
                updatingBook.amount -= 1;
                break;
        }

        if (updatingBook.amount == 0)
        return;
        
        dataBasket[index] = updatingBook;
        await setStorageItem(`Basket-${decoded.id}`, dataBasket);
        this.getStorageData();
    }

    increaseProductAmount = async (id) => {
        this.updateStorageItem(id, 'plus');
    }

    decreaseProductAmount(id) {
        this.updateStorageItem(id, 'minus');
    }

    removeProduct = async (id) => {
        let decoded = await getToken();
        let dataBasket = await getStorageItem(`Basket-${decoded.id}`);
        const resultArray = dataBasket.filter(item => item._id != id);
        await setStorageItem(`Basket-${decoded.id}`, resultArray);
        this.getStorageData();
    }

    Item (title:string, author:string, price:string,  bookImage:string, id:string, amount: string) {
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
                            title="-"
                            color="lightgrey"
                            onPress={() => this.decreaseProductAmount(id)}
                        />
                        <Text style={styles.itemQuantity}>{amount}</Text>
                        <Button
                            title="+"
                            color="lightgrey"
                            onPress={() => this.increaseProductAmount(id)}
                        />
                    </View>
                    <View>
                        <Text style={styles.namesSection}>Total product: {Number(amount) * Number(price)}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.remove}><Icon style={styles.iconsSize} name='trash' onPress={() => this.removeProduct(id)}/></View>
          </View>
        );
    }
    
    render() {

        return (
            <View style={styles.basketContainer}>
                <Text>Number of products: {this.state.basket.length}</Text>
                <Text>Total price: {this.state.totalCartPrice}</Text>
                <View>
                <FlatList
                    data={this.state.basket}
                    extraData={this.props}
                    renderItem={( { item } ) => this.Item(item.title, item.author, item.price, item.bookImage, item._id.toString(), item.amount)}
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
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 50
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
        marginTop: 10,
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
        marginTop: 15,
        marginBottom: 15
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
        right: 7,
        top: 4
    },
    iconsSize: {
        fontSize: 24
    }
});

const mapStateToProps = (state) => {
    return {
        quantity: state.basket.numberBooks
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket);