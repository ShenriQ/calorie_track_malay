import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// custom import
// home
import HomeTab from '../views/Home';
// diary stack
import vWeekview from '../views/Diary/vWeekview';
import vEasierDay from '../views/Diary/vEasierDay';
import vAppBadge from '../views/Diary/vAppBadge';
import vShare from '../views/Diary/vShare';
import vSetmyown from '../views/Diary/vSetmyown';
import vOptiondiet from '../views/Diary/vOptiondiet';
// discover stack
import vMealDetails from '../views/Discover/vMealDetails';

const Stack = createStackNavigator();
export default function Route() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                // this options hide all header
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName="home"
            >
                <Stack.Screen name="home" component={HomeTab} />
                <Stack.Screen name="discover_meal_detail" component={vMealDetails} />
                <Stack.Screen name="diary_weekview" component={vWeekview} />
                <Stack.Screen name="diary_easierday" component={vEasierDay} />
                <Stack.Screen name="diary_caloriebadge" component={vAppBadge} />
                <Stack.Screen name="diary_share" component={vShare} />
                <Stack.Screen name="diary_setmyown" component={vSetmyown} />
                <Stack.Screen name="diary_optiondiet" component={vOptiondiet} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
