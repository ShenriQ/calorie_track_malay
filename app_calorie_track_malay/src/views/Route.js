import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// custom import
import vSplash from './Auth/vSplash';
import vLogin from './Auth/vLogin';
import vRegister from './Auth/vRegister';
import vSearchFoodExercise from './Diary/vSearchFoodExercise';

const Stack = createStackNavigator();
export default function Route () {
    return (
        <NavigationContainer>
            <Stack.Navigator
                // this options hide all header
                screenOptions={{
                    headerShown: false
                }}   
                initialRouteName = "home"
            >
                <Stack.Screen name = "splash" component = {vSplash} />
                <Stack.Screen name = "login" component = {vLogin} />
                <Stack.Screen name = "register" component = {vRegister} />
                <Stack.Screen name = "home" component = {vSearchFoodExercise} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
