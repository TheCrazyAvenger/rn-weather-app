import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {BookedScreen} from '../screens/BookedScreen';
import {DayScreen} from '../screens/DayScreen';
import {MainScreen} from '../screens/MainScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {useTypedSelector} from '../store/hooks/useTypedSelector';
import {THEME} from '../theme';

const Stack = createNativeStackNavigator();

const StackNavigation: React.FunctionComponent = () => {
  const data = useTypedSelector(state => state.weather.data);
  const cityName = data ? data.city.name : 'Unknown';
  const navigation: any = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'OpenSans-Bold',
          fontSize: 15,
          color: THEME.COLOR_GRAY,
        },
      }}>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: `${cityName}`,

          headerLeft: () => (
            <Icon
              onPress={() =>
                navigation.navigate('Booked', {data, name: cityName})
              }
              name="menu"
              size={18}
              color={THEME.COLOR_BLACK}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Day"
        component={DayScreen}
        options={{
          title: 'Details',
        }}
      />
      <Stack.Screen
        name="Booked"
        options={{
          headerTitleAlign: 'left',
          headerRight: () => (
            <Icon
              onPress={() => navigation.navigate('Search')}
              name="search"
              size={18}
              color={THEME.COLOR_BLACK}
            />
          ),
        }}
        component={BookedScreen}
      />
      <Stack.Screen
        name="Search"
        options={{headerTitleAlign: 'left'}}
        component={SearchScreen}
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
