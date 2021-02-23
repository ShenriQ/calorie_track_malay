import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// custom import
import vSplash from '../views/Auth/vSplash';
import vLogin from '../views/Auth/vLogin';
import vRegister from '../views/Auth/vRegister';
import vQ1 from '../views/Auth/vQ1';
import vQ2 from '../views/Auth/vQ2';
import vQ3 from '../views/Auth/vQ3';
import vQ4 from '../views/Auth/vQ4';
import vQ5 from '../views/Auth/vQ5';
import vQ6 from '../views/Auth/vQ6';
import vQ7 from '../views/Auth/vQ7';
import vQ8 from '../views/Auth/vQ8';
import vQ9 from '../views/Auth/vQ9';
import vQ10 from '../views/Auth/vQ10';

const Stack = createStackNavigator();
export default function Route() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                // this options hide all header
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName="splash"
            >
                <Stack.Screen name="splash" component={vSplash} />
                <Stack.Screen name="login" component={vLogin} />
                <Stack.Screen name="register" component={vRegister} />
                <Stack.Screen name="q1" component={vQ1} />
                <Stack.Screen name="q2" component={vQ2} />
                <Stack.Screen name="q3" component={vQ3} />
                <Stack.Screen name="q4" component={vQ4} />
                <Stack.Screen name="q5" component={vQ5} />
                <Stack.Screen name="q6" component={vQ6} />
                <Stack.Screen name="q7" component={vQ7} />
                <Stack.Screen name="q8" component={vQ8} />
                <Stack.Screen name="q9" component={vQ9} />
                <Stack.Screen name="q10" component={vQ10} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
