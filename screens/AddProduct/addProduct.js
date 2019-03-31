import React, { Component } from "react";
import { View,Text,StyleSheet, TextInput, TouchableOpacity,Dimensions,ImageBackground,Image,AsyncStorage} from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';
import backImage from '../../assets/5rVml.png'
import logo from '../../assets/timthumb.png'
import {Ionicons} from '@expo/vector-icons'

const {width : WIDTH }= Dimensions.get('window')

class AddProduct extends Component {

    constructor(props){
        super(props);

        this.state = {
            productName: "",
            id: null
        }

        this.submit = this.submit.bind(this)
    }


    async submit(){
        const {productName} = this.state;
        const user = await AsyncStorage.getItem('userToken');

        const db = firebase.firestore();
        const ref  = db.collection('Products').doc();
        
        db.collection('Products').doc(ref.id).set(
            {
                productName,
                id:ref.id
            }
        ).then(()=>{
            alert('SucssesFully Add product')
            this.setState({productName:''})
        })
        .catch((err)=>{
         alert(err.message)
        })
    }

    render() {
        const {productName} = this.state;
        return (
            <ImageBackground
            style={styles.backgroundContainer} source={backImage}>
            <View>
            <Image source={logo} style={styles.logo}/>
      
            </View>
            <View style={styles.container}>
                <View>
                    <Text style={styles.txt}>Enter your product name:</Text>
                </View>
                <TextInput 
                style={styles.input} 
                value={productName} 
                onChangeText={(val) => this.setState({productName:val})}
                 />
                <View style={styles.container}>
                    <TouchableOpacity style={styles.btn} onPress={this.submit}>
                    <Ionicons name="ios-create" size={25} style={styles.cirlcle_icon}/>
                        <Text style={styles.btn_text}>Add Product</Text>
                    </TouchableOpacity>
                </View>
          
            </View>
        </ImageBackground>
        );
    }
}
export default AddProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    txt: {
        fontSize: 22,
        fontWeight: '500',
        marginTop: 50
    },
    input:{
        width: 200,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        marginTop: 30,
    },
    btn: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: WIDTH -55,
        height:45,
        borderRadius:25,
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
        backgroundColor: '#cc4400',
        opacity:0.8,
        borderWidth: 1,
        marginTop: 50,
    },
    
   
    btn_text: {
        color: '#ffffff',
        fontSize: 25,
        textAlign:'center',
        marginTop:-35
        
    },
    backgroundContainer: {
        flex: 1,
        width:null,
        height:null,
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo:{
        width: 160,
        height: 120,
        opacity: 0.7,

        backgroundColor: "transparent"
    },
    cirlcle_icon:{
           marginTop:10,
           marginLeft:10,
           color:'#ffffff',
    
        },
});