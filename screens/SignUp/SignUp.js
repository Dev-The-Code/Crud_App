import React, { Component } from "react";
import {
    View, StyleSheet, AsyncStorage, TouchableOpacity, TextInput, ImageBackground,
    Dimensions, YellowBox
} from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Text } from 'react-native-elements';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons'
import backImage from '../../assets/5rVml.png'
import { LinearGradient } from 'expo'




const { width: WIDTH } = Dimensions.get('window')
class signUpScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userMail: '',
            password: '',
            userName: ''


        }


    }

    componentDidMount() {
        YellowBox.ignoreWarnings(['Setting a timer']);

    }

    signUp = async () => {
        const { userMail, password, userName } = this.state
        const db = firebase.firestore();

        firebase.auth().createUserWithEmailAndPassword(userMail, password)
            .then((User) => {
                console.log('username===>', User.user.uid)
                db.collection('users').doc(User.user.uid).set(
                    {
                        userMail,
                        userName
                    }
                )
                alert('You have sucssesfully SignUp');
                this.setState({
                    userMail: '',
                    password: '',
                    userName: ''
                })

            })
            .catch(function (error) {
                var errorMessage = error.message;
                // Handle Errors here.
                alert(errorMessage);


                // ...
            });


    }


    render() {

        const { userMail, password, userName } = this.state
        return (
            <ImageBackground
                style={styles.backgroundContainer} source={backImage}>

                <View style={styles.container}>


                    <View style={{ marginBottom: 90 }}>

                        <View style={{ marginBottom: 10 }}>
                            <FontAwesome name={'user'} size={28} style={styles.mailIcon} />

                            <TextInput
                                style={styles.mailStyle}
                                value={userName}
                                onChangeText={(val) => this.setState({ userName: val })}
                                placeholder="User Name..."

                            />
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <MaterialIcons name={'mail'} size={28} style={styles.mailIcon} />

                            <TextInput
                                style={styles.mailStyle}
                                value={userMail}
                                onChangeText={(val) => this.setState({ userMail: val })}
                                placeholder="User Email..."

                            />
                        </View>

                        <View>
                            <Ionicons name={'ios-lock'} size={28} style={styles.mailIcon} />
                            <TextInput
                                style={styles.mailStyle}
                                value={password}
                                secureTextEntry={true}
                                onChangeText={(val) => this.setState({ password: val })}
                                placeholder="User Password..."

                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={this.signUp.bind(this)}>
                        <LinearGradient
                            colors={['#b33c00', '#cc4400', '#e64d00']}
                            style={{ alignItems: 'center', borderRadius: 50 }}>
                            <Text style={styles.btn_text}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>




                </View>



            </ImageBackground>
        );
    }
}
export default signUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
        alignSelf: 'center'
    },
    btn: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: 50,
        width: 150,
        color: '#ffbf00',
        fontSize: 20,
        borderRadius: 50,
        fontWeight: '600',
        backgroundColor: '#993300',
        marginBottom: 10
    },
    btnsignup: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: 30,
        width: 120,
        color: '#0000ff',
        fontSize: 20,
        marginBottom: 10,


    },
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 100,
        opacity: 0.7,
        marginTop: 10,

        backgroundColor: "transparent"
    },
    mailStyle: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: '#cc4400',
        color: "#ffffff",
        marginHorizontal: 25,
        opacity: .7

    },
    mailIcon: {
        position: "absolute",
        top: 10,
        left: 37,
    }

});