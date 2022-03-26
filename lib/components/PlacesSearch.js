import {StyleSheet, Text, View} from 'react-native';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const MAP_API_KEY = 'AIzaSyAwUziA-VexAXTDTMvlKLDXYECUSZHB2VE';

import React from 'react';

const PlacesSearch = ({placeholder, onPress}) => {
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      fetchDetails={true}
      onPress={(data, details) => {
        const address = {address: details.name};
        const de = {...details.geometry.location, ...address};
        onPress(de);
      }}
      query={{
        key: MAP_API_KEY,
        language: 'en',
      }}
    />
  );
};

export default PlacesSearch;

const styles = StyleSheet.create({});
