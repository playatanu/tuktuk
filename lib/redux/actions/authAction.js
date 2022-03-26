import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUser = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (e) {
    // saving error
  }
};

const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (e) {
    // remove error
  }
};

const login = value => {
  storeUser(value);
  return {
    type: 'LOGIN',
    payload: value,
  };
};

const logout = () => {
  removeValue();
  return {
    type: 'LOGOUT',
  };
};

export {login, logout};
