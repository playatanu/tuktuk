import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React from 'react';

import {Button} from '../widgets';

const ConfimBooking = ({onPress, data}) => {
  return (
    <View style={{marginBottom: 30}}>
      <FlatList
        data={data}
        renderItem={() => (
          <View style={styles.lists}>
            <Image />
            <Text>Epic Squid</Text>
            <Text>206.00</Text>
          </View>
        )}
      />

      <Button text={'Confirm Booking'} onPress={() => onPress(5)} />
    </View>
  );
};

export default ConfimBooking;

const styles = StyleSheet.create({
  lists: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
});
