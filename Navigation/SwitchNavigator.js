import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import AuthLoadingScreen from "../screens/Auth/AuthLoadingScreen";
import AppDrawerNavigator from './AppDrawerNavigator';
import AuthNavigator from '../screens/authNavigate/authNavigate';



const SwitchNavigator = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Authentication: AuthNavigator,
    App: AppDrawerNavigator
})
 
const appContainer = createAppContainer(SwitchNavigator);

export default appContainer;