import React from 'react';
import autoBind from 'react-autobind';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
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
          books: this.props.books || [],
          number: 1
        };
        autoBind(this);
    }

    componentDidMount() {
        this.getBooksToHome();
    }

    getBooksToHome() {
        this.props.onLoader(true);
        setTimeout(()=>{
            this.props.sendRequest();
            this.props.onLoader(false);
            }, 1500   
        )
    }

    Item (title:string, author:string, price:string,  bookImage:string, description:string) {
        return (
          <View style={styles.productItems}>
            <Text><Text style={styles.namesSection}>Title:</Text> {title}</Text>
            <Text><Text style={styles.namesSection}>Author:</Text> {author}</Text>
            <Text><Text style={styles.namesSection}>Price:</Text> {price}</Text>
            <Image source={{uri: bookImage}} style={styles.itemImg}/>
            <Text><Text style={styles.namesSection}>Description:</Text> {description}</Text>
          </View>
        );
    }
    
    clickMenu () {
        this.setState({
            number: this.state.number + 1
        }, 
        ()=>{
            this.props.onClickMenu(this.state.number);
            this.props.addToBasket(this.state.number)
        }
        )
    }
    
    render() {
        
        console.log('check',this.props.check);
        
        return (
            <View style={styles.homeContainer}>
                <Button
                    title="Press me"
                    onPress={this.clickMenu}
                />
                <FlatList
                    data={this.state.books}
                    extraData={this.props}
                    renderItem={( { item } ) => this.Item(item.title, item.author, item.price, item.bookImage, item.description)}
                    keyExtractor={(item:any) => item._id.toString()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
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