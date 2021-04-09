import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from "react-redux";
// custom import
import { constant, common, Strings, Gstyles } from '../../utils';
import {doLogin} from '../../redux/actions/user';
import {showToast} from '../../redux/actions/global';
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
            err_msg: '',
        }
    }

    componentDidMount = () => {
    }

    
    validate = () => {
        if (common.isValidEmail(this.state.email) == false) {
            this.setState({ err_msg: 'please input valid email' });
            this.props.showToast({ type: 'error', msg: 'Please input valid email!' })
            return false;
        }
        else if (common.isNullorEmpty(this.state.pass)) {
            this.setState({err_msg: 'please input password' });
            this.props.showToast({ type: 'error', msg: 'Please input password!' })
            return false;
        }
        else {
            this.setState({ err_msg: ''});
            return true;
        }
    }

    onLogin = () => {
        let isValid = this.validate()
        if (isValid == true) {
            this.props.doLogin({
                email : this.state.email,
                pass : this.state.pass,
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                
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
                            <InputSignin onChange={(text) => this.setState({email: text})} value={this.state.email} 
                                placeholder={Strings["Email"]} />
                            <InputSignin onChange={(text) => this.setState({pass: text})} value={this.state.pass} 
                                secureTextEntry ={true} placeholder={Strings["Password"]} />
                            <View style={[Gstyles.col_center, styles.btn_view]}>
                                <RectBtn onPress={()=>this.onLogin()} name={Strings["Sign in"]} />
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


const mapDispatchToProps = {
    doLogin, showToast
}
export default connect(null, mapDispatchToProps)(vLogin);