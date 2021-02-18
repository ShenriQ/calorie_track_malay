import React from 'react';
import {BackHandler, View, Text, StyleSheet, ImageBackground, StatusBar,TouchableOpacity, Image, TextInput , Platform,  } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Button, Input } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';
import {connect} from 'react-redux';
// custom import
import {icons, imgs} from '@assets';
import {constant, common,} from '@utils';
import {user_helper, profile_helper} from '@helper';
import {addUser} from '../../redux/actions';

class vSplash extends React.Component {
    constructor(props){
        super(props);

        this.props = props;
        this.state = {
            loading : false,
            login_success : false,
            pass_login_eneabled : true,
            login_result_msg : '',
            email : '',
            pass : '',
            err_email : '',
            err_pass : '',
            lang : global.lang
        }
    }

    componentDidMount = () => {
        this.getSavedData();
    }

    getSavedData = async () => {
        let userObj = await common._retrieveData(constant.Key_usertoken);
        if(userObj != null) {
            console.log('saved userObj', userObj)
            this.props.dispatch(addUser(userObj))
            this.goDiscover()
        }
        else {
            setTimeout(() => {
                this.goLogin()
            }, 3000)
        }
    }

    goDiscover =  () => {
        this.props.navigation.replace('discover')
    }

    goLogin =  () => {
        this.props.navigation.replace('login')
    }

    onQuitApp = () => {
        Platform.OS === 'ios' ?
        RNExitApp.exitApp() : BackHandler.exitApp()
    }

    render(){
        return (
            <View style = {styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
                <Image source = {icons.logo} style = {styles.logo}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1, flexDirection : 'column', alignItems : 'center', justifyContent : 'center',
    },
    logo : {
        width : 180, resizeMode : 'contain',
    },
});

export default connect(null)(vSplash)