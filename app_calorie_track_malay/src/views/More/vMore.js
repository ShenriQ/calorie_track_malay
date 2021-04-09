import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
// custom import
import {doLogout} from '../../redux/actions/user'

import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import Spacing from '../../components/Global/Spacing';
import AboutModal from '../../components/Modals/About';
import SignoutModal from '../../components/Modals/SignOut';

class vMore extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            activeTab: 0,
            isShowAboutModal: false,
            isShowSignoutModal : false,
        }
    }

    componentDidMount = () => {
    }

    user_profile = {
        name: 'Ben',
        membership: 'Free membership',
        photo: require('../../assets/imgs/tmp/avatar.png'),
    }

    settingList = [
        {
            name: 'My Profile & Goals',
            icon: <SimpleLineIcons name="user" size={24} color={constant.C_BLUE_50} />
        },
        {
            name: 'Reminders',
            icon: <Feather name="calendar" size={24} color={constant.C_BLUE_50} />
        },
        {
            name: 'About/Contact Us',
            icon: <MaterialIcons name="info-outline" size={24} color={constant.C_BLUE_50} />
        },
        {
            name: 'Sign Out',
            icon: <Feather name="log-out" size={24} color={constant.C_BLUE_50} />
        },
        {
            name: 'Shopping List',
            icon: <MaterialCommunityIcons name="cart-outline" size={24} color={constant.C_BLUE_50} />
        },
    ]

    goAddFood = () => {
        this.props.navigation.navigate('add_food')
    }

    onSignout = () => {
        this.setState({isShowAboutModal : false})
        this.props.doLogout()
    }

    _renderProfile = (data) => {
        return (
            <View style={[Gstyles.row_center, Gstyles.w_100]}>
                <Image source={data.photo} style={styles.profile_photo} />
                <View style={[Gstyles.col_center, Gstyles.flex_1, { paddingLeft: 16 }]}>
                    <Text style={styles.profile_name}>{data.name}</Text>
                    <Text style={styles.profile_membership}>{data.membership}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} style={styles.profile_btn_upgrade}>
                    <Text style={[Gstyles.fs_14, { color: constant.C_BLUE_50 }]}>Upgrade</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _renderSettingItem = (data, index) => {
        const onClick=()=>{
            if(data.name == 'My Profile & Goals') {
                this.props.navigation.navigate('profile');
            }
            else if(data.name == 'Reminders') {
                this.props.navigation.navigate('reminders');
            }
            else if(data.name == 'About/Contact Us') {
                this.setState({isShowAboutModal : true})
            }
            else if(data.name == 'Sign Out') {
                this.setState({isShowSignoutModal : true})
            }
            else if(data.name == 'Shopping List') {
                this.props.navigation.navigate('shoppinglist');
            }
        }
        return (
            <TouchableOpacity key={index} activeOpacity={0.7} style={styles.setting_item} onPress={()=>onClick()}>
                <View style={[Gstyles.row_center, Gstyles.w_100, {height: '100%'}]}>
                    {data.icon}
                    <Text style={[styles.settingItemTxt, Gstyles.flex_1]}>{data.name}</Text>
                    <Feather name="chevron-right" size={20} color={constant.C_BLUE_50} />
                </View>
                <View style={{height : 1, backgroundColor : '#E5E5E5', width : '100%'}}/>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                <View style={[styles.header, Gstyles.col_center_start]}>
                </View>
                <View style={styles.formView} >
                    {this._renderProfile(this.user_profile)}
                    <Text style={styles.settingTxt}>Settings</Text>
                    <View style={styles.settingView} >
                        <ScrollView style={{ flex: 1, width: '100%' }} >
                            {
                                this.settingList.map((settingItem, index) =>
                                    this._renderSettingItem(settingItem, index)
                                )
                            }
                            <Spacing height={20}/>
                        </ScrollView>
                    </View>

                </View>
                <AboutModal visible={this.state.isShowAboutModal} close={()=>this.setState({isShowAboutModal : false})}/>
                <SignoutModal visible={this.state.isShowSignoutModal} onSignout={()=>this.onSignout()} close={()=>this.setState({isShowSignoutModal : false})}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: constant.C_BLACK_0,
    },
    header: {
        backgroundColor: constant.C_BLUE_50, width: '100%', height: 252, paddingLeft: 28,
        paddingRight: 28, paddingTop: 50, borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
    },
    formView: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', paddingTop: 10,
        paddingLeft: 28, paddingRight: 28, marginTop: -200
    },
    settingView: { flex: 1, width: '100%', backgroundColor: constant.C_BLACK_0, elevation: 3, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
    profile_photo: { width: 80, height: 80, resizeMode: 'contain', borderRadius: 80 },
    profile_name: { fontSize: 24, fontWeight: '700', color: constant.C_BLACK_0, textAlign: 'left', width: '100%', marginBottom: 8 },
    profile_membership: { fontSize: 14, fontWeight: '500', color: constant.C_BLACK_0, textAlign: 'left', width: '100%' },
    profile_btn_upgrade: { borderRadius: 5, backgroundColor: constant.C_BLACK_0, paddingTop: 5, paddingBottom: 5, paddingLeft: 9, paddingRight: 9 },
    settingTxt: {
        fontSize: 18, fontWeight: '700', color: constant.C_BLACK_0, marginBottom: 8, width: '100%',
        textAlign: 'left', paddingLeft: 4, marginTop: 12
    },
    setting_item : {flexDirection : 'column',  paddingLeft : 12, paddingRight : 12, height : 50, },
    settingItemTxt: { fontSize: 14, fontWeight: '700', color: constant.C_BLUE_50, paddingLeft: 12 },
});

const mapStatetoProps=(state)=>{
    return {
        user : state.user.user
    }
}
const mapDispatchToProps = {
    doLogout, 
}
export default connect(mapStatetoProps, mapDispatchToProps)(vMore);