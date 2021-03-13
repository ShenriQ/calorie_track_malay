import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// custom import

// Diary
import vSearchFoodExercise from '../views/Diary/vSearchFoodExercise';
import vAddFood from '../views/Diary/vAddFood';
import vNutritionInsight from '../views/Diary/vNutritionInsight';
// Home
import HomeTab from '../views/Home';
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
                <Stack.Screen name="search" component={vSearchFoodExercise} />
                <Stack.Screen name="add_food" component={vAddFood} />
                <Stack.Screen name="nutri_insight" component={vNutritionInsight} />
                <Stack.Screen name="meal_detail" component={vMealDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
