import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  VirtualizedList,
} from 'react-native';

import React from 'react';
import {Button} from '../widgets';
import {PlacesSearch} from '../components';

import {useSelector} from 'react-redux';

import axios from 'axios';

import {BASE_URL} from '../constants/url';

import ws from '../ws/socket';

const Home = ({navigation}) => {
  const [isAllreadybook, setIsAlredyBook] = React.useState(false);
  const [state, setState] = React.useState({
    pikcup: {
      address: '',
      lat: 0,
      lng: 0,
    },

    destiny: {
      address: '',
      lat: 0,
      lng: 0,
    },
  });

  const user = useSelector(states => states.authReducer);

  const isAnyActiveRide = async () => {
    try {
      const res = await axios.post(BASE_URL + '/rider/book/active', {
        email: user.email,
      });

      console.log(res.data);

      if (res.data !== null) {
        setIsAlredyBook(true);
      } else {
        setIsAlredyBook(false);
      }
    } catch (error) {
      console.error(error);
      setIsAlredyBook(false);
    }
  };

  ws.onmessage = m => {
    console.log(m.data);

    const message = JSON.parse(m.data);

    switch (message.code) {
      case 20:
        isAnyActiveRide();
        break;

      case 2:
        isAnyActiveRide();
        break;
      default:
        break;
    }
  };

  const letsGo = () => {};

  React.useEffect(() => {
    isAnyActiveRide();
    ws.onopen = () => {
      ws.send(JSON.stringify({email: user.email}));
      console.log('ws connected');
    };
  }, []);

  return (
    <View style={styles.main}>
      <ImageBackground
        style={styles.topSection}
        source={require('../assets/bg.png')}
        resizeMode="cover">
        <View style={styles.appBar}>
          <Text style={styles.appBarTitle}>Tuktuk</Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image style={styles.profileIcon} source={{uri: user.photo}} />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.manuSection}>
        {isAllreadybook ? (
          <View>
            <Text>You have already booked your ride</Text>
            <Text>You have already booked your ride</Text>
            <Text>You have already booked your ride</Text>

            <Button
              btnStyle={styles.goRideBtn}
              text={'Lets Go'}
              onPress={letsGo}
            />
          </View>
        ) : (
          <View>
            <ScrollView keyboardShouldPersistTaps="handled">
              <PlacesSearch
                placeholder={'Pikcup point'}
                onPress={e => {
                  setState({...state, pikcup: e});
                }}
              />
              <PlacesSearch
                placeholder={'Where to?'}
                onPress={e => setState({...state, destiny: e})}
              />

              <Button
                btnStyle={
                  isAllreadybook ? styles.goRideDisBtn : styles.goRideBtn
                }
                text={'Goto Ride'}
                disabled={isAllreadybook ? true : false}
                onPress={() => navigation.navigate('Maps', {state: state})}
              />
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  topSection: {width: '100%', height: 400},
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  appBarTitle: {fontSize: 24, fontWeight: '900', color: 'white'},
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'white',
  },
  manuSection: {
    padding: 20,
  },

  goRideBtn: {
    marginTop: 20,
  },
  goRideDisBtn: {
    marginTop: 20,
    backgroundColor: 'gray',
  },
});
