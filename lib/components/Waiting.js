import {StyleSheet, Text, View, ProgressBarAndroid} from 'react-native';
import React from 'react';

const Waiting = ({message}) => {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>{'Please Wait...'} </Text>
      <Text style={styles.message}>{message || 'Connecting'} </Text>
      <ProgressBarAndroid color={'black'} styleAttr="Horizontal" />
    </View>
  );
};

export default Waiting;

const styles = StyleSheet.create({
  main: {marginBottom: 20},
  text: {marginTop: 30, marginBottom: 15, fontSize: 18},
});
