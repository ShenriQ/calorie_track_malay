import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// custom import
// Diary
import vSearchFoodExercise from '../views/Diary/vSearchFoodExercise';
import vAddFood from '../views/Diary/vAddFood';
import vNutritionInsight from '../views/Diary/vNutritionInsight';

const Stack = createStackNavigator();
export default function Route() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                // this options hide all header
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName="add_food"
            >
                <Stack.Screen name="search" component={vSearchFoodExercise} />
                <Stack.Screen name="add_food" component={vAddFood} />
                <Stack.Screen name="nutri_insight" component={vNutritionInsight} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
