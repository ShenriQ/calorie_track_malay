import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// custom import
import vSplash from './Auth/vSplash';
import vLogin from './Auth/vLogin';
import vRegister from './Auth/vRegister';
// Diary
import vSearchFoodExercise from './Diary/vSearchFoodExercise';
import vAddFood from './Diary/vAddFood';

const Stack = createStackNavigator();
export default function Route() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                // this options hide all header
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName="search"
            >
                <Stack.Screen name="splash" component={vSplash} />
                <Stack.Screen name="login" component={vLogin} />
                <Stack.Screen name="register" component={vRegister} />
                <Stack.Screen name="search" component={vSearchFoodExercise} />
                <Stack.Screen name="add_food" component={vAddFood} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
