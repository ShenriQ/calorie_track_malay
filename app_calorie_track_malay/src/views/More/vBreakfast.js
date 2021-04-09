import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';
import { width, height } from 'react-native-dimension';
import DatePicker from 'react-native-date-picker';
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';

import Spacing from '../../components/Global/Spacing';
import { SwitchItem } from '../../components/Global/Switch';
import CbxWeekday from '../../components/Global/CbxWeekday';

export default class vBreakfast extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            isEdit: false,
            date: new Date(),
            isBreakfast: true,
            isShowSearchModal: false,
            Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: true, Sun: true,
            message: '',
            data: this.props.route.params.data,
        }

    }

    static getDerivedStateFromProps(props, current_state) {
        if (current_state.data !== props.route.params.data) {
            return {
                data: props.route.params.data,
            }
        }
        return null
    }

    msgPlaceHolders = {
        Breakfast: 'Don’t forget to track your breakfast...',
        Lunch: 'Don’t forget to track your lunch...',
        Dinner: 'Don’t forget to track your dinner...',
        Water: 'Text here...'
    }

    _renderHeader = () => {
        return (
            <View style={[Gstyles.row_center, Gstyles.w_100, styles.header]}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Feather name="chevron-left" size={24} color={constant.C_BLACK_0} />
                </TouchableOpacity>
                <Text style={[styles.titleTxt, Gstyles.flex_1]}>{this.state.data.name}</Text>
                {
                    this.state.data.enabled ?
                        <TouchableOpacity onPress={() => this.setState({ isEdit: !this.state.isEdit })}>
                            <Text style={[Gstyles.fs_16, { color: constant.C_BLACK_0 }]}>Save</Text>
                        </TouchableOpacity>
                        : <View style={{ width: 24, }} />
                }

            </View>
        )
    }

    _renderDay = () => {
        return (
            <View style={{ width: '100%' }}>
                <TouchableOpacity activeOpacity={0.6} style={styles.setting_item} >
                    <View style={[Gstyles.row_center, Gstyles.w_100, { height: '100%', paddingLeft: 24, paddingRight: 24 }]}>
                        <View style={[Gstyles.col_center, Gstyles.flex_1]}>
                            <Text style={[{
                                fontSize: 18, fontWeight: '500', width: '100%',
                                color: this.state.data.enabled ? constant.C_BLACK_100 : constant.C_BLACK_50
                            }]}>Time of Day</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <DatePicker
                    fadeToColor={'none'}
                    style={{ width: width(100), backgroundColor: constant.C_BLACK_10, elevation: 1 }}
                    mode='time'
                    minuteInterval={15}
                    textColor={this.state.data.enabled ? constant.C_BLUE_50 : constant.C_BLACK_50}
                    date={this.state.date}
                    onDateChange={(value) => this.setState({ date: value })}
                />
            </View>
        )
    }

    _renderWeek = () => {
        return (
            <View style={{ width: '100%', }}>
                <TouchableOpacity activeOpacity={0.6} style={styles.setting_item} >
                    <View style={[Gstyles.row_center, Gstyles.w_100, { height: '100%', paddingLeft: 24, paddingRight: 24, }]}>
                        <View style={[Gstyles.col_center, Gstyles.flex_1]}>
                            <Text style={[{
                                fontSize: 18, fontWeight: '500', width: '100%',
                                color: this.state.data.enabled ? constant.C_BLACK_100 : constant.C_BLACK_50
                            }]}>Days of the week</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingLeft: 32, paddingRight: 32, marginBottom: 16 }}>
                    {
                        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) =>
                            <CbxWeekday key={index} checked={this.state[day]} enabled={this.state.data.enabled} text={day[0]} onChange={(value) => this.setState({ [day]: value })} />
                        )
                    }
                </View>
                <View style={styles.border1} />
            </View>
        )
    }

    _renderMessage = () => {
        return (
            <View style={{ width: '100%', paddingLeft: 24, paddingRight: 24 }}>
                <TouchableOpacity activeOpacity={0.6} style={styles.setting_item} >
                    <View style={[Gstyles.row_center, Gstyles.w_100, { height: '100%', }]}>
                        <View style={[Gstyles.col_center, Gstyles.flex_1]}>
                            <Text style={[{
                                fontSize: 18, fontWeight: '500', width: '100%',
                                color: this.state.data.enabled ? constant.C_BLACK_100 : constant.C_BLACK_50
                            }]}>Reminder message</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TextInput
                    editable={this.state.data.enabled}
                    multiline={true}
                    value={this.state.message}
                    onChangeText={(value) => this.setState({ message: value })}
                    placeholder={this.msgPlaceHolders[this.state.data.name]}
                    style={{ width: '100%', height: 103, borderWidth: 2, borderColor: '#4779F155', borderRadius: 6, padding: 8 }}
                    textAlignVertical='top'
                />
            </View>
        )
    }

    _renderWaterTime = () => {
        const goPage=(page_name)=>{
            this.props.navigation.navigate('watertime', {page : page_name})
        }

        return (
            <View style={{ width: '100%', flexDirection: 'column' }}>
                <View activeOpacity={0.6} style={styles.setting_item} >
                    <View style={[{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 24, paddingRight: 24, }]}>
                        <Text style={[{
                            fontSize: 18, fontWeight: '500', marginRight: 24,
                            color: this.state.data.enabled ? constant.C_BLACK_100 : constant.C_BLACK_50
                        }]}>Between</Text>
                        <TouchableOpacity style={[styles.timeBtn, Gstyles.col_center]} onPress={()=>goPage('Start Time')}>
                            <Text style={styles.timeBtnTxt}>9:00 AM</Text>
                        </TouchableOpacity>
                        <Text style={[{
                            fontSize: 18, fontWeight: '500', marginLeft: 18, marginRight: 18,
                            color: this.state.data.enabled ? constant.C_BLACK_100 : constant.C_BLACK_50
                        }]}>To</Text>
                        <TouchableOpacity style={[styles.timeBtn, Gstyles.col_center]} onPress={()=>goPage('End Time')}>
                            <Text style={styles.timeBtnTxt}>9:00 PM</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View activeOpacity={0.6} style={styles.setting_item} >
                    <View style={[{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 24, paddingRight: 24, }]}>
                        <Text style={[{
                            fontSize: 18, fontWeight: '500', marginRight: 24,
                            color: this.state.data.enabled ? constant.C_BLACK_100 : constant.C_BLACK_50
                        }]}>Remind me</Text>
                        <TouchableOpacity style={[styles.timeBtn, Gstyles.col_center]} onPress={()=>goPage('Remind Me')}>
                            <Text style={styles.timeBtnTxt}>Every 2 hours</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.border1} />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                {this._renderHeader()}
                <TouchableOpacity activeOpacity={0.6} style={styles.setting_item} >
                    <View style={[Gstyles.row_center, Gstyles.w_100, { height: '100%', paddingLeft: 24, paddingRight: 24, backgroundColor: constant.C_BLACK_0 }]}>
                        <View style={[Gstyles.col_center, Gstyles.flex_1]}>
                            <Text style={[{ fontSize: 18, fontWeight: '500', width: '100%' }]}>{this.state.data.name} Reminder</Text>
                        </View>
                        <SwitchItem value={this.state.data.enabled} onValueChange={() => { }} />
                    </View>
                    <View style={styles.border1} />
                </TouchableOpacity>
                <View style={{ width: '100%', flex: 1, position: 'relative' }} >
                    <View style={[styles.formView,]} >
                        <ScrollView style={{ width: '100%', flex: 1, }} >
                            {
                                this.state.data.name == 'Water' ? this._renderWaterTime() : this._renderDay()
                            }
                            {this._renderWeek()}
                            {this._renderMessage()}
                            <Spacing height={20} />
                        </ScrollView>
                    </View>
                    {
                        !this.state.data.enabled && <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#00000010' }}>
                        </View>
                    }
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
    setting_item: { flexDirection: 'column', height: 58, width: '100%', },
    settingItemTxt: { fontSize: 14, fontWeight: '700', color: constant.C_BLACK_90, paddingLeft: 26 },
    border1: { height: 1, backgroundColor: '#E5E5E5', width: '100%' },
    timeBtn: { paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 4, borderWidth: 1, borderColor: constant.C_BLUE_50, borderRadius: 5, },
    timeBtnTxt: { fontSize: 18, fontWeight: '400', color: constant.C_BLUE_50 },
});

