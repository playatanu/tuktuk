import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
const BASE_URL = 'http://127.0.0.1:5000';
const Trips = () => {
  const [allBook, setAllBook] = React.useState();
  const user = useSelector(state => state.authReducer);
  const getAllBooking = async () => {
    try {
      const res = await axios.post(BASE_URL + '/rider/book/all', {
        email: user.email,
      });
      setAllBook(res.data);
    } catch (error) {}
  };

  React.useEffect(() => {
    getAllBooking();
  }, []);
  return (
    <View>
      <FlatList data={allBook} renderItem={render} />
    </View>
  );
};

const render = () => {
  return <Text>Trips</Text>;
};
export default Trips;

const styles = StyleSheet.create({});
