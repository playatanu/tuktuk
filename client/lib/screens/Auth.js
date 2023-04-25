import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {useDispatch, useSelector} from 'react-redux';
import {login} from '../redux/actions/authAction';

GoogleSignin.configure();

const Auth = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.authReducer);

  console.log(user);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      dispatch(login(userInfo.user));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
      }
    }
  };

  React.useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '1036083422906-jia7466ggbu937afsmu6s95kh8grtfcs.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.flex}>
        <Text style={styles.heading}>Book a Toto</Text>

        <Text style={styles.subHeading}>
          Book your ride and you're ready to go!
        </Text>
      </View>

      <Image style={styles.totoImage} source={require('../assets/toto.png')} />

      <GoogleSigninButton
        style={styles.googleBtn}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    color: 'white',
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  heading: {fontSize: 50, fontWeight: '600'},
  subHeading: {fontSize: 30, fontWeight: '300'},
  totoImage: {
    width: 300,
    height: 300,
  },

  googleBtn: {width: '100%', height: 50},

  logo: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
});
