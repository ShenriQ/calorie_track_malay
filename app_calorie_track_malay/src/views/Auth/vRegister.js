import React from 'react';
import {  View,StyleSheet,StatusBar,} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { CheckBox } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from "react-redux";
// custom import
import { constant, common, Strings, Gstyles } from '../../utils';
import {doRegister} from '../../redux/actions/user';
import {showToast} from '../../redux/actions/global';
import { RectBtn } from '../../components/Auth/Btns';
import { InputSignin } from '../../components/Auth/Inputs';
//svg
import Svg2 from '../../assets/svgs/auth/2.svg'

class vRegister extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            loading: false,
            username : '',
            email: '',
            pass: '',
            err_msg: '',
            termchecked: false,
        }
    }

    componentDidMount = () => {
    }

    validate = () => {
        if (common.isNullorEmpty(this.state.username)) {
            this.setState({ err_msg: 'please input name' });
            this.props.showToast({ type: 'error', msg: 'Please input name!' })
            return false;
        }
        else if (common.isValidEmail(this.state.email) == false) {
            this.setState({ err_msg: 'please input valid email' });
            this.props.showToast({ type: 'error', msg: 'Please input valid email!' })
            return false;
        }
        else if (common.isNullorEmpty(this.state.pass)) {
            this.setState({err_msg: 'please input password' });
            this.props.showToast({ type: 'error', msg: 'Please input password!' })
            return false;
        }
        else if (this.state.termchecked == false) {
            this.setState({err_msg: 'please confirm the terms' });
            this.props.showToast({ type: 'error', msg: 'Please confirm the terms!' })
            return false;
        }
        else {
            this.setState({ err_msg: ''});
            this.props.showToast()
            return true;
        }
    }

    onRegister = () => {
        let isValid = this.validate()
        if (isValid == true) {
            this.props.doRegister({
                name : this.state.username, 
                email : this.state.email,
                pass : this.state.pass,
                answerInfo : this.props.answerInfo
            })
        }
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
                            <InputSignin onChange={(text) => this.setState({username : text})} 
                                value={this.state.username} placeholder={Strings["First name (min. 3 characters)"]} />
                            <InputSignin onChange={(text) => this.setState({email : text})} 
                                value={this.state.email} placeholder={Strings["Email"]} />
                            <InputSignin onChange={(text) => this.setState({pass : text})} secureTextEntry ={true} 
                                value={this.state.pass} placeholder={Strings["Password (min. 6 characters)"]} />
                            <View style={[Gstyles.col_center, styles.btn_view]}>
                                <CheckBox
                                    containerStyle={styles.checkbox}
                                    textStyle={styles.termstxt}
                                    center
                                    title='By using this App you agree to the Terms of Use and Privacy Policy.'
                                    checked={this.state.termchecked}
                                    onPress={() => this.setState({ termchecked: !this.state.termchecked })}
                                />
                                <RectBtn onPress={() => this.onRegister()} name={Strings["Next"]} />
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
        flex: 1, flexDirection: 'column', backgroundColor: constant.C_BLACK_0,
    },
    formView: {
        width: '100%', padding: 20,
    },
    img_view: { flex: 1, minHeight: 286 },
    img: { width: 286, height: 286, resizeMode: 'contain' },
    btn_view: { marginBottom: 50 },
    checkbox: { backgroundColor: constant.C_BLACK_0, borderWidth: 0, width: 273 },
    termstxt: { fontSize: 10, fontWeight: '400', color: constant.C_BLACK_100 }
});

const mapStatetoProps=(state)=>{
    return {
        answerInfo : state.user.answerInfo
    }
}
const mapDispatchToProps = {
    doRegister, showToast
}
export default connect(mapStatetoProps, mapDispatchToProps)(vRegister);