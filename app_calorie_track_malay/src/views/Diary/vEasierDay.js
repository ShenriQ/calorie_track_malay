import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import RNExitApp from 'react-native-exit-app';
import { CheckBox } from 'react-native-elements';
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
//svgs
import Svg_lamp from '../../assets/svgs/diary/ic_lamp.svg';

export default class vEasierDay extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            activeTab: 0,
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
                    <Text style={styles.titleTxt}>Easier Days</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                    </View>
                </View>
            </View>
        )
    }

    _renderTable = () => {
        return (
            <View style={{ width: '100%' }}>
                <View style={[styles.tr, {borderBottomWidth: 0, backgroundColor: constant.C_BLACK_0}]}>
                    <Text style={{ flex: 1, fontSize: 16, fontWeight: '700', color: constant.C_BLACK_100 }}>Days</Text>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: constant.C_BLACK_100 }}>Tick</Text>
                    <Text style={{ flex: 1, fontSize: 16, fontWeight: '700', color: constant.C_BLACK_100, textAlign: 'right' }}>
                        kcal
                    </Text>
                </View>
                {
                    this.days.map((day, index) =>
                        <View key={index} style={styles.tr}>
                            <Text style={{ flex: 1, fontSize: 14, fontWeight: '400', color: constant.C_BLACK_100 }}>{day}</Text>
                            <CheckBox checked={this.state[day]}
                                onPress={() => this.setState({ [day]: !this.state[day] })}
                                size={24} containerStyle={{ margin: 0, padding: 0 }} style={{ borderColor: constant.C_BLUE_50 }}
                            />
                            <Text style={{ flex: 1, fontSize: 14, fontWeight: '500', color: constant.C_BLACK_100, textAlign: 'right' }}>
                                {this.data[day]}
                            </Text>
                        </View>
                    )
                }
                <View style={[styles.tr, {borderBottomWidth: 0,}]}>
                    <Text style={{ flex: 1, fontSize: 16, fontWeight: '700', color: constant.C_BLACK_100 }}>Total</Text>
                    <Text style={{ flex: 1, fontSize: 16, fontWeight: '700', color: constant.C_BLACK_100, textAlign: 'right' }}>
                        13,199
                    </Text>
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
                        <View style={[styles.noticeview]}>
                            <View></View>
                            <Svg_lamp width={52} height={52} />
                            <Text style={styles.noticetxt}>Tick the days of the week you would like an easier calorie target on.</Text>
                        </View>
                        <View style={styles.body}>
                            <View style={{ width: '100%', marginTop: 12, marginBottom: 8, padding: 12, backgroundColor: constant.C_BLACK_10 }}>
                                {this._renderTable()}
                            </View>
                            <TouchableOpacity style={[styles.savebtn, Gstyles.col_center]}>
                                <Text style={{fontSize: 16, fontWeight: '700', color: constant.C_BLACK_0}}>Save</Text>
                            </TouchableOpacity>
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
    noticeview: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', height: 163, width: '100%', paddingTop: 40, paddingLeft: 25, paddingRight: 25, backgroundColor: constant.C_BLUE_50 },
    noticetxt: { flex: 1, marginLeft: 12, fontSize: 16, fontWeight: '700', color: constant.C_BLACK_0 },
    tr: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: constant.C_BLACK_20, height: 46, alignItems: 'center', paddingLeft: 8, paddingRight: 8 },
    body: { marginTop: -32, borderTopLeftRadius: 16, borderTopRightRadius: 16, backgroundColor: constant.C_BLACK_0, padding: 20 },
    savebtn : {height: 45, width: '100%', borderRadius: 5, backgroundColor : constant.C_BLUE_50, marginTop: 12}
});

