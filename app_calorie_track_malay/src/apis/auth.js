import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Users')

export const api_login = (data) => {
    return auth().signInWithEmailAndPassword(data.email, data.pass).then((res) => {return res})
};

export const api_register = (data) => {
    return auth().createUserWithEmailAndPassword(data.email, data.pass)
        .then((res) => { 
            return res;
        })
};

export const api_signout=()=>{
    return auth().signOut().then(() => {return} );
}

export const api_read_userprofile = (user_id) => {
    return usersCollection.doc(user_id).get().then(res => {return res.data() })
}

export const api_save_userprofile = (user_id, data) => {
    return usersCollection.doc(user_id).set(data).then(res => {return res })
}