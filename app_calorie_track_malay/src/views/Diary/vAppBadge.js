import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, LogBox , Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import RNExitApp from 'react-native-exit-app';
import { SwitchItem } from '../../components/Global/Switch';
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
//svgs
import Svg_lamp from '../../assets/svgs/diary/ic_lamp.svg';
import Svg_bgbadge from '../../assets/svgs/diary/bg_badgesetting.svg';
import Svg_badgearrow from '../../assets/svgs/diary/bg_badge_arrow.svg';
LogBox.ignoreLogs(['useNativeDriver'])

export default class vAppBadge extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            activeTab: 0,
            isBadgeShow : false,
            Monday: false,
            Tuesday: false,
            Wednsday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
            Sunday: false,
        }
    }

    componentDidMount = () => {
    }

    data = {
        Monday: 1639,
        Tuesday: 2452,
        Wednsday: 2452,
        Thursday: 1659,
        Friday: 1659,
        Saturday: 1659,
        Sunday: 1659,
    }
    days = ['Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday', 'Sunday']


    _renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={[{ width: '100%', }, Gstyles.row_center]}>
                    <View style={[Gstyles.flex_1, { flexDirection: 'row', paddingLeft: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <Feather name="arrow-left" size={24} color={constant.C_BLACK_80} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titleTxt}>Calorie Badge</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <AntDesign name="close" size={24} color={constant.C_BLACK_50} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    _renderSetting = () => {
        return (
            <View style={[{ width: '100%' }, Gstyles.col_center]}>
                <View style={{ width: 273, height: 348, justifyContent:'flex-end' }}>
                    <View style={{ backgroundColor: constant.C_BLACK_10, borderRadius: 10, padding: 12, position: 'absolute', top: 0, left: 0 }}>
                        <Svg_bgbadge width={227} height={252} />
                    </View>
                    <Svg_badgearrow width={109} height={182} style={{ position: 'absolute', bottom: 0, right: 0 }} />
                    <View style={[Gstyles.col_center, {marginBottom : -12}]}>
                        <Text style={{fontSize: 14, fontWeight: '500', color: constant.C_BLACK_100, marginBottom: 8 }}>Show/Hide Badge</Text>
                        <SwitchItem value={this.state.isBadgeShow} onValueChange={() => this.setState({isBadgeShow : !this.state.isBadgeShow})} />
                    </View>
                </View>
            </View>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                {this._renderHeader()}
                <View style={styles.formView} >
                    <ScrollView style={{ flex: 1, width: '100%', }} >
                        <View style={styles.body}>
                            <View style={[styles.noticeview]}>
                                <View></View>
                                <Svg_lamp width={45} height={45} />
                                <Text style={styles.noticetxt}>Check how many calories you have  left for the day at a glance on your homepage screen.</Text>
                            </View>
                            <View style={{ width: '100%', marginTop: 12, marginBottom: 8, padding: 12, }}>
                                {this._renderSetting()}
                            </View>
                        </View>
                        <View style={{ height: 20 }}></View>
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
        backgroundColor: constant.C_BLACK_0, width: '100%', height: 80, elevation: 6, paddingBottom: 8, justifyContent: 'flex-end', flexDirection: 'column',
    },
    formView: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%',
    },
    titleTxt: {
        textAlign: 'center', fontSize: 22, fontWeight: '700', color: constant.C_BLACK_80, marginLeft: 16, marginRight: 16
    },
    noticeview: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 125, width: '100%',
        borderRadius: 12, paddingLeft: 25, paddingRight: 25, backgroundColor: '#6C94F4'
    },
    noticetxt: { flex: 1, marginLeft: 12, fontSize: 14, lineHeight: 20, fontWeight: '700', color: constant.C_BLACK_0 },
    tr: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: constant.C_BLACK_20, height: 46, alignItems: 'center', paddingLeft: 8, paddingRight: 8 },
    body: { padding: 20 },
    savebtn: { height: 45, width: '100%', borderRadius: 5, backgroundColor: constant.C_BLUE_50, marginTop: 12 }
});

