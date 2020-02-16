import React from 'react';
import autoBind from 'react-autobind';
import { StyleSheet, Text, View, Button, FlatList, Image, AsyncStorage } from 'react-native';
import { connect } from "react-redux";
import { getBooksAsync } from '../../redux/home/actions'
import { RootState } from '../../redux/root.reducer';
import { onLoader } from '../../redux/loader/actions';
import { onClickMenu } from '../../redux/menu/actions';
import { addProductToBasket } from '../../redux/basket/actions';

export class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
          number: 1
        };
        autoBind(this);
    }

    componentDidMount() {
        this.getBooksToHome();
    }

    getBooksToHome() {
        this.props.onLoader(true);
        setTimeout(() => {
                this.props.sendRequest();
                this.props.onLoader(false);
            }, 1500   
        )
    }

    addProductToBasket = async (id) => {
        let basketArray = [];
        let book = this.props.books.find(item => {
            return item._id == id;
        })
        let dataBasket = await AsyncStorage.getItem('Basket');
        if (dataBasket) {
            let dataBasketParsed = JSON.parse(dataBasket);
            let addingBook = dataBasketParsed.find(item => {
                return item._id == id;
            });
            if (addingBook) {
                return;
            } else {
                dataBasketParsed.push(book);
                let dataBasketString = JSON.stringify(dataBasketParsed);
                return await AsyncStorage.setItem('Basket', dataBasketString);
            }
        }
        basketArray.push(book);
        let basketArrayString = JSON.stringify(basketArray);
        return await AsyncStorage.setItem('Basket', basketArrayString);
    }

    Item (title:string, author:string, price:string,  bookImage:string, description:string, id:string) {
        return (
          <View style={styles.productItems}>
            <View style={styles.wrapImgAuthorData}>
                <View>
                    <Image source={{uri: bookImage}} style={styles.itemImg}/>
                </View>
                <View style={styles.authorData}>
                    <Text><Text style={styles.namesSection}>Title:</Text> {title}</Text>
                    <Text><Text style={styles.namesSection}>Author:</Text> {author}</Text>
                    <Text><Text style={styles.namesSection}>Price:</Text> {price}</Text>
                    <View style={styles.buttonAdd}>
                        <Button
                            title="Add to basket"
                            onPress={() => this.addProductToBasket(id)}
                        />
                    </View>
                </View>
            </View>
            <View>
                <Text><Text style={styles.namesSection}>Description:</Text> {description}</Text>
            </View>
           
          </View>
        );
    }
    
    render() {
        const {books} = this.props;
        return (
            <View style={styles.homeContainer}>
                <FlatList
                    data={books || []}
                    extraData={this.props}
                    renderItem={( { item } ) => this.Item(item.title, item.author, item.price, item.bookImage, item.description, item._id.toString())}
                    keyExtractor={(item:any) => item._id.toString()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
        padding: 10
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
    buttonAdd: {
        width: 120,
        marginTop: 15
    },
    authorData: {
        padding: 10
    }
});

const mapStateToProps = (state) => {
    return {
        isActiveLoader: state.loader.isActiveLoader,
        books: state.home.books,
        check: state.home.check,
        menuNumber: state.menu.quantity
    }

};
  
const mapDispatchToProps = (dispatch) => {
    return {
      sendRequest: () => dispatch( getBooksAsync() ),
      onLoader: (data) => dispatch( onLoader(data) ),
      onClickMenu: (data) => dispatch( onClickMenu(data) ),
      addToBasket: (data) => dispatch( addProductToBasket(data) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);