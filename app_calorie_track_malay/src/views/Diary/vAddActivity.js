import React, { useEffect, useState } from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, Animated, Platform, Dimensions, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Input } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';
// custom import
import { icons, tmp_imgs } from '@assets';
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
            photo: <Svg_jumping width={60} height={60}/>,
        },
        {
            id: '2',
            name: 'Skipping (Intense)',
            qty: '60 minutes',
            cal: '880 Kcal',
            photo: <Svg_jumping width={60} height={60}/>,
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
                    <Text style={styles.titleTxt}>Exercise</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>

                    </View>
                </View>
            </View>
        )
    }

    _renderSearchBar = () => {
        return (
            <View style={[{ width: '100%', height: 45, marginTop: 16, marginBottom: 16 }, Gstyles.row_center]}>
                <View style={[Gstyles.flex_1, Gstyles.col_center, { paddingLeft: 4, paddingRight: 4 }]}>
                    <Input
                        placeholder='What do you want to search?' placeholderTextColor={constant.C_BLACK_50}
                        onChangeText={value => this.setState({ pass: value })} errorMessage={this.state.err_pass}
                        inputStyle={{ color: constant.C_BLACK_80, fontSize: 14 }}
                        leftIcon={<Feather name="search" size={18} color={constant.C_BLACK_50} />}
                        inputContainerStyle={styles.searchBar}
                        containerStyle={{ height: 40, width: '100%', }}
                    />
                </View>
                <View style={[Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                    <TouchableOpacity onPress={() => { }} style={styles.searchBtn}>
                        <Feather name="search" size={20} color={constant.C_BLACK_0} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _renderExcerciseItem = (data, index) => {
        const isChecked = () => {
            return this.state.checkedFreqitems.filter(item => item.id == data.id).length > 0
        }
        const onClick = () => {
            let tmps = this.state.checkedFreqitems.slice(0, this.state.checkedFreqitems.length)
            let found_index = tmps.findIndex(item => item.id == data.id)
            if (found_index == -1) {
                tmps.push(data)
            }
            else {
                tmps.splice(found_index, 1)
            }
            this.setState({
                checkedFreqitems: tmps
            })
            // this.props.navigation.navigate('diary_addfood')
        }
        const onAddExercise=()=>{
            this.props.navigation.navigate('diary_addexercise')
        }
        return (
            <View key={index}>
                <TouchableOpacity style={[Gstyles.row_center, styles.exeritem]} activeOpacity={0.8} onPress={() => onAddExercise()}>
                    <View style={styles.row}>
                        {data.photo}
                    </View>
                    <View style={[Gstyles.flex_1, { paddingLeft: 8 }]}>
                        <Text style={styles.exeritem_title}>{data.name}</Text>
                        <Text style={styles.exeritem_cal_val}><Text style={[styles.exeritem_cal_val, {color: constant.C_BLUE_50}]}>{data.cal}/ </Text>{data.qty}</Text>
                    </View>
                    <View style={[Gstyles.row_center]}>
                        {
                            isChecked() == false ?
                                <TouchableOpacity onPress={() => onClick()}>
                                    <AntDesign name="pluscircleo" size={20} color={constant.C_BLUE_50} />
                                </TouchableOpacity>
                                : <TouchableOpacity onPress={() => onClick()}>
                                    <AntDesign name="checkcircle" size={20} color={constant.C_BLUE_50} />
                                </TouchableOpacity>
                        }
                    </View>
                </TouchableOpacity>
                {/* <View style={styles.border1} /> */}
            </View>

        )
    }

    _renderChooseModal = () => {
        const goPage = (page) => {
            this.props.navigation.navigate(page)
        }
        return (
            <Animated.View
                style={[
                    styles.topmodal,
                    {
                        transform: [
                            { translateY: this.state.filterModalY }
                        ],
                        elevation: 4
                    }
                ]}
            >
                <View style={[styles.chooseModalContent, Gstyles.w_100]}>
                    <View style={[Gstyles.row_center, Gstyles.w_100, styles.header, { paddingRight: 16 }]}>
                        <View style={{ width: 24 }} />
                        <Text style={[styles.titleTxt, Gstyles.flex_1]}>Add {this.state.mealtype} </Text>
                        <TouchableOpacity onPress={() => { this.closeFilterModal() }}>
                            <AntDesign name="close" size={24} color={constant.C_BLACK_50} />
                        </TouchableOpacity>
                    </View>
                    <View style={[Gstyles.col_center, { paddingLeft: 0, paddingRight: 0 }]}>
                        <TouchableOpacity style={[Gstyles.row_center, Gstyles.w_100, styles.chooseModalBtn,]} onPress={() => goPage('diary_quickadd')}>
                            <Text style={[Gstyles.text_left, { fontSize: 14, fontWeight: '400', }]}>Quick Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[Gstyles.row_center, Gstyles.w_100, styles.chooseModalBtn,]} onPress={() => goPage('diary_createmeal')}>
                            <Text style={[Gstyles.text_left, { fontSize: 14, fontWeight: '400', }]}>Create a meal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[Gstyles.row_center, Gstyles.w_100, styles.chooseModalBtn,]} onPress={() => goPage('diary_createfood')}>
                            <Text style={[Gstyles.text_left, { fontSize: 14, fontWeight: '400', }]}>Create a food</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        )
    }

    openFilterModal = () => {
        Animated.timing(this.state.filterModalY, {
            duration: 100,
            toValue: 0,
            useNativeDriver: true
        }).start();
    }

    closeFilterModal = () => {
        Animated.timing(this.state.filterModalY, {
            duration: 100,
            toValue: -screenHeight,
            useNativeDriver: true
        }).start();
    }

    createnew=()=>{
        this.props.navigation.navigate('diary_newexercise')
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                {this._renderHeader()}
                {this._renderSearchBar()}
                <View style={styles.view100}>
                    <View style={styles.headerTab}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={[styles.headerTabBtn, this.state.activeTab == 0 ? styles.activeTabBtn : {}]}
                            onPress={() => this.setState({ activeTab: 0 })}>
                            <Text style={[styles.fs_14, { color: this.state.activeTab == 0 ? constant.C_BLACK_0 : constant.C_BLACK_60 }]}>Frequent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={[styles.headerTabBtn, this.state.activeTab == 1 ? styles.activeTabBtn : {}]}
                            onPress={() => this.setState({ activeTab: 1 })}>
                            <Text style={[styles.fs_14, { color: this.state.activeTab == 1 ? constant.C_BLACK_0 : constant.C_BLACK_60 }]} >My exercise</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.formView} >
                    <ScrollView style={{ flex: 1, width: '100%' }} >
                        {
                            this.state.activeTab == 0 ?
                                this.exercise_items.map((item, index) =>
                                    this._renderExcerciseItem(item, index)
                                ) :
                                [].map((item, index) =>
                                    this._renderExcerciseItem(item, index)
                                )
                        }
                        <View style={[Gstyles.row_center, { paddingTop: 20 }]}>
                            <TouchableOpacity activeOpacity={0.7}
                                style={[styles.newexercisebtn, Gstyles.row_center]}
                                onPress={() => this.createnew()}>
                                <Text style={[Gstyles.fs_14, { color: constant.C_BLUE_50, fontWeight: '700', marginRight: 6 }]} >Create a new exercise</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 25, }}></View>
                    </ScrollView>
                </View>
                <View style={[styles.btnview, Gstyles.col_center]}>
                    <TouchableOpacity activeOpacity={0.7}
                        style={[styles.trackbtn, Gstyles.col_center]}
                        onPress={() => { }}>
                        <Text style={[Gstyles.fs_16, { color: constant.C_BLACK_0, fontWeight: '700' }]} >Add (0)</Text>
                    </TouchableOpacity>
                </View>
                {
                    this._renderChooseModal()
                }
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

