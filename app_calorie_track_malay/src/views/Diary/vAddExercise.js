import React, { useEffect, useState } from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, Animated, Platform, Dimensions, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ruler from '../../components/Global/Ruler';
// custom import
import { constant, Gstyles, lang } from '../../utils' //'@utils';
//svgs
import Svg_jumping from '../../assets/svgs/diary/ic_jumping.svg';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get('window').height

export default class vAddActivity extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            activeTab: 0,
            isModal: false,
            checkedFreqitems: [],
            filterModalY: new Animated.Value(-screenHeight),
            serv_item: {
                name: "",
                value: 20,
            },
        }
    }

    componentDidMount = () => {
    }

    exercise_items = [
        {
            id: '1',
            name: 'Skipping (Moderate)',
            qty: '60 minutes',
            cal: '600 Kcal',
            photo: <Svg_jumping width={60} height={60} />,
        },
    ]

    goAddFood = () => {
        this.props.navigation.navigate('add_food')
    }

    _renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={[{ width: '100%', }, Gstyles.row_center]}>
                    <View style={[Gstyles.flex_1, { flexDirection: 'row', paddingLeft: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <Feather name="arrow-left" size={24} color={constant.C_BLACK_80} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titleTxt}>Add Exercise</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <Feather name="check" size={24} color={constant.C_BLUE_50} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    _renderExcerciseItem = (data, index) => {
        return (
            <View key={index}>
                <View style={[Gstyles.row_center, styles.exeritem]} activeOpacity={0.8} onPress={() => { }}>
                    <View style={styles.row}>
                        {data.photo}
                    </View>
                    <View style={[Gstyles.flex_1, { paddingLeft: 8 }]}>
                        <Text style={styles.exeritem_title}>{data.name}</Text>
                        <Text style={styles.exeritem_cal_val}><Text style={[styles.exeritem_cal_val, { color: constant.C_BLUE_50 }]}>{data.cal}/ </Text>{data.qty}</Text>
                    </View>

                </View>
                {/* <View style={styles.border1} /> */}
            </View>

        )
    }

    onSetServ = (serv_item) => {
        this.setState({ serv_item: serv_item })
    }
    
    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                {this._renderHeader()}
                <View style={styles.formView} >
                    <ScrollView style={{ flex: 1, width: '100%' }} >
                        {
                            this.exercise_items.map((item, index) =>
                                this._renderExcerciseItem(item, index)
                            )
                        }
                        <View style={[{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end'}]}>
                            <Text style={[Gstyles.flex_1, {fontSize: 16, color: constant.C_BLACK_80, paddingBottom : 6 }]}>{10 * this.state.serv_item.value} kcal</Text>
                            <Text style={{fontSize: 34, color: constant.C_BLUE_50, fontWeight: '400'}}>{this.state.serv_item.value}</Text>
                            <Text style={{fontSize: 18, color: constant.C_BLUE_50, fontWeight: '400', paddingBottom : 6 }}> Minutes</Text>
                            <View style={Gstyles.flex_1}/>
                        </View>
                        <Ruler activeIndex = {1} items = {
                                    [
                                        {
                                            name: "",
                                            value: 10,
                                        },
                                        {
                                            name: "",
                                            value: 20,
                                        },
                                        {
                                            name: "",
                                            value: 30,
                                        },
                                        {
                                            name: "",
                                            value: 40,
                                        },
                                        {
                                            name: "",
                                            value: 50,
                                        },
                                        {
                                            name: "",
                                            value: 60,
                                        },
                                    ] }
                                onSelect={this.onSetServ} />
                        <View style={{ height: 25, }}></View>
                    </ScrollView>
                </View>
                <View style={[styles.btnview, Gstyles.col_center]}>
                    <TouchableOpacity activeOpacity={0.7}
                        style={[styles.trackbtn, Gstyles.col_center]}
                        onPress={() => { }}>
                        <Text style={[Gstyles.fs_16, { color: constant.C_BLACK_0, fontWeight: '700' }]} >Done</Text>
                    </TouchableOpacity>
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
        backgroundColor: constant.C_BLACK_0, width: '100%', height: 80, elevation: 4, paddingBottom: 8, alignItems: 'flex-end', flexDirection: 'row',
    },
    titleTxt: {
        textAlign: 'center', fontSize: 22, fontWeight: '700', color: constant.C_BLACK_80, marginLeft: 16, marginRight: 16
    },
    fs_12: { fontSize: 12 },
    headerTab: { height: 56, width: '100%', paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10, elevation: 4, backgroundColor: constant.C_BLACK_0, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' },
    headerTabBtn: { height: '100%', flex: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    activeTabBtn: { backgroundColor: constant.C_BLUE_50 },
    searchBar: { height: 40, width: '100%', elevation: 4, paddingLeft: 16, backgroundColor: constant.C_BLACK_0, borderBottomWidth: 0, borderRadius: 23 },
    formView: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', paddingTop: 10,
        paddingLeft: 25, paddingRight: 25,
    },
    inputContainer: { height: 40, paddingLeft: 10, backgroundColor: constant.Color_InputBg, borderBottomWidth: 0, borderRadius: 8 },
    view100: { width: '100%', paddingLeft: 20, paddingRight: 20 },
    notiview: { width: '100%', backgroundColor: '#F0F4FF', borderRadius: 10, paddingTop: 6, paddingBottom: 6, marginTop: 16, },
    btnview: { height: 76, width: '100%', paddingLeft: 24, paddingRight: 24, },
    trackbtn: { width: '100%', height: 45, borderRadius: 10, backgroundColor: constant.C_BLUE_50 },
    exeritem: { paddingTop: 16, paddingBottom: 16 },
    exeritem_cal_val: { fontSize: 14, fontWeight: '400', color: constant.C_BLACK_70, marginRight: 6 },
    exeritem_title: { color: constant.C_BLACK_80, fontSize: 16, fontWeight: '500', },
    exeritem_qty: { color: constant.C_BLUE_50, fontSize: 14, fontWeight: '400', marginTop: 8, },
    exeritem_img: { width: 60, height: 60, resizeMode: 'cover', borderRadius: 16, borderWidth: 2, borderColor: '#F0F4FF' },
    border1: { height: 1, backgroundColor: '#E5E5E5', width: '100%' },
    newexercisebtn: { paddingTop: 6, paddingBottom: 6, paddingLeft: 20, paddingRight: 20, borderRadius: 40, borderWidth: 1, borderColor: constant.C_BLUE_50 },
    topmodal: {
        height: screenHeight,
        width: screenWidth,
        zIndex: 100000,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#00000055',
        justifyContent: 'flex-start',
        elevation: 2,
    },
    chooseModalContent: { width: '100%', elevation: 2, backgroundColor: constant.C_BLACK_0, borderBottomRightRadius: 12, borderBottomLeftRadius: 12, paddingBottom: 12, },
    chooseModalBtn: { height: 55, borderTopColor: constant.C_BLACK_40, borderTopWidth: 1, paddingLeft: 20, paddingRight: 20 },
    searchBtn: { padding: 8, backgroundColor: constant.C_BLUE_50, borderRadius: 10 },
});

