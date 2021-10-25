import React from 'react';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../store/hooks/useTypedSelector';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';
import {Screens} from '../screens';
import {addBookmarks, removeBookmark} from '../store/actions/bookmarks';
import {THEME} from '../theme';
import Icon from 'react-native-vector-icons/Feather';

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
        component={Screens.MainScreen}
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
        component={Screens.DayScreen}
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
        component={Screens.BookedScreen}
      />
      <Stack.Screen
        name="Search"
        options={{headerTitleAlign: 'left'}}
        component={Screens.SearchScreen}
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
