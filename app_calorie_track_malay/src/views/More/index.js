import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// custom import
import vMore from './vMore';
import vProfile from './vProfile';
import vShoppingList from './vShoppingList';
import vReminders from './vReminders';
import vBreakfast from './vBreakfast';
import vWaterTime from './vWaterTime';

const Stack = createStackNavigator();
export default function Route() {
    return (
        <Stack.Navigator
            // this options hide all header
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="more"
        >
            <Stack.Screen name="more" component={vMore} />
            <Stack.Screen name="profile" component={vProfile} />
            <Stack.Screen name="shoppinglist" component={vShoppingList} />
            <Stack.Screen name="reminders" component={vReminders} />
            <Stack.Screen name="breakfast" component={vBreakfast} />
            <Stack.Screen name="watertime" component={vWaterTime} />
        </Stack.Navigator>
    );
}
