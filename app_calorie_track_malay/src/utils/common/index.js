import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(
      key,
      JSON.stringify(value)
    );
    return true;
  } catch (error) {
    console.log(error)
    return false;
  }
};

const _retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.log(error)
    return null;
  }
};

const _removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
    return false;
  }
}

const isNullorEmpty = (str) => {
  if (str == null || str == '') {
    return true
  }
  return false
}

const isValidEmail = (email) => {
  var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(email);  // returns a boolean 
}

const printLog=(title, text)=>{
  console.log(title + ' : ', text)
}

export default {
  _storeData, _retrieveData, _removeData, isNullorEmpty, isValidEmail, printLog
}