import React from 'react';
import { BackHandler, View, Text, StyleSheet, ImageBackground, StatusBar, TouchableOpacity, Image, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Button, Input } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';
import { connect } from 'react-redux';
// custom import
import { icons, imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import { user_helper, profile_helper } from '@helper';
import { addUser } from '../../redux/actions';
import {RectBtn, LinkBtn} from '../../components/Auth/Btns';
//svgs
import Svg1 from '../../assets/svgs/auth/1.svg'

class vSplash extends React.Component {
    constructor(props) {
        super(props);
        
        this.props = props;
        this.state = {
            loading: false,
        }
    }

    componentDidMount = () => {
        this.getSavedData();
    }

    getSavedData = async () => {
        let userObj = await common._retrieveData(constant.Key_usertoken);
        if (userObj != null) {
            console.log('saved userObj', userObj)
            this.props.dispatch(addUser(userObj))
        }
    }

    onQuitApp = () => {
        Platform.OS === 'ios' ?
            RNExitApp.exitApp() : BackHandler.exitApp()
    }
    onStartQuery=()=>{
        this.props.navigation.navigate('q1')
    }
    onGoLogin=()=>{
        this.props.navigation.navigate('login')
    }

    render() {
        return (
            <React.Fragment>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <View style={styles.container}>
                    <Text style={styles.brand_txt}>{constant.app_brand}</Text>
                    <View style={styles.container}>
                        <View style={styles.img_view}>
                            <Svg1 width={'100%'} height={'100%'} style={styles.img}/>
                        </View>
                        <Text style={styles.appname_txt}>{constant.app_name}</Text>
                    </View>
                    <View style={[Gstyles.col_center, styles.btn_view]}>
                        <RectBtn onPress={this.onStartQuery} name={Strings["Get started"]}/>
                        <LinkBtn onPress={this.onGoLogin} name={Strings["I’m already a member"]}/>
                    </View>
                </View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', backgroundColor : constant.C_BLACK_0
    },
    brand_txt : {fontSize : 24, fontWeight : '700', color : constant.C_BLACK_100, marginTop : 70, marginLeft : 20},
    appname_txt : {fontSize:14, fontWeight : '400', color : constant.C_BLACK_100, textAlign : 'center', width : '100%', marginTop : 12},
    img_view : {flex : 1, paddingRight : 35},
    img : {width : '100%', height : '100%', resizeMode : 'contain'},
    btn_view : {marginBottom : 50, marginTop : 65}
});

export default connect(null)(vSplash)