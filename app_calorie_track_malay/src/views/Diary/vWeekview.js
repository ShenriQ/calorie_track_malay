import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Input } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
//svgs
import Svg_lamp from '../../assets/svgs/diary/ic_lamp.svg';

export default class vWeekview extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            activeTab: 0,
            isModal: false,
        }
    }

    componentDidMount = () => {
    }

    tabbtns = [
        { name: 'kcal', color: constant.C_BLUE_50, title: 'Calories', unit: 'kcal' },
        { name: 'Pro', color: constant.C_RED_50, title: 'Protein', unit: 'g' },
        { name: 'Carbs', color: constant.C_TEAL_50, title: 'Carbs', unit: 'g' },
        { name: 'Sugar', color: constant.C_YELLOW_50, title: 'Sugar', unit: 'g' },
        { name: 'Fat', color: constant.C_BLUE_50, title: 'Fat', unit: 'g' },
        { name: 'Fibre', color: constant.C_RED_50, title: 'Fibre', unit: 'g' },
    ]
    days = ['18 Jan', '19 Jan', '20 Jan', '21 Jan', '22 Jan', '23 Jan', '24 Jan']
    info = [
        {
            Calories: { goal: 1300, food: 1000, exer: 100, left: 400 },
            Protein: { goal: 1300, food: 1000, exer: 100, left: 400 },
            Carbs: { goal: 1300, food: 1000, exer: 100, left: 400 },
            Sugar: { goal: 1300, food: 1000, exer: 100, left: 400 },
            Fat: { goal: 1300, food: 1000, exer: 100, left: 400 },
            Fibre: { goal: 1300, food: 1000, exer: 100, left: 400 },
        },
        {
            Calories: {},
            Protein: {},
            Carbs: {},
            Sugar: {},
            Fat: {},
            Fibre: {},
        },
        {
            Calories: {},
            Protein: {},
            Carbs: {},
            Sugar: {},
            Fat: {},
            Fibre: {},
        },
        {
            Calories: { goal: 1300, food: 1400, exer: 0, left: -100 },
            Protein: { goal: 1300, food: 1400, exer: 0, left: -100 },
            Carbs: { goal: 1300, food: 1400, exer: 0, left: -100 },
            Sugar: { goal: 1300, food: 1400, exer: 0, left: -100 },
            Fat: { goal: 1300, food: 1400, exer: 0, left: -100 },
            Fibre: { goal: 1300, food: 1400, exer: 0, left: -100 },
        },
        {
            Calories: {},
            Protein: {},
            Carbs: {},
            Sugar: {},
            Fat: {},
            Fibre: {},
        },
        {
            Calories: {},
            Protein: {},
            Carbs: {},
            Sugar: {},
            Fat: {},
            Fibre: {},
        },
        {
            Calories: {},
            Protein: {},
            Carbs: {},
            Sugar: {},
            Fat: {},
            Fibre: {},
        },
    ]

    _renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={[{ width: '100%', }, Gstyles.row_center]}>
                    <View style={[Gstyles.flex_1, { flexDirection: 'row', paddingLeft: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <Feather name="arrow-left" size={24} color={constant.C_BLACK_80} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titleTxt}>Week View</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <AntDesign name="close" size={24} color={constant.C_BLACK_80} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[{ width: '100%', marginTop: 8 }, Gstyles.row_center]}>
                    <TouchableOpacity onPress={() => { }}>
                        <Feather name="chevron-left" size={22} color={constant.C_BLACK_80} />
                    </TouchableOpacity>
                    <Text style={styles.weektxt}>18 - 24 January 2021</Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Feather name="chevron-right" size={22} color={constant.C_BLACK_80} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _renderBtnTabs = () => {
        return (
            <ScrollView horizontal={true} style={{ width: '100%', paddingTop: 8, paddingBottom: 8 }}>
                {
                    this.tabbtns.map((btn, index) =>
                        <TouchableOpacity onPress={() => this.setState({ activeTab: index })} key={index} style={[Gstyles.row_center, styles.tabbtn, {
                            backgroundColor: this.state.activeTab == index ? btn.color : constant.C_BLACK_0, borderColor: btn.color
                        }]}>
                            <Text style={[styles.tabbtntxt, { color: this.state.activeTab == index ? constant.C_BLACK_0 : btn.color }]}>{btn.name}</Text>
                        </TouchableOpacity>
                    )
                }
            </ScrollView>
        )
    }
    _renderTable = () => {
        return (
            <View style={{ width: '100%' }}>
                <View style={styles.tr}>
                    <View style={[styles.th, Gstyles.col_center]}>
                        <Text style={{ fontSize: 12, fontWeight: '700', color: constant.C_BLACK_50 }}>{this.tabbtns[this.state.activeTab].title}</Text>
                        <Text style={{ fontSize: 12, fontWeight: '700', color: constant.C_BLACK_50 }}>({this.tabbtns[this.state.activeTab].unit})</Text>
                    </View>
                    <View style={styles.th}>
                        <Text style={{ fontSize: 12, fontWeight: '700', color: constant.C_BLACK_100 }}>Goal</Text>
                    </View>
                    <View style={styles.th}>
                        <Text style={{ fontSize: 12, fontWeight: '700', color: constant.C_RED_50 }}>-Food</Text>
                    </View>
                    <View style={styles.th}>
                        <Text style={{ fontSize: 12, fontWeight: '700', color: constant.C_BLUE_50 }}>+Exer</Text>
                    </View>
                    <View style={styles.th}>
                        <Text style={{ fontSize: 12, fontWeight: '700', color: constant.C_BLACK_100 }}>=Left</Text>
                    </View>
                </View>
                {
                    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) =>
                        <View key={index} style={styles.tr}>
                            <View style={[styles.td, Gstyles.col_center, { backgroundColor: constant.C_BLUE_50 }]}>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: constant.C_BLACK_0 }}>{day}</Text>
                                <Text style={{ fontSize: 9, fontWeight: '400', color: constant.C_BLACK_0 }}>{this.days[index]}</Text>
                            </View>
                            <View style={styles.td}>
                                {this.info[index][this.tabbtns[this.state.activeTab].title].goal == null ?
                                    <Text style={{ fontSize: 10, fontWeight: '700', color: constant.C_BLACK_30 }}>1300</Text> :
                                    <Text style={{ fontSize: 10, fontWeight: '400', color: constant.C_BLACK_100 }}>
                                        {this.info[index][this.tabbtns[this.state.activeTab].title].goal}
                                    </Text>
                                }
                            </View>
                            <View style={styles.td}>
                                {this.info[index][this.tabbtns[this.state.activeTab].title].food == null ?
                                    <Text style={{ fontSize: 24, color: constant.C_BLACK_30 }}>-</Text> :
                                    <Text style={{ fontSize: 10, fontWeight: '400', color: constant.C_BLACK_100 }}>
                                        {this.info[index][this.tabbtns[this.state.activeTab].title].food}
                                    </Text>
                                }
                            </View>
                            <View style={styles.td}>
                                {this.info[index][this.tabbtns[this.state.activeTab].title].exer == null ?
                                    <Text style={{ fontSize: 24, color: constant.C_BLACK_30 }}>-</Text> :
                                    <Text style={{ fontSize: 10, fontWeight: '400', color: constant.C_BLACK_100 }}>
                                        {this.info[index][this.tabbtns[this.state.activeTab].title].exer}
                                    </Text>
                                }
                            </View>
                            <View style={styles.td}>
                                {this.info[index][this.tabbtns[this.state.activeTab].title].left == null ?
                                    <Text style={{ fontSize: 24, color: constant.C_BLACK_30 }}>-</Text> :
                                    <Text style={{ fontSize: 10, fontWeight: '400', color: constant.C_BLACK_100 }}>
                                        {this.info[index][this.tabbtns[this.state.activeTab].title].left}
                                    </Text>
                                }
                                {
                                    (this.info[index][this.tabbtns[this.state.activeTab].title].left != null &&
                                        this.info[index][this.tabbtns[this.state.activeTab].title].left < 0) &&
                                    <AntDesign name="closecircleo" size={16} color={constant.C_RED_50} style={{marginLeft: 4}}/>
                                }
                                {
                                    (this.info[index][this.tabbtns[this.state.activeTab].title].left != null &&
                                        this.info[index][this.tabbtns[this.state.activeTab].title].left >= 0) &&
                                        <AntDesign name="checkcircleo" size={16} color={'#39C6B8'} style={{marginLeft: 4}}/>
                                }
                            </View>
                        </View>
                    )
                }
                <View style={[styles.tr, { borderBottomColor: constant.C_BLACK_10, borderTopWidth: 2, borderTopColor: constant.C_BLACK_20 }]}>
                    <View style={[styles.th, Gstyles.col_center,]}>
                        <Text style={{ fontSize: 12, fontWeight: '700', color: constant.C_BLACK_50 }}>Total</Text>
                    </View>
                    <View style={styles.td}>
                    </View>
                    <View style={styles.td}>
                    </View>
                    <View style={styles.td}>
                    </View>
                    <View style={styles.td}>
                        <Text style={{ fontSize: 10, fontWeight: '400', color: constant.C_BLACK_100 }}>
                            300
                        </Text>
                        <AntDesign name="checkcircleo" size={16} color={'#39C6B8'} style={{marginLeft: 4}}/>
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
                        <View style={{ width: '100%', marginTop: 12, marginBottom: 8, paddingLeft: 20, paddingRight: 20 }}>
                            {this._renderBtnTabs()}
                            <View style={{ width: '100%', marginTop: 12, marginBottom: 8, padding: 8, backgroundColor: constant.C_BLACK_10 }}>
                                {this._renderTable()}
                            </View>
                        </View>
                        <View style={{ height: 20 }}></View>
                    </ScrollView>
                </View>
                <View style={[Gstyles.row_center, styles.noticeview]}>
                    <View></View>
                    <Svg_lamp width={40} height={40} />
                    <Text style={styles.noticetxt}>The figures for “future days” and “days without added food” are shaded in grey. They are not included in the Total.</Text>
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
        backgroundColor: constant.C_BLACK_0, width: '100%', height: 115, elevation: 6, paddingBottom: 8, justifyContent: 'flex-end', flexDirection: 'column',
    },
    formView: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%',
    },
    titleTxt: {
        textAlign: 'center', fontSize: 22, fontWeight: '700', color: constant.C_BLACK_80, marginLeft: 16, marginRight: 16
    },
    weektxt: { fontSize: 14, fontWeight: '700', color: constant.C_BLACK_100, marginLeft: 12, marginRight: 12 },
    tabbtn: { borderRadius: 6, borderWidth: 1, paddingTop: 6, paddingBottom: 6, paddingLeft: 12, paddingRight: 12, marginRight: 12 },
    tabbtntxt: { fontSize: 13, fontWeight: '700', },
    noticeview: { height: 98, width: '100%', paddingTop: 12, paddingBottom: 12, paddingLeft: 18, paddingRight: 18, backgroundColor: constant.C_BLUE_50 },
    noticetxt: { flex: 1, marginLeft: 12, fontSize: 13, fontWeight: '400', color: constant.C_BLACK_0 },
    tr: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: constant.C_BLACK_20 },
    th: { flex: 1, backgroundColor: constant.C_BLACK_0, height: 46, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
    td: { flex: 1, height: 48, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderLeftWidth: 1, borderLeftColor: constant.C_BLACK_20 },
});

