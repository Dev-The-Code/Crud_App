import React, { Component } from "react";
import {
    View, Text, StyleSheet, Image,
    TouchableOpacity, AsyncStorage, Dimensions, TextInput, YellowBox, ImageBackground, Alert
} from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';
import { LinearGradient } from 'expo'
import backImage from '../../assets/5rVml.png'
import logo from '../../assets/timthumb.png'
import { Icon } from "react-native-elements";
import { Ionicons, MaterialIcons } from '@expo/vector-icons'



const { width: WIDTH } = Dimensions.get('window')

class SignInScreen extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            userMail: '',
            password: ''

        });
    }


    componentDidMount() {
        YellowBox.ignoreWarnings(['Setting a timer']);

    }
    logIn = async () => {
        const { userMail, password } = this.state
        firebase.auth().signInWithEmailAndPassword(userMail, password)
            .then((User) => {
                this.token(User.user.uid)
                alert("you have sucssesfully Login");
                this.setState({
                    userMail: '',
                    password: ''
                })




            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
                // ...
            });


    }
    token = async (id) => {

        const token = await AsyncStorage.setItem('userToken', `${id}`).then(() => {
            this.props.navigation.navigate('App');
        });

    }

    signUp() {
        this.props.navigation.navigate("signUp")

    }

    render() {
        const { userMail, password } = this.state
        return (
            <ImageBackground
                style={styles.backgroundContainer} source={backImage}>
                <View>
                    <Image source={logo} style={styles.logo} />
                </View>


                <View style={styles.container}>


                    <View style={{ marginBottom: 90 }}>
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
                                onChangeText={(val) => this.setState({ password: val })}
                                placeholder="User Password..."
                                secureTextEntry={true}


                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={this.logIn.bind(this)}>
                        <LinearGradient
                            colors={['#b33c00', '#cc4400', '#e64d00']}
                            style={{ alignItems: 'center', borderRadius: 50 }}>
                            <Text style={styles.btn_text}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text>if not Create Account??</Text>
                        <Text onPress={this.signUp.bind(this)} style={styles.btnsignup}>Sign Up</Text>
                    </View>



                </View>
            </ImageBackground>

        );
    }
}
export default SignInScreen;

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
