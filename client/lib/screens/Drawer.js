import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {logout} from '../redux/actions/authAction';
import {useDispatch, useSelector} from 'react-redux';

GoogleSignin.configure();

const Drawer = ({navigation}) => {
  const user = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      navigation.closeDrawer();
      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.main}>
      <DrawerContentScrollView>
        <View style={styles.header}>
          <Image style={styles.image} source={{uri: user.photo}} />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        <View style={styles.line} />

        <View style={styles.butomSection}>
          <TouchableOpacity onPress={() => navigation.navigate('Trips')}>
            <View style={styles.listTile}>
              <Text>Your Trips</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <DrawerItemList {...props} /> */}
      </DrawerContentScrollView>

      <TouchableOpacity onPress={signOut}>
        <View style={styles.listTile}>
          <Text>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  main: {
    padding: 10,
    flex: 1,
  },
  header: {
    width: '100%',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  userEmail: {
    marginBottom: 10,
  },
  line: {
    // borderColor: 'gray',
    // borderTopWidth: 1,
  },
  butomSection: {flex: 1},

  listTile: {
    marginVertical: 5,
    paddingVertical: 10,
    justifyContent: 'center',
    // borderTopColor: 'gray',
    // borderTopWidth: 0.5,
  },
});
