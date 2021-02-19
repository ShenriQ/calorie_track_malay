import React from 'react';
import { BackHandler, View, Text, StyleSheet, ImageBackground, StatusBar, TouchableOpacity, Image, TextInput, Platform } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Input } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';
// custom import
import { icons, imgs } from '@assets';
import { constant, common } from '@utils';
import { user_helper, profile_helper } from '@helper';
import { connect } from "react-redux";
import { addUser } from "../../redux/actions";

class vLogin extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            loading: false,
            email: '',
            pass: '',
            err_email: '',
            err_pass: '',
        }
    }

    componentDidMount = () => {
    }

    validate = () => {
        if (this.state.email == '') {
            this.setState({ err_email: 'please input valid email', err_pass: '' });
            return false;
        }
        else if (this.state.pass == '') {
            this.setState({ err_email: '', err_pass: 'please input password' });
            return false;
        }
        else {
            this.setState({ err_email: '', err_pass: '' });
            return true;
        }
    }

    goRegister = () => {
        this.props.navigation.navigate('register')
    }

    onLogin = () => {
        let isValid = this.validate()
        if (isValid == true) {
            this.setState({ loading: true })
            user_helper.login(this.state.email, this.state.pass,
                this.onLoginSuccess,
                (error) => {
                    // if(error.response.status == 400)
                    this.setState({ loading: false })
                    alert(error.response.data.message)
                    console.log(error.response.data)
                }
            )
        }
    }

    onLoginSuccess = async (res) => {
        console.log('res', res)
        this.setState({ loading: false })
        let userObj = { token: res.Authorization }
        // await common._storeData(constant.Key_usertoken, userObj)
        this.props.dispatch(addUser(userObj))
        this.props.navigation.navigate('discover')
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: constant.Color_Primary
    },
    formView: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', paddingTop: 20,
        paddingLeft: 40, paddingRight: 40, backgroundColor: '#fff', borderTopLeftRadius: 35, borderTopRightRadius: 35,
    },
    titleView: {
        width: '100%', alignItems: 'center', marginTop: 8, marginBottom: 40,
    },
    titleTxt: {
        textAlign: 'center', fontSize: 22, fontWeight: '700', color: constant.Color_Text
    },
    termsTxt: {
        textAlign: 'center', fontSize: 12, color: constant.Color_Text1,
    },
    fogotTxt: {
        textAlign: 'center', fontSize: 14, fontWeight: '500', color: constant.Color_Primary
    },
    inputContainer: { height: 56, paddingLeft: 10, backgroundColor: constant.Color_InputBg, borderBottomWidth: 0, borderRadius: 8 },
    logo: {
        width: 163, resizeMode: 'contain', marginTop: 10, marginBottom: 20
    },
    loginBtn: {
        width: '100%', borderRadius: 8, height: 56,
    },
    socialBtn: {
        justifyContent: 'center', alignItems: 'center', width: 44, height: 44, borderRadius: 22, borderColor: constant.Color_Primary, borderWidth: 1,
    }
});


export default connect(
    null
)(vLogin);