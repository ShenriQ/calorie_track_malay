import React from 'react';
import { BackHandler, View, Text, StyleSheet, ImageBackground, StatusBar, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// custom import
import { icons, imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils';
import { user_helper, profile_helper } from '@helper';
import { connect } from "react-redux";
import { addUser } from "../../redux/actions";
import { RectBtn, LinkBtn } from '../../components/Auth/Btns';
import { InputSignin } from '../../components/Auth/Inputs';
//svg
import Svg2 from '../../assets/svgs/auth/2.svg'

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
            <React.Fragment>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <Spinner visible={this.state.loading} />
                <KeyboardAwareScrollView
                    // style={{}}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.container}
                    scrollEnabled={false}
                >
                    <View style={[styles.container, Gstyles.col_center]}>
                        <View style={[styles.img_view, Gstyles.col_center]} >
                            <Svg2 width={286} height={286} style={styles.img} />
                        </View>
                        <View style={styles.formView}>
                            <InputSignin onChange={(text) => { }} value={''} placeholder={Strings["Email"]} />
                            <InputSignin onChange={(text) => { }} value={''} placeholder={Strings["Password"]} />
                            <View style={[Gstyles.col_center, styles.btn_view]}>
                                <RectBtn onPress={()=>{}} name={Strings["Sign in"]} />
                                <LinkBtn onPress={()=>{}}  name={Strings["Forgotten your password?"]} />
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', backgroundColor: constant.C_BLACK_0
    },
    formView: {
        width: '100%', padding: 20,
    },
    img_view: { flex: 1, minHeight: 286 },
    img: { width: 286, height: 286, resizeMode: 'contain' },
    btn_view: { marginBottom: 50, marginTop: 15 }
});


export default connect(null)(vLogin);