import React, { Component }  from 'react';
import {TouchableOpacity, View ,StyleSheet, Platform, SafeAreaView , ScrollResponderMixin, Dimensions ,Image}
 from 'react-native';
import {createDrawerNavigator, createStackNavigator, createBottomTabNavigator,DrawerItems} from 'react-navigation';
import DashboardScreen from '../screens/Dashboard/Dashboard';
import Icon from 'react-native-vector-icons/Ionicons';
// import signOut from '../screens/signOut/signOut';
import ProductList from '../screens/ProductList/ProductList';
import AddProduct from '../screens/AddProduct/addProduct';
import { ScrollView } from 'react-native-gesture-handler';
import logo from '../assets/timthumb.png'


const {width:WIDTH}= Dimensions.get('window')


const customDrawerComponent = (props)=>{
return(<SafeAreaView style={styles.droidSafeArea}> 
    <View >
    <Image source={logo} style={styles.logo_image}/>
    </View>
    <ScrollView>
        <DrawerItems {...props}/>
    </ScrollView>
    
    </SafeAreaView>)
}




const AppDrawerNavigator = createDrawerNavigator({
    
    Dashboard: createStackNavigator({
        Dashboard: {
            screen: DashboardScreen,
            navigationOptions: ({navigation}) => ({
                title: 'Dashboard',
                headerTitleStyle: {
                    marginLeft: 50,
                    color: "#fff"
                },
                headerStyle: {
                    backgroundColor: '#0693cc'
                  },
                headerLeft:(
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <View style={{paddingHorizontal: 10}}> 
                            <Icon name="md-menu" size={24} />
                        </View>
                    </TouchableOpacity>
                )
            })
        },
        viewProduct: {
            screen:ProductList,
            navigationOptions: ({navigation}) => ({
                title: 'Product List',
                    headerTitleStyle: {
                        marginLeft: 40,
                        color: "#fff"
                    },
                    headerStyle: {
                        backgroundColor: '#0693cc'
                      },
               
            })
        },

        addProduct: {
            screen:AddProduct,
            navigationOptions: ({navigation}) => ({
                title: 'Add Product',
                    headerTitleStyle: {
                        marginLeft: 40,
                        color: "#fff" 
                    },
                    headerStyle: {
                        backgroundColor: '#0693cc'
                      },
                      
                
            })
        },
       

    }),
    
    
    // SignOut: signOut,

    

},
{contentComponent:customDrawerComponent,
drawerWidth:WIDTH-150,
contentOptions:{
}
}

);




export default AppDrawerNavigator;

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        // backgroundColor: npLBlue,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    logo_image:{
        width:130,
        height:100,
        alignItems:"center",
        justifyContent:"center",
        
    }
});