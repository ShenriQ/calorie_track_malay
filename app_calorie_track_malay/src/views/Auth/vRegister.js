import React from 'react';
import {BackHandler, View, Text, StyleSheet, ScrollView, StatusBar,TouchableOpacity, Image, TextInput , Platform,  } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Input } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';
import {connect} from 'react-redux';
// custom import
import {icons, imgs} from '@assets';
import {constant, common, lang} from '@utils';
import {user_helper, profile_helper} from '@helper';
import {addUser} from '../../redux/actions';

class vRegister extends React.Component {
    constructor(props){
        super(props);

        this.props = props;
        this.state = {
            loading : false,
            fname : '',
            lname : '',
            username : '',
            phone : '',
            email : '',
            pass : '',
            confirm_pass : '',
            err_id : -1,
            err_str : '',
        }
    }

    componentDidMount = () => {
    }

    validate = () => {
        if (this.state.fname == '') {
            this.setState({err_str : 'please input first name', err_id : 0});
            return false;
        }
        else if (this.state.lname == '') {
            this.setState({err_str : 'please input last name', err_id : 1});
            return false;
        }
        else if (this.state.username == '') {
            this.setState({err_str : 'please input username', err_id : 2});
            return false;
        }
        else if (this.state.phone == '') {
            this.setState({err_str : 'please input phone number', err_id : 3});
            return false;
        }
        else if (this.state.email == '') {
            this.setState({err_str : 'please input email address', err_id : 4});
            return false;
        }
        else if (this.state.pass == '') {
            this.setState({err_str : 'please input password', err_id : 5});
            return false;
        }
        else if (this.state.pass != this.state.confirm_pass){
            this.setState({err_str : 'please confirm password', err_id : 6});
            return false;
        }
        else {
            this.setState({err_str : '', err_id : -1});
            return true
        }
    }
 
    goLogin = () => {
        this.props.navigation.navigate('login')
    }

    onRegister =  () => {
        let isValid = this.validate()
        if (isValid==true) {
            this.setState({ loading: true })

            let user = {
                firstName: this.state.fname,
                lastName: this.state.lname,
                username: this.state.username,
                phone: this.state.phone,
                email: this.state.email,
                userStatus: 0,
                password: this.state.pass
            }
            user_helper.register(user, 
                this.onRegisterSuccess,
                (error) => {
                    // if(error.response.status == 400)
                    this.setState({ loading: false })
                    alert(error.response.data.message)
                    console.log(error.response.data)
                }
            )
        }
    }

    onRegisterSuccess = async(res) => {
        console.log('res', res)
        this.setState({ loading: false })
        let userObj = {token : res.Authorization}
        // await common._storeData(constant.Key_usertoken, userObj)
        this.props.dispatch(addUser(userObj))
        this.props.navigation.navigate('discover')
    }

    render(){
        return (
            <View style = {styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
                <Spinner  visible={this.state.loading} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1, flexDirection : 'column', alignItems : 'center', backgroundColor : constant.Color_Primary
    },
    formView : {
        flex : 1, flexDirection : 'column', justifyContent : 'flex-start', alignItems : 'center', width : '100%', paddingTop : 20,
        paddingLeft : 40, paddingRight : 40, backgroundColor : '#fff', borderTopLeftRadius : 35, borderTopRightRadius : 35,
    },
    titleView : {
        width : '100%', alignItems : 'center', marginTop : 8, marginBottom : 40,
    },
    titleTxt : {
        textAlign : 'center', fontSize : 22, fontWeight : '700', color : constant.Color_Text
    },
    termsTxt : {
        textAlign : 'center', fontSize : 12, color : constant.Color_Text1,
    },
    fogotTxt : {
        textAlign : 'center', fontSize : 14, fontWeight : '500', color : constant.Color_Primary
    },
    inputContainer : {height : 56, paddingLeft : 10, backgroundColor : constant.Color_InputBg, borderBottomWidth : 0, borderRadius : 8},
    logo : {
        width : 163, resizeMode : 'contain', marginTop : 10, marginBottom : 20
    },
    loginBtn : {
        width : '100%', borderRadius : 8, height : 56,
    },
    socialBtn : {
        justifyContent : 'center', alignItems : 'center', width : 44, height : 44, borderRadius : 22, borderColor : constant.Color_Primary, borderWidth : 1, 
    }
});


export default connect(null)(vRegister)