import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {createStore} from "redux";
import {Provider} from "react-redux";
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export { Stack , Tab} ;
