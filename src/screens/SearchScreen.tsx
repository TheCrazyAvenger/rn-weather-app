import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useDispatch} from 'react-redux';
import {fetchWeather, toggleLoading} from '../store/actions/weather';
import {useNavigation} from '@react-navigation/core';

export const SearchScreen: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();

  return (
    <GooglePlacesAutocomplete
      placeholder="Search city"
      onPress={(data, details = null) => {
        const {lat, lng} = details!.geometry.location;
        dispatch(toggleLoading());
        dispatch(fetchWeather(lat, lng));
        navigation.navigate('Main');
      }}
      fetchDetails={true}
      query={{
        key: 'AIzaSyA_GXc1Je3jbiBvsoxFqvJiOMZuxm1B3dU',
        language: 'en',
      }}
    />
  );
};
