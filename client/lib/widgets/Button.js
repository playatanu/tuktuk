import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({text, onPress, btnStyle, textStyle, disabled}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={{...styles.main, ...btnStyle}}>
        <Text style={{...styles.text, ...textStyle}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'black',
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    fontWeight: '400',
    color: 'white',
  },
});
