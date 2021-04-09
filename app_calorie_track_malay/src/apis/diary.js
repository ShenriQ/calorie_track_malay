import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Users')

export const api_listen_diary = (user_id, onResult, onError) => {
    return usersCollection.doc(user_id).collection('Diary').onSnapshot(onResult, onError);
}
