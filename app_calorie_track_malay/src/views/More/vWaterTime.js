import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { width, height } from 'react-native-dimension';
import { Button, Input } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import Picker from '@gregfrench/react-native-wheel-picker'
var PickerItem = Picker.Item;
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import Spacing from '../../components/Global/Spacing';


export default class vWaterTime extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            isEdit: false,
            date: new Date(),
            page: this.props.route.params.page,
            selectedInterval: 2,
            intervalList: [
                'Every 30 minutes', 'Every 1 hours',
                'Every 2 hours', 'Every 3 hours', 'Every 4 hours'
            ],
        }

    }

    static getDerivedStateFromProps(props, current_state) {
        if (current_state.page !== props.route.params.page) {
            return {
                page: props.route.params.page,
            }
        }
        return null
    }

    _renderHeader = () => {
        return (
            <View style={[Gstyles.row_center, Gstyles.w_100, styles.header]}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="close" size={24} color={constant.C_BLACK_0} />
                </TouchableOpacity>
                <Text style={[styles.titleTxt, Gstyles.flex_1]}>{this.state.page}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Text style={[Gstyles.fs_16, { color: constant.C_BLACK_0 }]}>Done</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _renderDay = () => {
        return (
            <View style={{ width: '100%' }}>
                {
                    this.state.page == 'Remind Me' ?
                        <Picker style={{ width: width(100), height: 200, backgroundColor : constant.C_BLACK_10 }}
                            lineColor={constant.C_BLUE_50} //to set top and bottom line color (Without gradients)
                            selectedValue={this.state.selectedInterval}
                            itemStyle={{color : constant.C_BLUE_50, fontSize: 18 }}
                            onValueChange={(index) => this.setState({selectedInterval : index})}>
                            {this.state.intervalList.map((value, i) => (
                                <PickerItem label={value} value={i} key={i} />
                            ))}
                        </Picker>
                        :
                        <DatePicker
                            fadeToColor={'none'}
                            style={{ width: width(100), backgroundColor: constant.C_BLACK_10, elevation: 1 }}
                            mode='time'
                            minuteInterval={15}
                            textColor={constant.C_BLUE_50}
                            date={this.state.date}
                            onDateChange={(value) => this.setState({ date: value })}
                        />
                }
            </View>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                {this._renderHeader()}
                <View style={{ width: '100%', flex: 1, position: 'relative' }} >
                    <View style={[styles.formView,]} >
                        <ScrollView style={{ width: '100%', flex: 1, }} >
                            {
                                this._renderDay()
                            }
                            <Spacing height={20} />
                        </ScrollView>
                    </View>
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

