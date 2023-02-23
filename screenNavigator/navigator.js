import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'; 
import  FormDatabase from "../screens/FormDatabase"
import  barChart  from "../screens/barChart"


const screens = {
    FormDatabase: {
        screen: FormDatabase
    },
    barChart:
    {
        screen: barChart
    }
}
const HomeScreen = createStackNavigator(screens);

export default createAppContainer(HomeScreen)