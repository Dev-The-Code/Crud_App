import React, { Component } from "react";
import {
    View, StyleSheet, AsyncStorage, TouchableOpacity, TextInput, ImageBackground, Icon, Image, Picker,
    Dimensions, ScrollView, YellowBox
} from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Location } from 'expo';
import { Avatar, Text, List, ListItem, SearchBar } from 'react-native-elements';
import { Button, } from 'native-base';
import UUIDGenerator from 'react-native-uuid-generator';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import backImage from '../../assets/5rVml.png'
import logo from '../../assets/groupslogo2.jpg'
import Modal from "react-native-modal";
import pLogo from '../../assets/download.png'

const { width: WIDTH } = Dimensions.get('window')
class ProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            noProduct: '',
            productArray: [],
            isModalVisible: false,
            productName: '',
            productId: ''


        }
        this.edit = this.edit.bind(this)
        this.update = this.update.bind(this)
        this.getProduct = this.getProduct.bind(this)
        this.del = this.del.bind(this)
    }
    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    async componentDidMount() {

        this.getProduct()

    }

    async getProduct() {
        let { productArray } = this.state
        YellowBox.ignoreWarnings(['Setting a timer']);
        productArray=[]

        const db = firebase.firestore();

        db.collection('Products').get().then((res) => {
            if (res.size) {
                res.docs.forEach(data => {
                    let obj = {}
                    obj.productName = data.data().productName;
                    obj.productId = data.data().id;
                    productArray.push(obj)
                })
                
            }
            else {
                console.log('no data-======>')
                this.setState({
                    noProduct: "No any Product Exist"
                })
            }
            this.setState({
                productArray
            })
        })


    }

    edit(productkey, product) {
        const { productName, productId } = this.state
        this.setState({
            productName: product,
            productId: productkey,
            
        })
        this._toggleModal()

    }

    update() {
        const { productName, productId } = this.state
        const db = firebase.firestore();



        console.log(productName, productId)
        db.collection('Products').doc(productId).update(
            {
                productName,
                id: productId
            }
        ).then(() => {
            this.getProduct()
            this._toggleModal()
            alert('SucssesFully Update product')
            this.setState({productName:''})

        })
            .catch((err) => {
                alert(err.message)
            })

    }

    del(productId,productName){


        const db = firebase.firestore();



        db.collection('Products').doc(productId).delete().then(() => {
            alert('SucssesFully Deleted product')
            this.getProduct()

        })
            .catch((err) => {
                alert(err.message)
            })

    }


    render() {
        const { productArray, noProduct, productName } = this.state

        console.log(productArray)
        return (
            <ImageBackground
                style={styles.backgroundContainer} source={backImage}>

                <ScrollView scrollEventThrottle={16} >

                    <View>
                        <View style={styles.inviteCard}>
                            {productArray.length ?
                                productArray.map((value, index) => {
                                    return (
                                        <ListItem
                                            key={index}
                                            leftAvatar={{source:pLogo}}
                                            title={value.productName}
                                            subtitle="Product"
                                            rightTitle={
                                                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                                                    <TouchableOpacity onPress={() => this.edit(value.productId, value.productName)}>
                                                        <MaterialCommunityIcons name="playlist-edit" size={32} color="#2b9077" />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => this.del(value.productId, value.productName)}>
                                                        <MaterialCommunityIcons name="delete" size={32} color="#2b9077" />
                                                    </TouchableOpacity>
                                                </View>
                                            }

                                        />

                                    )


                                })


                                :
                                <View style={styles.container}>
                                    <Text>{noProduct}</Text>
                                </View>
                            }

                        </View>


                    </View>
                </ScrollView >

                <View style={{ flex: 1 }}>

                    <Modal isVisible={this.state.isModalVisible}

                        onBackButtonPress={() => this._toggleModal()}




                    >
                        <View >
                            <View style={styles.container}>
                                <View>
                                    <Text style={styles.txt}>Update your product name:</Text>
                                </View>
                                <TextInput
                                    style={styles.input}
                                    value={productName}
                                    onChangeText={(val) => this.setState({ productName: val })}
                                />
                                <View >
                                    <TouchableOpacity style={styles.btn} onPress={this.update}>
                                        <Ionicons name="ios-create" size={25} style={styles.cirlcle_icon} />
                                        <Text style={styles.btn_text}>Update product</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </Modal>
                </View>


            </ImageBackground>
        );
    }
}
export default ProductList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        // marginBottom: 150
    },
    inputContainer: {
        marginTop: 70

    },
    btn_text: {
        color: '#ffffff',
        fontSize: 25,
        textAlign: 'center',
        marginTop: -35

    },
    cirlcle_icon: {
        marginTop: 10,
        marginLeft: 10,
        color: '#ffffff',

    },
    btn: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: "#0693cc",
        justifyContent: 'center',
        marginTop: 20,
        opacity: 0.8
    }
    ,
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: "#eaf2ff",
        color: "#0693cc",
        marginHorizontal: 25

    }
    ,
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        alignItems: 'center',
        justifyContent: 'center'
    }
    ,
    logo: {
        width: 80,
        height: 80,
        opacity: 0.7,

        backgroundColor: "transparent"
    },
    searchIcon: {
        position: 'absolute',
        top: 8,
        right: 37
    },
    inviteCard: {
        width: 300
    }
});