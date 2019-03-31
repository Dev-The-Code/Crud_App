import SignInScreen from '../../screens/SignIn/SignIn';
import {createDrawerNavigator, createStackNavigator,} from 'react-navigation';
import React, { Component }  from 'react';
import {TouchableOpacity, View ,StyleSheet, Platform, SafeAreaView , ScrollResponderMixin, Dimensions ,Image}
from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import signUpScreen from '../../screens/SignUp/SignUp'



const AuthStackNavigator = createStackNavigator({

    signIn: {
        screen: SignInScreen,
        navigationOptions: ({navigation}) => ({
            title: 'sign In',
            headerTitleStyle: {
                marginLeft: 50,
                color: "#fff"
            },
            headerStyle: {
                backgroundColor: '#0693cc'
              }
        })
    }
,
signUp: {
    screen: signUpScreen,
    navigationOptions: ({navigation}) => ({
        title: 'sign Up',
        headerTitleStyle: {
            marginLeft: 50,
            color: "#fff"
        },
        headerStyle: {
            backgroundColor: '#0693cc'
          }
    })
}

})


export default AuthStackNavigator;