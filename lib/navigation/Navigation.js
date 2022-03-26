/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, Text} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home, Maps, Trips, Drawer, Auth} from '../screens';

import {useSelector, useDispatch} from 'react-redux';
import {login} from '../redux/actions/authAction';

import AsyncStorage from '@react-native-async-storage/async-storage';

const MainStack = createNativeStackNavigator();

const DrawerStack = createDrawerNavigator();

const AuthStack = createDrawerNavigator();

const DrawerStackNaigator = () => {
  return (
    <DrawerStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <Drawer {...props} />}
      initialRouteName="Main">
      <DrawerStack.Screen name="Main" component={MainStackNavigator} />
    </DrawerStack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="Maps" component={Maps} />
      <MainStack.Screen name="Trips" component={Trips} />
    </MainStack.Navigator>
  );
};

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Auth" component={Auth} />
    </AuthStack.Navigator>
  );
};

const Navigation = () => {
  const [isLoadin, setIsLoding] = React.useState(true);

  const user = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue != null) {
        dispatch(login(JSON.parse(jsonValue)));
      }
    } catch (e) {}
    setIsLoding(false);
  };

  React.useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      {isLoadin ? (
        <View>
          <Text>Loading</Text>
        </View>
      ) : !user ? (
        <AuthStackNavigator />
      ) : (
        <DrawerStackNaigator />
      )}
    </>
  );
};

export default Navigation;
