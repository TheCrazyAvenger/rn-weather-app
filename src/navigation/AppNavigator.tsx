import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DayScreen} from '../screens/DayScreen';
import {MainScreen} from '../screens/MainScreen';
import {useTypedSelector} from '../store/hooks/useTypedSelector';
import {THEME} from '../theme';

const Stack = createNativeStackNavigator();

const StackNavigation: React.FunctionComponent = ({}) => {
  const data = useTypedSelector(state => state.weather.data);

  const cityName = data ? data.city.name : 'Unknown';

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: `${cityName}`,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'OpenSans-Bold',
            fontSize: 15,
            color: THEME.COLOR_GRAY,
          },
        }}
      />
      <Stack.Screen
        name="Day"
        component={DayScreen}
        options={{
          title: 'Day',
        }}
      />
    </Stack.Navigator>
  );
};

export const AppNavigator: React.FunctionComponent = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};
