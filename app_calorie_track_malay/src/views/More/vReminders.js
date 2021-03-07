import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { width, height } from 'react-native-dimension';
import { Button, Input } from 'react-native-elements';
import { Modal, ModalContent, BottomModal, ModalTitle } from 'react-native-modals';
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import { user_helper, profile_helper } from '@helper';
import Spacing from '../../components/Global/Spacing';
import AboutModal from '../../components/Modals/About';
import SignoutModal from '../../components/Modals/SignOut';
import { SwitchItem } from '../../components/Global/Switch';

export default class vReminders extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            isEdit: false,
            isShowSearchModal: false,
        }
    }

    componentDidMount = () => {
    }

    remindList = [
        { name: 'Breakfast', day: 'Everyday', time: '10.00 AM', enabled: true },
        { name: 'Lunch', day: 'Weekdays', time: '2.00 PM', enabled: true },
        { name: 'Dinner', day: 'Weekdays', time: '2.00 PM', enabled: false },
        { name: 'Water', day: 'Mon, Web, Sun', time: '9.00 AM - 9.00 PM', enabled: true },
    ]


    goAddFood = () => {
        this.props.navigation.navigate('add_food')
    }

    _renderHeader = () => {
        return (
            <View style={[Gstyles.row_center, Gstyles.w_100, styles.header]}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Feather name="chevron-left" size={24} color={constant.C_BLACK_0} />
                </TouchableOpacity>
                <Text style={[styles.titleTxt, Gstyles.flex_1]}>Reminders</Text>
                <View style={{ width: 24 }} />
            </View>
        )
    }

    _renderListItem = (data, index) => {
        const onClick=()=>{
            this.props.navigation.navigate('breakfast',  {data : data});
        }

        return (
            <TouchableOpacity key={index} activeOpacity={0.6} style={styles.setting_item} onPress={() => onClick()}>
                <View style={[Gstyles.row_center, Gstyles.w_100, { height: '100%', paddingLeft: 24, paddingRight: 24 }]}>
                    <View style={[Gstyles.col_center, Gstyles.flex_1]}>
                        <Text style={[{ fontSize: 18, fontWeight: '500', width: '100%' }]}>{data.name}</Text>
                        {
                            data.enabled == true &&
                            <View style={[Gstyles.row_center,]}>
                                <Text style={[{ fontSize: 14, fontWeight: '500', color: constant.C_BLACK_50 },]}>{data.day}</Text>
                                <Text style={[{ fontSize: 14, fontWeight: '500', color: constant.C_BLACK_50, textAlign: 'center' }, Gstyles.flex_1]}>{data.time}</Text>
                            </View>
                        }
                    </View>
                    <SwitchItem value={data.enabled} onValueChange={() => { }} />
                </View>
                <View style={styles.border1} />
            </TouchableOpacity>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                {this._renderHeader()}
                <View style={styles.formView} >
                    <ScrollView style={{ width: '100%', flex: 1, }} >
                        {
                            this.remindList.map((item, index) =>
                                this._renderListItem(item, index)
                            )
                        }
                        <Spacing height={20} />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: constant.C_BLACK_0,
    },
    header: {
        backgroundColor: constant.C_BLUE_50, width: '100%', height: 80, paddingLeft: 24,
        paddingRight: 24, paddingTop: 30,
    },
    formView: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%',
    },
    titleTxt: { fontSize: 18, fontWeight: '700', color: constant.C_BLACK_0, textAlign: 'center' },
    setting_item: { flexDirection: 'column', height: 58, },
    settingItemTxt: { fontSize: 14, fontWeight: '700', color: constant.C_BLACK_90, paddingLeft: 26 },
    border1: { height: 1, backgroundColor: '#E5E5E5', width: '100%' },
    addbtn_view: { flex: 1, minHeight: 80, width: '100%', paddingTop: 20 },
    addbtn: { backgroundColor: constant.C_BLUE_50, height: 40, width: 120, borderRadius: 20 },
    modalTitleBar: { height: 56 },
    modalTitleTxt: { fontSize: 18, fontWeight: '700', color: constant.C_BLACK_100, textAlign: 'center' },
    searchWrap: { height: 40, width: width(95), padding: 0, marginTop: 12, },
    searchBar: { height: 40, elevation: 4, paddingLeft: 16, margin: 0, backgroundColor: constant.C_BLACK_0, borderBottomWidth: 0, borderRadius: 24 },
    searchBarBtn: { height: 31, width: 110, borderRadius: 5 },
    modal_addlist_btn: { backgroundColor: constant.C_BLUE_50, height: 47, width: '100%', borderRadius: 5 },
});

