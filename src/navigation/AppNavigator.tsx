import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {BookedScreen} from '../screens/BookedScreen';
import {DayScreen} from '../screens/DayScreen';
import {MainScreen} from '../screens/MainScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {addBookmarks, removeBookmark} from '../store/actions/bookmarks';
import {useTypedSelector} from '../store/hooks/useTypedSelector';
import {THEME} from '../theme';

const Stack = createNativeStackNavigator();

const StackNavigation: React.FunctionComponent = () => {
  const data = useTypedSelector(state => state.weather.data);
  const loading = useTypedSelector(state => state.weather.loader);
  const bookmarks = useTypedSelector(state => state.bookmarks.bookmarks);
  const cityName = data && !loading ? data.city.name : 'Unknown';

  const navigation: any = useNavigation();
  const dispatch = useDispatch();

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

          headerLeft: () => {
            if (data && !loading) {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Booked', {data, name: cityName})
                  }
                  activeOpacity={0.7}>
                  <Icon name="menu" size={18} color={THEME.COLOR_BLACK} />
                </TouchableOpacity>
              );
            } else {
              return null;
            }
          },
          headerRight: () => {
            if (data && !loading) {
              const id = data.city.id;
              const {lat, lon} = data.city.coord;
              const checkIfBooked = bookmarks!.some(
                item => item.name === cityName,
              );
              return (
                <TouchableOpacity activeOpacity={0.7}>
                  {checkIfBooked ? (
                    <Icon
                      name="file-minus"
                      size={18}
                      onPress={() => dispatch(removeBookmark(cityName))}
                      color={THEME.COLOR_BLACK}
                    />
                  ) : (
                    <Icon
                      name="star"
                      onPress={() =>
                        dispatch(addBookmarks(cityName, id, lat, lon))
                      }
                      size={18}
                      color={THEME.COLOR_BLACK}
                    />
                  )}
                </TouchableOpacity>
              );
            } else {
              return null;
            }
          },
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
