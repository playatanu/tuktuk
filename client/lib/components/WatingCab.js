import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

import {Button} from '../widgets';

const riderImage =
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

const WatingCab = ({onPress, data}) => {
  return (
    <View style={styles.main}>
      <View style={styles.flexRow}>
        <Image
          style={styles.image}
          source={{uri: data.driver.photo || riderImage}}
        />
      </View>

      <View style={styles.flexRow}>
        <Text style={styles.pin}>{data.driver.name}</Text>
        <View style={styles.call}></View>
      </View>

      <View style={styles.pikupTimeSection}>
        <Text style={styles.nameText}>
          Meet at the pickup point for {data.booking.email}
        </Text>
        <Text style={styles.m}></Text>
      </View>

      <Button text={'Cancel Toto'} onPress={() => onPress()} />
    </View>
  );
};

export default WatingCab;

const styles = StyleSheet.create({
  main: {
    marginBottom: 20,
  },
  pikupTimeSection: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  nameText: {
    textAlign: 'center',
  },

  flexRow: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  pin: {
    fontSize: 18,
    fontWeight: '600',
  },

  call: {
    backgroundColor: '#aaa',
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  timeBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 25,
    fontWeight: '600',
  },
});
