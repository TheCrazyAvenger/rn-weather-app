import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MainScreen} from '../screens/MainScreen';
import {THEME} from '../theme';

const Stack = createNativeStackNavigator();

export const AppNavigator: React.FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            title: 'City',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'OpenSans-Bold',
              fontSize: 15,
              color: THEME.COLOR_GRAY,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
