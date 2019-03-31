import React, { Component } from "react";
import {
    View, StyleSheet, AsyncStorage, TouchableOpacity, ImageBackground, YellowBox,
    Text, TouchableHighlight, Alert, Icon, Image, Dimensions
} from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Location } from 'expo';
import { Avatar } from 'react-native-elements';
import { Button, } from 'native-base';
import UUIDGenerator from 'react-native-uuid-generator';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import backImage from '../../assets/5rVml.png'
import logo from '../../assets/timthumb.png'



const { width: WIDTH } = Dimensions.get('window')
class DashboardScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            img: null,
            isModalVisible: false,
        }
    }
    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    componentDidMount() {
        YellowBox.ignoreWarnings(['Setting a timer']);

    }
    signOut = async () => {
        AsyncStorage.clear();
        this.props.navigation.navigate('AuthLoading');
    }

    addProduct() {
        this.props.navigation.navigate("addProduct")
    }



    viewList() {
        this.props.navigation.navigate("viewProduct")

    }
    

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name="view-dashboard" style={{ fontSize: 24, color: tintColor }} />
        )
    }



    render() {
        const { name, img } = this.state;
        return (
            <ImageBackground
                style={styles.backgroundContainer} source={backImage}>

                <View style={styles.container}>
                    <View>
                        <Image source={logo} style={styles.logo} />
                    </View>
                    {/* <Text h4>{name}</Text>
                <Avatar rounded size="xlarge" source={{ uri: img }} /> */}
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.btn} onPress={this.addProduct.bind(this)}>
                            <Ionicons name="ios-create" size={25} style={styles.cirlcle_icon} />
                            <Text style={styles.btn_text}>Add Product</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.btn} onPress={this.viewList.bind(this)}>
                            <MaterialIcons name="insert-invitation" size={25} style={styles.cirlcle_icon} />
                            <Text style={styles.btn_text}>View List</Text>
                        </TouchableOpacity>
                    </View>
                   
                    {/* <Button title='Sign Out' onPress={this.signOut}/> */}
                </View>
            </ImageBackground>
        );
    }
}
export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
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
        backgroundColor: "#cc4400",
        justifyContent: 'center',
        marginTop: 20,
        opacity: 0.8

        // justifyContent: 'center',
        // alignSelf: 'center',
        // height: 60,
        // width: 320,
        // color: '#fff',
        // fontSize: 24,
        // borderRadius: 50,
        // fontWeight: '600',
        // backgroundColor: '#2b9077',
    },
    // btn1: {
    //     marginTop: 20,
    //     justifyContent: 'center',
    //     alignSelf: 'center',
    //     height: 60,
    //     width: 320,
    //     color: '#fff',
    //     fontSize: 24,
    //     borderRadius: 50,
    //     fontWeight: '600',
    //     backgroundColor: '#2b9077',
    // },
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        alignItems: 'center',
        justifyContent: 'center'
    }
    ,
    logo: {
        width: 160,
        height: 120,
        opacity: 0.7,

        backgroundColor: "transparent"
    }
});