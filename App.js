import React from 'react';
import { StyleSheet, Text, View ,ImageBackground} from 'react-native';
import SwitchNavigator from './Navigation/SwitchNavigator';
import ApiKeys from './config/ApiKeys';
import * as firebase from 'firebase';

export default class App extends React.Component {
  constructor(){
    super();
  
    //Firebase
    if(!firebase.apps.length) {firebase.initializeApp(ApiKeys.FirebaseConfig);}
  }

  render() {
    console.log('Start Application')
    return (  
        
        <SwitchNavigator style={{ backgroundColor: 'transparent' }} />

    );
  }
}

const styles = StyleSheet.create({
  
});
