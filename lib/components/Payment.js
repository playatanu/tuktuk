import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

import {Button} from '../widgets';

const Payment = ({onPress}) => {
  return (
    <View style={styles.main}>
      <View style={styles.flexRow}>
        <Text style={styles.amount}>Total</Text>
        <Text style={styles.amount}>₹ 25.00</Text>
      </View>
      <Button text={'Pay with UPI'} onPress={() => onPress()} />
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  main: {
    marginBottom: 20,
  },

  flexRow: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  amount: {
    fontSize: 18,
    fontWeight: '600',
  },
});
