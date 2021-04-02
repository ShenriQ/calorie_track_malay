import React, { useEffect, useState } from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, Animated, Platform, Dimensions,} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Input } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, Gstyles, lang } from '../../utils' //'@utils';
//svgs
import Svg_mealplan from '../../assets/svgs/diary/ic_mealplan.svg';
import Svg_scancode from '../../assets/svgs/diary/ic_scanbarcode.svg';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get('window').height

export default class vAddMeal extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            mealtype: this.props.route.params.mealtype,
            activeTab: 0,
            isModal: false,
            checkedFreqitems: [],
            filterModalY: new Animated.Value(-screenHeight),
        }
    }

    componentDidMount = () => {
    }

    food_items = [
        {
            id: '1',
            name: 'Apple',
            qty: '1.0 small',
            cal: '48 kcal',
            photo: require('../../assets/imgs/tmp/food3.png'),
        },
        {
            id: '2',
            name: 'Eggs (boiled)',
            qty: '2.0 small',
            cal: '157 kcal',
            photo: require('../../assets/imgs/tmp/food4.png'),
        },
        {
            id: '3',
            name: 'Low-fat milk',
            qty: '2.0 small',
            cal: '108 kcal',
            photo: require('../../assets/imgs/tmp/food5.png'),
        },
    ]

    goPage = (page_name) => {
        this.props.navigation.navigate(page_name)
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
                    <Text style={styles.titleTxt}>{this.state.mealtype}</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                        <TouchableOpacity onPress={() => { this.openFilterModal() }}>
                            <Feather name="plus" size={24} color={constant.C_BLUE_50} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    _renderSearchBar = () => {
        return (
            <View style={[{ width: '100%', height: 45, marginTop: 16, marginBottom: 16 }, Gstyles.row_center]}>
                <View style={[{ flexDirection: 'row', paddingLeft: 20 }]}>
                    <TouchableOpacity onPress={() => this.goPage('diary_weeklymealplan')}>
                        <Svg_mealplan width={40} height={40} />
                    </TouchableOpacity>
                </View>
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
                    <TouchableOpacity onPress={() => this.goPage('diary_scanbarcode')}>
                        <Svg_scancode width={40} height={40} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _renderFoodItem1 = (data, index) => {
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
        }
        return (
            <View key={index}>
                <View style={[Gstyles.row_center, styles.fooditem]} activeOpacity={0.8} onPress={() => { }}>
                    <View style={[Gstyles.flex_1]}>
                        <Text style={styles.fooditem_title}>{data.name}</Text>
                        <Text style={styles.fooditem_qty}>{data.qty}</Text>
                    </View>
                    <View style={[Gstyles.row_center]}>
                        <Text style={styles.fooditem_cal_val}>{data.cal}</Text>
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
                </View>
                <View style={styles.border1} />
            </View>

        )
    }

    _renderFoodItem2 = (data, index) => {
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
            this.props.navigation.navigate('diary_addfood')
        }
        return (
            <View key={index}>
                <View style={[Gstyles.row_center, styles.fooditem]} activeOpacity={0.8} onPress={() => { }}>
                    <View style={styles.row}>
                        <Image source={data.photo} style={styles.fooditem_img} />
                    </View>
                    <View style={[Gstyles.flex_1, { paddingLeft: 8 }]}>
                        <Text style={styles.fooditem_title}>{data.name}</Text>
                    </View>
                    <View style={[Gstyles.row_center]}>
                        <Text style={styles.fooditem_cal_val}>{data.cal}</Text>
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
                </View>
                <View style={styles.border1} />
            </View>

        )
    }

    _renderChooseModal = () => {
        const goPage=(page)=>{
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
                    <View style={[Gstyles.row_center, Gstyles.w_100, styles.header, {paddingRight: 16}]}>
                        <View style={{width:24}}/>
                        <Text style={[styles.titleTxt, Gstyles.flex_1]}>Add {this.state.mealtype} </Text>
                        <TouchableOpacity onPress={() => { this.closeFilterModal() }}>
                            <AntDesign name="close" size={24} color={constant.C_BLACK_50} />
                        </TouchableOpacity>
                    </View>
                    <View style={[Gstyles.col_center, { paddingLeft: 0, paddingRight: 0 }]}>
                        <TouchableOpacity style={[Gstyles.row_center, Gstyles.w_100, styles.chooseModalBtn, ]} onPress={() => goPage('diary_quickadd')}>
                            <Text style={[Gstyles.text_left, {fontSize: 14, fontWeight:'400', }]}>Quick Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[Gstyles.row_center, Gstyles.w_100, styles.chooseModalBtn, ]} 
                            onPress={() => {
                                this.props.navigation.navigate('diary_createmeal', {pagetype : 'Create'})
                            }}>
                            <Text style={[Gstyles.text_left, {fontSize: 14, fontWeight:'400', }]}>Create a meal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[Gstyles.row_center, Gstyles.w_100, styles.chooseModalBtn, ]} onPress={() => goPage('diary_createfood')}>
                            <Text style={[Gstyles.text_left, {fontSize: 14, fontWeight:'400', }]}>Create a food</Text>
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
                            <Text style={[styles.fs_12, { color: this.state.activeTab == 0 ? constant.C_BLACK_0 : constant.C_BLACK_60 }]}>Frequent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={[styles.headerTabBtn, this.state.activeTab == 1 ? styles.activeTabBtn : {}]}
                            onPress={() => this.setState({ activeTab: 1 })}>
                            <Text style={[styles.fs_12, { color: this.state.activeTab == 1 ? constant.C_BLACK_0 : constant.C_BLACK_60 }]} >My Meals</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={[styles.headerTabBtn, this.state.activeTab == 2 ? styles.activeTabBtn : {}]}
                            onPress={() => this.setState({ activeTab: 2 })}>
                            <Text style={[styles.fs_12, { color: this.state.activeTab == 2 ? constant.C_BLACK_0 : constant.C_BLACK_60 }]} >My Foods</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.notiview, Gstyles.col_center,]}>
                        <Text style={{ fontSize: 14, fontWeight: '500' }}>You have <Text style={{ fontSize: 15, fontWeight: '700', color: constant.C_RED_50 }}>1000 kcal</Text> left today.
                        </Text>
                    </View>
                </View>
                <View style={styles.formView} >
                    <ScrollView style={{ flex: 1, width: '100%' }} >
                        {
                            this.state.activeTab == 1 ?
                                this.food_items.map((item, index) =>
                                    this._renderFoodItem2(item, index)
                                ) :
                                this.food_items.map((item, index) =>
                                    this._renderFoodItem1(item, index)
                                )
                        }
                        {
                            this.state.activeTab == 1 &&
                            <View style={[Gstyles.row_center, { paddingTop: 20 }]}>
                                <TouchableOpacity activeOpacity={0.7}
                                    style={[styles.discovermealsbtn, Gstyles.row_center]}
                                    onPress={() => { }}>
                                    <Text style={[Gstyles.fs_18, { color: constant.C_BLUE_50, fontWeight: '400', marginRight: 6 }]} >Discover meals</Text>
                                    <AntDesign name="pluscircleo" size={20} color={constant.C_BLUE_50} />
                                </TouchableOpacity>
                            </View>
                        }
                        <View style={{ height: 25, }}></View>
                    </ScrollView>
                </View>
                <View style={[styles.btnview, Gstyles.col_center]}>
                    <TouchableOpacity activeOpacity={0.7}
                        style={[styles.trackbtn, Gstyles.col_center]}
                        onPress={() => { }}>
                        <Text style={[Gstyles.fs_16, { color: constant.C_BLACK_0, fontWeight: '700' }]} >Track food (3)</Text>
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
        backgroundColor: constant.C_BLACK_0, width: '100%', height: 80, paddingBottom: 8, alignItems: 'flex-end', flexDirection: 'row',
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
    btnview: { height: 76, width: '100%', paddingLeft: 24, paddingRight: 24, borderTopWidth: 2, borderTopColor: constant.C_BLACK_20, },
    trackbtn: { width: '100%', height: 45, borderRadius: 10, backgroundColor: constant.C_BLUE_80 },
    fooditem: { paddingTop: 16, paddingBottom: 16 },
    fooditem_cal_val: { fontSize: 14, fontWeight: '400', color: constant.C_BLACK_70, marginRight: 6 },
    fooditem_title: { color: constant.C_BLACK_80, fontSize: 16, fontWeight: '500', },
    fooditem_qty: { color: constant.C_BLUE_50, fontSize: 14, fontWeight: '400', marginTop: 8, },
    fooditem_img: { width: 60, height: 60, resizeMode: 'cover', borderRadius: 16, borderWidth: 2, borderColor: '#F0F4FF' },
    border1: { height: 1, backgroundColor: '#E5E5E5', width: '100%' },
    discovermealsbtn: { paddingTop: 6, paddingBottom: 6, paddingLeft: 16, paddingRight: 16, borderRadius: 40, borderWidth: 1, borderColor: constant.C_BLUE_50 },
    topmodal: {
        height: screenHeight,
        width: screenWidth,
        zIndex : 100000,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#00000055',
        justifyContent: 'flex-start',
        elevation:2, 
    },
    chooseModalContent: {width: '100%', elevation:2, backgroundColor: constant.C_BLACK_0, borderBottomRightRadius: 12, borderBottomLeftRadius: 12, paddingBottom  :12, },
    chooseModalBtn : {height : 55, borderTopColor: constant.C_BLACK_40, borderTopWidth: 1, paddingLeft : 20, paddingRight : 20 },
});

