import {StyleSheet, View, BackHandler} from 'react-native';
import React from 'react';
import axios from 'axios';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const MAP_API_KEY = 'AIzaSyAwUziA-VexAXTDTMvlKLDXYECUSZHB2VE';

import {BottomSheetWidget} from '../widgets';
import {ConfimBooking, WatingCab, Waiting} from '../components';

import {useSelector} from 'react-redux';

import ws from '../ws/socket';

const status = ['wait', 'book', 'cancel', 'paymant'];
import {BASE_URL} from '../constants/url';

const Maps = ({navigation: {goBack}, route}) => {
  const {state} = route.params;
  const [process, setProcess] = React.useState(1);
  const [bookingId, setBookingId] = React.useState();
  const [bookingD, setBookingD] = React.useState();

  //user detels
  const user = useSelector(states => states.authReducer);

  // locations
  const initialcoordinate = {
    latitude: state.pikcup.lat,
    longitude: state.pikcup.lng,
    latitudeDelta: 0.003,
    longitudeDelta: 0.0032,
  };

  const destinationcoordinate = {
    latitude: state.destiny.lat,
    longitude: state.destiny.lng,
    latitudeDelta: 0.003,
    longitudeDelta: 0.0032,
  };

  // lisener

  ws.onmessage = m => {
    console.log(m.data);

    const message = JSON.parse(m.data);
    switch (message.code) {
      case 11:
        setProcess(0);
        break;

      case 2:
        getBookingStatus();
        break;

      case 3:
        goBack();
        break;

      default:
        break;
    }
  };

  // booking btn
  const confrimbooking = async () => {
    const body = {
      code: '1',
      name: 'Atanu',
      email: 'playatanu@gmail.com',
      to: {
        lat: '24.12',
        lng: '21.22',
      },
      from: {
        lat: '24.12',
        lng: '21.22',
      },
      amount: '50',
      seats: '4',
    };
    try {
      const res = await axios.post(BASE_URL + '/rider/book', body);
      console.log(res.data._id);
      setBookingId(res.data._id);
      setProcess(0);
    } catch (error) {}
  };

  const cancelBooking = async () => {
    try {
      const res = await axios.post(BASE_URL + '/rider/cancel', {
        _id: bookingId,
      });

      if (res.status === 200) {
        goBack();
      }
    } catch (error) {}
  };

  const getBookingStatus = async () => {
    try {
      const res = await axios.post(BASE_URL + '/rider/book/status', {
        _id: bookingId,
      });
      setBookingD(res.data);
      console.log(res.data);
      setProcess(2);
    } catch (error) {}
  };

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  });

  return (
    <View style={styles.main}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={initialcoordinate}>
        <Marker
          title={'ME'}
          // draggable={true}
          // onDragEnd={e => console.log(e.nativeEvent.coordinate)}
          flat={true}
          identifier={'ME3'}
          description={'pikcup point'}
          coordinate={initialcoordinate}
          // image={{uri: 'custom_pin'}}
        />

        <Marker
          title={'Destiny'}
          // draggable={true}
          // onDragEnd={e => console.log(e.nativeEvent.coordinate)}
          description={'destiny point'}
          coordinate={destinationcoordinate}
          // image={{uri: 'custom_pin'}}
        />

        <MapViewDirections
          origin={initialcoordinate}
          destination={destinationcoordinate}
          apikey={MAP_API_KEY}
          strokeWidth={3}
          strokeColor="hotpink"
        />
      </MapView>

      {status[process] === 'book' ? (
        <BottomSheetWidget
          isOpen={true}
          component={
            <ConfimBooking
              onPress={e => confrimbooking()}
              data={[1, 2, 3, 4]}
            />
          }
        />
      ) : status[process] === 'cancel' ? (
        <BottomSheetWidget
          isOpen={true}
          component={<WatingCab data={bookingD} onPress={cancelBooking} />}
        />
      ) : status[process] === 'wait' ? (
        <BottomSheetWidget
          isOpen={true}
          component={<Waiting message={'Finding toto'} />}
        />
      ) : null}
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
  },

  topBar: {
    width: 45,
    height: 45,
    margin: 20,
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 50,
    top: 0,
    left: 0,
    right: 0,
  },
});

/*
 : status[process] === 'paymant' ? (
        <BottomSheetWidget
          isOpen={true}
          component={<Payment onPress={payment} />}
        />
      ) */
