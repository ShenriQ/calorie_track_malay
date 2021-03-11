import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dimensions } from "react-native";
import { width, height } from 'react-native-dimension';
import { Button, Input } from 'react-native-elements';
import { Modal, ModalContent, BottomModal, ModalTitle, } from 'react-native-modals';
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import { user_helper, profile_helper } from '@helper';
import Spacing from '../../components/Global/Spacing';
import AboutModal from '../../components/Modals/About';
import SignoutModal from '../../components/Modals/SignOut';
import LineChart from '../../components/Progress/LineChart';
import Weight_svg from '../../assets/svgs/ic_weight.svg';
import Hip_svg from '../../assets/svgs/ic_hip.svg';
import Thigh_svg from '../../assets/svgs/ic_thigh.svg';
import Waist_svg from '../../assets/svgs/ic_waist.svg';
import Bodyfat_svg from '../../assets/svgs/ic_bodyfat.svg';
import Archiv_svg1 from '../../assets/svgs/ic_achiev1.svg';
import Archiv_svg2 from '../../assets/svgs/ic_achiev2.svg';
import Archiv_svg3 from '../../assets/svgs/ic_achiev3.svg';
import Archiv_svg4 from '../../assets/svgs/ic_achiev4.svg';
import Archiv_svg5 from '../../assets/svgs/ic_achiev5.svg';
import Archiv_svg6 from '../../assets/svgs/ic_achiev6.svg';
import Archiv_svg7 from '../../assets/svgs/ic_achiev7.svg';

const screenWidth = Dimensions.get("window").width;

export default class vProgress extends React.Component {
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

    shoppingList = [{ name: 'Fish' }, { name: 'Chicken' }, { name: 'Potatoes' }, { name: 'Olives' }, { name: 'Bread' },]
    optionbtnList = [{
        name: 'Weight',
        photo: <Weight_svg width={24} height={24} />,
        color: constant.C_BLUE_50
    },
    {
        name: 'Body fat',
        photo: <Bodyfat_svg width={24} height={24} />,
        color: constant.C_RED_50
    },
    {
        name: 'Thigh',
        photo: <Thigh_svg width={24} height={24} />,
        color: constant.C_TEAL_50
    },
    ]
    foodList = [{
        name: 'Waist',
        photo: <Waist_svg width={24} height={24} />,
        color: constant.C_YELLOW_50
    },
    {
        name: 'Hip',
        photo: <Hip_svg width={24} height={24} />,
        color: constant.C_BLUE_50
    },
    ]

    goAddFood = () => {
        this.props.navigation.navigate('add_food')
    }

    _renderHeader = () => {
        return (
            <View style={[Gstyles.row_center, Gstyles.w_100, styles.header]}>
                <TouchableOpacity onPress={() => this.setState({ isEdit: !this.state.isEdit })}>
                    <Text style={[Gstyles.fs_16, { color: constant.C_BLACK_0 }]}>Edit</Text>
                </TouchableOpacity>
                <Text style={[styles.titleTxt, Gstyles.flex_1]}>Weight</Text>
                <View style={{ width: 24 }} />
            </View>
        )
    }
    _renderOptionBtn = (data) => {
        return (
            <TouchableOpacity style={[styles.optionbtn, Gstyles.row_center]} onPress={() => this.setState({})}>
                {data.photo}
                <Text style={[Gstyles.fs_14, { color: data.color, fontWeight: '700', marginLeft: 8, }]}>{data.name}</Text>
            </TouchableOpacity>
        )
    }
    _renderGraph = () => {
        return (
            <View style={{ padding: 4, width: '100%', borderRadius : 10, height: 258, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <LineChart width={screenWidth - 44} />
            </View>
        )
    }
    _renderBoards = () => {
        const data = [{ 'name': 'Lost so far', value: '3 kg', color: constant.C_RED_50 }, { 'name': 'Now', value: '75 kg', color: constant.C_TEAL_50 },
        { 'name': 'Left to loose', value: '5 kg', color: constant.C_YELLOW_50 }, { 'name': 'Goal', value: '70 kg', color: constant.C_BLUE_50 },]
        return (
            <View style={[{ flex: 1, }, Gstyles.col_center]}>
                <View style={[{ width: '100%', }, Gstyles.row_center]}>
                    {
                        data.slice(0, 2).map((item, index) =>
                            <View key={index} style={[styles.bgBoardItem,]}>
                                <TouchableOpacity key={index} activeOpacity={0.85} style={[{ flex: 1, flexDirection: 'column', borderRadius: 8, padding: 8, backgroundColor: item.color }]} >
                                    <Text style={[styles.boardTxt,]}>{item.name}</Text>
                                    <Text style={[styles.boardvalTxt, Gstyles.text_center, { marginBottom: 16 }]}>{item.value}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </View>
                <View style={[{ width: '100%', }, Gstyles.row_center]}>
                    {
                        data.slice(2, 4).map((item, index) =>
                            <View key={index} style={[styles.bgBoardItem,]}>
                                <TouchableOpacity key={index} activeOpacity={0.85} style={[{ flex: 1, flexDirection: 'column', borderRadius: 8, padding: 8, backgroundColor: item.color }]} >
                                    <Text style={[styles.boardTxt,]}>{item.name}</Text>
                                    <Text style={[styles.boardvalTxt, Gstyles.text_center, { marginBottom: 16 }]}>{item.value}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </View>
            </View>
        )
    }

    _renderMilestones = () => {
        const data = [{ icon: Archiv_svg1, }, { icon: Archiv_svg2, }, { icon: Archiv_svg3, }, { icon: Archiv_svg4, }, { icon: Archiv_svg5, }, { icon: Archiv_svg6, }, { icon: Archiv_svg7, },]
        return (
            <View style={[Gstyles.col_center, Gstyles.w_100, { padding: 8, marginTop: 12 }]}>
                <Text style={[styles.categoryText, Gstyles.w_100]}>Milestones earned</Text>
                <View style={[Gstyles.row_center_start, Gstyles.w_100, { flexWrap: 'wrap', marginTop: 12 }]}>
                    {
                        data.map((item, index) =>
                            <TouchableOpacity key={index} activeOpacity={0.6} style={{ padding: 6 }} >
                                <item.icon width={48} height={48} />
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
        )
    }

    _renderTable = () => {
        const data = [{ date: '2 March 2021', weight: '72 kg' }, { date: '28 December 2020', weight: '72 kg' }, { date: '3 Feburary 2021', weight: '73 kg' },
        { date: '7 December 2020', weight: '74 kg' }, { date: '31 November 2020', weight: '75 kg' },]
        return (
            <View style={styles.table}>
                <View style={styles.tr}>
                    <View style={styles.th}>
                        <Text style={styles.th_txt}>Date</Text>
                    </View>
                    <View style={styles.th}>
                        <Text style={styles.th_txt}>Weight</Text>
                    </View>
                </View>
                {
                    data.map((item, index) =>
                        <View key={index} style={styles.tr}>
                            <View style={styles.td}>
                                <Text style={styles.td_txt}>{item.date}</Text>
                            </View>
                            <View style={styles.td}>
                                <Text style={styles.td_txt}>{item.weight}</Text>
                            </View>
                        </View>
                    )
                }
            </View>
        )
    }

    _renderSearchItem = (data, index) => {
        return (
            <View key={index} style={[styles.setting_item, Gstyles.col_center]} >
                <View style={[Gstyles.row_center, { height: 48, width: width(95), paddingLeft: 14, paddingRight: 14 }]}>
                    <Image source={data.photo} style={{ width: 42, height: 42, borderRadius: 5 }} />
                    <Text style={[Gstyles.flex_1, { color: constant.C_BLACK_100, width: '100%', fontSize: 18, fontWeight: '700', paddingLeft: 12 }]}>{data.name}</Text>
                    <TouchableOpacity >
                        <Feather name="plus-circle" size={28} color={constant.C_BLUE_50} />
                    </TouchableOpacity>
                </View>
                <View style={styles.border1} />
            </View>
        )
    }

    _renderSearchModal = () => {
        return (
            <BottomModal
                visible={this.state.isShowSearchModal}
                onTouchOutside={() => this.setState({ isShowSearchModal: false })}
                height={0.46}
                width={1}
                onSwipeOut={() => this.setState({ isShowSearchModal: false })}
                modalTitle={
                    <View style={[Gstyles.w_100,]} >
                        <View style={[Gstyles.row_center, Gstyles.w_100, styles.modalTitleBar, { paddingLeft: 20, paddingRight: 20 }]}>
                            <TouchableOpacity onPress={() => this.setState({ isShowSearchModal: false })}>
                                <Ionicons name="close" size={28} color={constant.C_BLACK_100} />
                            </TouchableOpacity>
                            <Text style={[styles.modalTitleTxt, Gstyles.flex_1]}>Search Food</Text>
                            <View style={{ width: 26 }} />
                        </View>
                        <View style={styles.border1} />
                    </View>
                }
            >
                <View
                    style={[{ flex: 1, backgroundColor: constant.C_BLACK_0, }, Gstyles.col_center]}
                >
                    <Input
                        placeholder={Strings["What do you want to search?"]} placeholderTextColor={constant.C_BLACK_50}
                        onChangeText={value => this.setState({ pass: value })} errorMessage={this.state.err_pass}
                        inputStyle={{ color: constant.C_BLACK_80, fontSize: 14 }}
                        leftIcon={<Feather name="search" size={18} color={constant.C_BLACK_50} />}
                        inputContainerStyle={styles.searchBar}
                        containerStyle={styles.searchWrap}
                    />
                    <View style={[Gstyles.row_center, { width: width(95), justifyContent: 'space-between', paddingLeft: 14, paddingRight: 14, marginTop: 12, marginBottom: 8 }]}>
                        <TouchableOpacity activeOpacity={0.7} style={[styles.searchBarBtn, Gstyles.col_center, { backgroundColor: constant.C_BLUE_50 }]}>
                            <Text style={[styles.btnTxt, { color: constant.C_BLACK_0, }]}>Frquent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={[styles.searchBarBtn, Gstyles.col_center, { backgroundColor: constant.C_BLACK_0, borderWidth: 1, borderColor: constant.C_RED_50 }]}>
                            <Text style={[styles.btnTxt, { color: constant.C_RED_50, }]}>My Meals</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={[styles.searchBarBtn, Gstyles.col_center, { backgroundColor: constant.C_BLACK_0, borderWidth: 1, borderColor: constant.C_TEAL_50 }]}>
                            <Text style={[styles.btnTxt, { color: constant.C_TEAL_50, }]}>My Foods</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.border1, { width: width(100) }]} />
                    <View style={[{ width: width(100), flex: 1, }, Gstyles.col_center]}>
                        <ScrollView style={{ width: width(100), flex: 1, }} >
                            {
                                this.foodList.map((item, index) =>
                                    this._renderSearchItem(item, index)
                                )
                            }
                        </ScrollView>
                        <View style={[{ width: '80%', },]}>
                            <TouchableOpacity activeOpacity={0.7} style={[styles.modal_addlist_btn, Gstyles.col_center, { marginTop: 12, marginBottom: 12 }]}>
                                <Text style={[{ color: constant.C_BLACK_0, fontSize: 18, fontWeight: '700' }]}>Add to shopping list (0)</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BottomModal>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                {this._renderHeader()}
                <View style={styles.formView} >
                    <View style={[styles.optionbtn_view,]}>
                        {this._renderOptionBtn(this.optionbtnList[0])}
                    </View>
                    <ScrollView style={{ width: '100%', flex: 1, }} >
                        <View style={{ width: '100%', flex: 1, }}>
                            <View style={styles.roundBg}>

                            </View>
                            <View style={styles.content}>
                                {this._renderGraph()}
                                <View style={[styles.optionbtn_view, Gstyles.col_center]}>
                                    <TouchableOpacity style={[styles.optionbtn, Gstyles.row_center]} onPress={() => this.setState({ isShowSearchModal: true })}>
                                        <Text style={[Gstyles.fs_16, { color: constant.C_BLUE_50, marginRight: 8, fontWeight: '700' }]}>Weigh in</Text>
                                        <Feather name="plus-circle" size={20} color={constant.C_BLUE_50} />
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.dataview, Gstyles.col_center]}>
                                    {this._renderBoards()}
                                    {this._renderMilestones()}
                                    {this._renderTable()}
                                    <Spacing height={60} />
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                </View>
                {this._renderSearchModal()}
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
        paddingRight: 24, paddingTop: 30, borderBottomColor: '#ffffff77', borderBottomWidth: 1,
    },
    formView: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%',
    },
    titleTxt: { fontSize: 18, fontWeight: '700', color: constant.C_BLACK_0, textAlign: 'center' },
    setting_item: { flexDirection: 'column', height: 50, },
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

    optionbtn_view: { width: '100%', padding: 12, alignItems: 'flex-end', backgroundColor: constant.C_BLUE_50 },
    optionbtn: { backgroundColor: constant.C_BLACK_0, borderRadius: 5, paddingTop: 6, paddingBottom: 6, paddingLeft: 8, paddingRight: 8, },
    roundBg: { height: 500, width: '100%', backgroundColor: constant.C_BLUE_50, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 },
    content: { width: '100%', padding: 18, marginTop: -500 },
    test: { height: 300, width: 100, backgroundColor: constant.C_BLACK_80, },
    dataview: { flex: 1, flexDirection: 'column', backgroundColor: constant.C_BLACK_0, elevation: 3, padding: 8, margin: 8, marginBottom: -30, borderRadius: 12, },
    bgBoardItem: { flex: 1, flexDirection: 'row', borderRadius: 5, padding: 8, },
    boardTxt: { fontSize: 12, fontWeight: '700', color: constant.C_BLACK_0 },
    boardvalTxt: { fontSize: 36, fontWeight: '700', color: constant.C_BLACK_0 },
    categoryText: { fontSize: 14, fontWeight: '700', color: constant.C_BLACK_100 },
    table: {
        backgroundColor: constant.C_BLACK_0, borderWidth: 1, borderColor: constant.C_BLACK_20, width: '100%'
    },
    th: { height: '100%', flex: 1, backgroundColor: constant.C_BLUE_40, borderWidth: 1, borderColor: constant.C_BLUE_40, justifyContent: 'center', alignItems: 'center' },
    th_txt: { color: constant.C_BLACK_0, fontSize: 12, fontWeight: '700' },
    tr: { height: 36, flex: 1, flexDirection: 'row' },
    td: { height: '100%', flex: 1, borderWidth: 1, borderColor: constant.C_BLACK_20, justifyContent: 'center', alignItems: 'center' },
    td_txt: { color: constant.C_BLACK_90, fontSize: 12, fontWeight: '500' },
    td_odd: { backgroundColor: constant.C_BLUE_5 },
});

