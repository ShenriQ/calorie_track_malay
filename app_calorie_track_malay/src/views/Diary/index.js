import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// custom import
import vDiary from './vDiary';
import vNutritionInsight from './vNutritionInsight';
import Options from './vOptions';
import vWeekview from './vWeekview';

const Stack = createStackNavigator();
export default function Route(props) {
    return (
        <Stack.Navigator
            // this options hide all header
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="diary"
        >
            <Stack.Screen name="diary" component={vDiary} />
            <Stack.Screen name="nutri_insight" component={vNutritionInsight} />
            <Stack.Screen name="options" children={(_props)=><Options rootnav={props.rootnav} navigation={_props.navigation}/>} />
        </Stack.Navigator>
    );
}
