import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import BottomSheet from 'react-native-simple-bottom-sheet';

const BottomSheetWidget = ({component, isOpen}) => {
  return (
    <BottomSheet isOpen={isOpen}>
      {onScrollEndDrag => (
        <ScrollView onScrollEndDrag={onScrollEndDrag}>{component}</ScrollView>
      )}
    </BottomSheet>
  );
};

export default BottomSheetWidget;

const styles = StyleSheet.create({});
