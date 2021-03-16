import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, Animated, Platform, Dimensions, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { width, height } from 'react-native-dimension';
import { Button, Input, CheckBox } from 'react-native-elements';
import { Modal, ModalContent, BottomModal, ModalTitle, } from 'react-native-modals';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import { user_helper, profile_helper } from '@helper';
import Spacing from '../../components/Global/Spacing';
import AboutModal from '../../components/Modals/About';
import SignoutModal from '../../components/Modals/SignOut';
import LineChart from '../../components/Progress/LineChart';
//svgs
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
import Light_svg from '../../assets/svgs/ic_light.svg';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get('window').height

export default class vProgress extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            isEdit: false,
            isShowSearchModal: false,
            pageId: 'Weight',
            date: new Date(),
            editModalY: new Animated.Value(-screenHeight),
            chooseModalY: new Animated.Value(-screenHeight),
        }
    }

    componentDidMount = () => {
    }

    pages = {
        Weight: {
            name: 'Weight',
            photo: (size) => <Weight_svg width={size} height={size} />,
            color: constant.C_BLUE_50,
            addbtn_name: 'Weigh in',
            entries: [{ date: '2 March 2021', weight: '72 kg' }, { date: '28 December 2020', weight: '72 kg' }, { date: '3 Feburary 2021', weight: '73 kg' },
            { date: '7 December 2020', weight: '74 kg' }, { date: '31 November 2020', weight: '75 kg' },],
            entryValName: 'Weight',
            unit: 'kg',
            boardData : [{ 'name': 'Lost so far', value: '3 kg', color: constant.C_RED_50 }, { 'name': 'Now', value: '75 kg', color: constant.C_TEAL_50 },
            { 'name': 'Left to lose', value: '5 kg', color: constant.C_YELLOW_50 }, { 'name': 'Goal', value: '70 kg', color: constant.C_BLUE_50 },],
            milestones: [{ icon: Archiv_svg1, }, { icon: Archiv_svg2, }, { icon: Archiv_svg3, }, { icon: Archiv_svg4, }, { icon: Archiv_svg5, }, { icon: Archiv_svg6, }, { icon: Archiv_svg7, },],
        },
        'Body fat': {
            name: 'Body fat',
            photo: (size) => <Bodyfat_svg width={size} height={size} />,
            color: constant.C_RED_50,
            addbtn_name: 'Add body fat %',
            entries: [],
            entryValName: 'Body Fat %',
            unit: '%',
            boardData : [{ 'name': 'Highest', value: '-', color: constant.C_RED_50 }, { 'name': 'Now', value: '-', color: constant.C_TEAL_50 },
            { 'name': 'Lowest', value: '-', color: constant.C_YELLOW_50 }, ],
            milestones: [],
        },
        Thigh: {
            name: 'Thigh',
            photo: (size) => <Thigh_svg width={size} height={size} />,
            color: constant.C_TEAL_50,
            addbtn_name: 'Add thigh circumference',
            entries: [],
            entryValName: 'Thigh circumference',
            unit: 'cm',
            boardData : [{ 'name': 'Highest', value: '-', color: constant.C_RED_50 }, { 'name': 'Now', value: '-', color: constant.C_TEAL_50 },
            { 'name': 'Lowest', value: '-', color: constant.C_YELLOW_50 }, ],
            milestones: [],
        },
        Waist: {
            name: 'Waist',
            photo: (size) => <Waist_svg width={size} height={size} />,
            color: constant.C_YELLOW_50,
            addbtn_name: 'Add waist circumference',
            entries: [{ date: '2 March 2021', weight: '55 cm' }, { date: '28 December 2020', weight: '50 cm' },],
            entryValName: 'Waist circuference',
            unit: 'cm',
            boardData : [{ 'name': 'Highest', value: '0', color: constant.C_RED_50 }, { 'name': 'Now', value: '0', color: constant.C_TEAL_50 },
            { 'name': 'Lowest', value: '0', color: constant.C_YELLOW_50 }, ],
            milestones: [{ icon: Archiv_svg1, }, { icon: Archiv_svg2, }, { icon: Archiv_svg3, },],
        },
        Hip: {
            name: 'Hip',
            photo: (size) => <Hip_svg width={size} height={size} />,
            color: constant.C_BLUE_50,
            addbtn_name: 'Add hip circumference',
            entries: [{ date: '2 March 2021', weight: '55 cm' }, { date: '28 December 2020', weight: '50 cm' },],
            entryValName: 'Hip circumfernece',
            unit: 'cm',
            boardData : [{ 'name': 'Highest', value: '0', color: constant.C_RED_50 }, { 'name': 'Now', value: '0', color: constant.C_TEAL_50 },
            { 'name': 'Lowest', value: '0', color: constant.C_YELLOW_50 }, ],
            milestones: [{ icon: Archiv_svg1, }, { icon: Archiv_svg2, }, { icon: Archiv_svg3, },],
        },
    }

    _renderHeader = () => {
        return (
            <View style={[Gstyles.row_center, Gstyles.w_100, styles.header, { backgroundColor: this.pages[this.state.pageId].color, }]}>
                <TouchableOpacity onPress={() => this.openEditModal()}>
                    <Text style={[Gstyles.fs_16, { color: constant.C_BLACK_0 }]}>Edit</Text>
                </TouchableOpacity>
                <Text style={[styles.titleTxt, Gstyles.flex_1]}>{this.state.pageId}</Text>
                <View style={{ width: 24 }} />
            </View>
        )
    }
    _renderOptionBtn = (data) => {
        return (
            <TouchableOpacity style={[styles.optionbtn, Gstyles.row_center]} onPress={() => this.openChooseModal()}>
                {data.photo(24)}
                <Text style={[Gstyles.fs_14, { color: data.color, fontWeight: '700', marginLeft: 8, }]}>{data.name}</Text>
            </TouchableOpacity>
        )
    }
    _renderGraph = () => {
        return (
            <View style={{ padding: 4, width: '100%', borderRadius: 10, height: 258, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <LineChart width={screenWidth - 44} unit={this.pages[this.state.pageId].unit} />
            </View>
        )
    }
    _renderBoards = () => {
        return (
            <View style={[{ flex: 1, }, Gstyles.col_center]}>
                {
                    this.state.pageId == 'Weight' &&
                    <View style={[{ width: '100%', }, Gstyles.row_center]}>
                        {
                            this.pages['Weight'].boardData.slice(0, 2).map((item, index) =>
                                <View key={index} style={[styles.bgBoardItem,]}>
                                    <TouchableOpacity key={index} activeOpacity={0.85} style={[{ flex: 1, flexDirection: 'column', borderRadius: 8, padding: 8, backgroundColor: item.color }]} >
                                        <Text style={[styles.boardTxt,]}>{item.name}</Text>
                                        <Text style={[styles.boardvalTxt, Gstyles.text_center, { marginBottom: 16 }]}>{item.value}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    </View>
                }
                {
                    this.state.pageId == 'Weight' &&
                    <View style={[{ width: '100%', }, Gstyles.row_center]}>
                        {
                            this.pages['Weight'].boardData.slice(2, 4).map((item, index) =>
                                <View key={index} style={[styles.bgBoardItem,]}>
                                    <TouchableOpacity key={index} activeOpacity={0.85} style={[{ flex: 1, flexDirection: 'column', borderRadius: 8, padding: 8, backgroundColor: item.color }]} >
                                        <Text style={[styles.boardTxt,]}>{item.name}</Text>
                                        <Text style={[styles.boardvalTxt, Gstyles.text_center, { marginBottom: 16 }]}>{item.value}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    </View>
                }
                {
                    this.state.pageId != 'Weight' &&
                    <View style={[{ width: '100%', }, Gstyles.row_center]}>
                        {
                            this.pages[this.state.pageId].boardData.slice(0, 3).map((item, index) =>
                                <View key={index} style={[styles.bgBoardItem,]}>
                                    <TouchableOpacity key={index} activeOpacity={0.85} style={[{ flex: 1, flexDirection: 'column', borderRadius: 8, padding: 8, backgroundColor: item.color }]} >
                                        <Text style={[styles.boardTxt,]}>{item.name}</Text>
                                        <Text style={[styles.boardvalTxt, Gstyles.text_center, { marginBottom: 16 }]}>{item.value}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    </View>
                }
            </View>
        )
    }

    _renderMilestones = () => {
        return (
            <View style={[Gstyles.col_center, Gstyles.w_100, { padding: 8, marginTop: 12 }]}>
                <Text style={[styles.categoryText, Gstyles.w_100]}>Milestones earned</Text>
                <View style={[Gstyles.row_center_start, Gstyles.w_100, { flexWrap: 'wrap', marginTop: 12 }]}>
                    {
                        this.pages[this.state.pageId].milestones.length == 0 ?
                            <Text style={[Gstyles.text_center, { color: constant.C_BLACK_60 }]}>You don not have Badges</Text> :
                            this.pages[this.state.pageId].milestones.map((item, index) =>
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
        return (
            <View style={[Gstyles.col_center, Gstyles.w_100, { padding: 8, marginTop: 12, }]}>
                <Text style={[styles.categoryText, Gstyles.w_100, { marginBottom: 8 }]}>Entries</Text>
                <View style={styles.table}>
                    <View style={styles.tr}>
                        <View style={[styles.th, { backgroundColor: this.pages[this.state.pageId].color, borderColor: this.pages[this.state.pageId].color }]}>
                            <Text style={styles.th_txt}>Date</Text>
                        </View>
                        <View style={[styles.th, { backgroundColor: this.pages[this.state.pageId].color, borderColor: this.pages[this.state.pageId].color }]}>
                            <Text style={styles.th_txt}>{this.pages[this.state.pageId].entryValName}</Text>
                        </View>
                    </View>
                    {
                        this.pages[this.state.pageId].entries.length == 0 ?
                            <View style={[styles.tr, Gstyles.col_center]}>
                                <Text style={[styles.td_txt, { color: constant.C_BLACK_60 }]}>No Data Added</Text>
                            </View> :
                            this.pages[this.state.pageId].entries.map((item, index) =>
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
            </View>
        )
    }

    _renderSearchModal = () => {
        return (
            <BottomModal
                visible={this.state.isShowSearchModal}
                onTouchOutside={() => this.setState({ isShowSearchModal: false })}
                height={0.56}
                width={1}
                onSwipeOut={() => this.setState({ isShowSearchModal: false })}
                modalTitle={
                    <View style={[Gstyles.w_100,]} >
                        <View style={[Gstyles.row_center, Gstyles.w_100, styles.modalTitleBar, { paddingLeft: 20, paddingRight: 20 }]}>
                            <TouchableOpacity onPress={() => this.setState({ isShowSearchModal: false })}>
                                <Ionicons name="close" size={28} color={constant.C_BLACK_100} />
                            </TouchableOpacity>
                            <Text style={[styles.modalTitleTxt, Gstyles.flex_1]}></Text>
                            <View style={{ width: 26 }} />
                        </View>
                        <View style={styles.border1} />
                    </View>
                }
            >
                <View
                    style={[{ flex: 1, backgroundColor: constant.C_BLACK_0, }, Gstyles.col_center]}
                >
                    <View style={[Gstyles.row_center, { width: width(95), justifyContent: 'space-between', paddingLeft: 14, paddingRight: 14, height: 50 }]}>
                        <Text style={[{ color: constant.C_BLACK_90, fontSize: 18, fontWeight: '400' }]}>Add new weight</Text>
                        <Input
                            keyboardType="decimal-pad"
                            returnKeyType="done"
                            onChangeText={value => this.setState({ pass: value })} errorMessage={this.state.err_pass}
                            inputStyle={{ color: constant.C_BLACK_80, fontSize: 14 }}
                            rightIcon={<Text>kg</Text>}
                            inputContainerStyle={[{ width: 75, height: 40, margin: 0, padding: 0 }]}
                            containerStyle={{ width: 75, height: 40, margin: 0, padding: 0 }}
                        />
                    </View>
                    <View style={[styles.border1, { width: width(100) }]} />
                    <View style={[Gstyles.row_center, { width: width(95), justifyContent: 'space-between', paddingLeft: 14, paddingRight: 14, height: 50 }]}>
                        <Text style={[{ color: constant.C_BLACK_90, fontSize: 18, fontWeight: '400' }]}>Select date</Text>
                        <Text style={[{ color: constant.C_BLACK_90, fontSize: 18, fontWeight: '400' }]}>{moment(this.state.date).format('DD MMM, YYYY')}</Text>
                    </View>
                    <View style={[styles.border1, { width: width(100) }]} />
                    <View style={[{ width: width(100), flex: 1, }, Gstyles.col_center]}>
                        {/* <ScrollView style={{ width: width(100), flex: 1, }} > */}
                        <DatePicker
                            fadeToColor={'none'}
                            style={{ flex: 1, width: width(100), backgroundColor: constant.C_BLACK_10, elevation: 1 }}
                            mode='date'
                            textColor={constant.C_BLUE_50}
                            date={this.state.date}
                            onDateChange={(value) => this.setState({ date: value })}
                        />
                        {/* </ScrollView> */}
                        <View style={[{ width: '80%', },]}>
                            <TouchableOpacity activeOpacity={0.7} style={[styles.modal_addlist_btn, Gstyles.col_center, { marginTop: 12, marginBottom: 12 }]}>
                                <Text style={[{ color: constant.C_BLACK_0, fontSize: 18, fontWeight: '700' }]}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BottomModal>
        )
    }

    openEditModal = () => {
        Animated.timing(this.state.editModalY, {
            duration: 100,
            toValue: 0,
            useNativeDriver: true
        }).start();
    }

    closeEditModal = () => {
        Animated.timing(this.state.editModalY, {
            duration: 100,
            toValue: -screenHeight,
            useNativeDriver: true
        }).start();
    }

    _renderEditModal = () => {
        return (
            <Animated.View
                style={[
                    styles.topmodal,
                    {
                        transform: [
                            { translateY: this.state.editModalY }
                        ]
                    }
                ]}
            >
                <View style={{ flex: 1 }}>
                    <View style={[Gstyles.row_center, Gstyles.w_100, styles.header, { backgroundColor: this.pages[this.state.pageId].color }]}>
                        <TouchableOpacity onPress={() => this.closeEditModal()}>
                            <Ionicons name="close" size={28} color={constant.C_BLACK_0} />
                        </TouchableOpacity>
                        <Text style={[styles.titleTxt, Gstyles.flex_1]}>Progress</Text>
                        <TouchableOpacity onPress={() => this.closeEditModal()}>
                            <Feather name="check" size={28} color={constant.C_BLACK_0} />
                        </TouchableOpacity>
                    </View>
                    <View style={[Gstyles.col_center, styles.editmodalContent]}>
                        <View style={[Gstyles.row_center,]}>
                            <View style={[styles.WSettingBoardItem,]}>
                                <View style={[{ flex: 1, flexDirection: 'column', borderRadius: 8, padding: 8, backgroundColor: constant.C_RED_50 }]} >
                                    <Text style={[styles.WsettingDescTxt, Gstyles.text_left]}>Start Weight</Text>
                                    <Text style={[styles.boardvalTxt, Gstyles.text_left, { marginBottom: 16 }]}>78 Kg</Text>
                                    <Text style={[styles.WsettingDescTxt,]}>Date</Text>
                                    <Text style={[styles.boardTxt, Gstyles.fs_18]}>1 January 2021</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity activeOpacity={0.7} style={[styles.WresetBtn]} >
                                            <Text style={[{ fontWeight: '500', color: constant.C_BLACK_0 }, Gstyles.fs_18]}>Reset</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.WSettingBoardItem,]}>
                                <View style={[{ flex: 1, flexDirection: 'column', borderRadius: 8, padding: 8, backgroundColor: constant.C_BLUE_50 }]} >
                                    <Text style={[styles.WsettingDescTxt, Gstyles.text_right]}>Start Weight</Text>
                                    <Text style={[styles.boardvalTxt, Gstyles.text_right, { marginBottom: 16 }]}>78 Kg</Text>
                                    <Text style={[styles.WsettingDescTxt, Gstyles.text_right]}>Date</Text>
                                    <Text style={[styles.boardTxt, Gstyles.text_right, Gstyles.fs_18]}>1 January 2021</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <TouchableOpacity activeOpacity={0.7} style={[styles.WresetBtn]} >
                                            <Text style={[{ fontWeight: '500', color: constant.C_BLACK_0 }, Gstyles.fs_18]}>Reset</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>
                        <View style={styles.WSettingBoardHlp}>
                            <View style={{ width: '100%', flexDirection: 'row', backgroundColor: '#39c6b8', borderRadius: 5, padding: 12, paddingLeft: 8, }}>
                                <Light_svg width={32} height={32} />
                                <Text style={[styles.WsettingDescTxt,]}>Weight entries that are dated after the Start Weight date will appear in your chart.</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </Animated.View>
        )
    }

    openChooseModal = () => {
        Animated.timing(this.state.chooseModalY, {
            duration: 100,
            toValue: 0,
            useNativeDriver: true
        }).start();
    }

    closeChooseModal = () => {
        Animated.timing(this.state.chooseModalY, {
            duration: 100,
            toValue: -screenHeight,
            useNativeDriver: true
        }).start();
    }
    _renderChooseModal = () => {
        return (
            <Animated.View
                style={[
                    styles.topmodal,
                    {
                        transform: [
                            { translateY: this.state.chooseModalY }
                        ]
                    }
                ]}
            >
                <View style={{ flex: 1 }}>
                    <View style={[Gstyles.row_center, Gstyles.w_100, styles.header, { backgroundColor: this.pages[this.state.pageId].color }]}>
                        <TouchableOpacity onPress={() => this.closeChooseModal()}>
                            <Ionicons name="close" size={28} color={constant.C_BLACK_0} />
                        </TouchableOpacity>
                        <Text style={[styles.titleTxt, Gstyles.flex_1]}>Choose Measure</Text>
                        <View style={{ width: 24 }} />
                    </View>
                    <View style={[Gstyles.col_center, styles.editmodalContent, { paddingLeft: 0, paddingRight: 0 }]}>
                        {
                            Object.keys(this.pages).map((keyItem, index) =>
                                <View key={index} activeOpacity={0.6} style={[styles.setting_item, Gstyles.w_100]} >
                                    <View style={[Gstyles.row_center, Gstyles.w_100, { height: 49, paddingLeft: 24, paddingRight: 16 }]}>
                                        {this.pages[keyItem].photo(32)}
                                        <Text style={[styles.settingItemTxt, Gstyles.fs_18, Gstyles.flex_1]}>{this.pages[keyItem].name}</Text>
                                        <CheckBox checked={keyItem == this.state.pageId} onPress={() => {
                                            this.setState({ pageId: keyItem })
                                            this.closeChooseModal()
                                        }} size={24} containerStyle={{ margin: 0, padding: 0 }} style={{ borderColor: constant.C_BLUE_50 }} />
                                    </View>
                                    <View style={styles.border1} />
                                </View>
                            )
                        }
                    </View>


                </View>
            </Animated.View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                {this._renderHeader()}
                <View style={styles.formView} >
                    <View style={[styles.optionbtn_view, { backgroundColor: this.pages[this.state.pageId].color, }]}>
                        {this._renderOptionBtn(this.pages[this.state.pageId])}
                    </View>
                    <ScrollView style={{ width: '100%', flex: 1, }} >
                        <View style={{ width: '100%', flex: 1, }}>
                            <View style={[styles.roundBg, { backgroundColor: this.pages[this.state.pageId].color, }]}>

                            </View>
                            <View style={styles.content}>
                                {this._renderGraph()}
                                <View style={[styles.optionbtn_view, Gstyles.col_center]}>
                                    <TouchableOpacity style={[styles.optionbtn, Gstyles.row_center]} onPress={() => this.setState({ isShowSearchModal: true })}>
                                        <Text style={[Gstyles.fs_16, { color: this.pages[this.state.pageId].color, marginRight: 8, fontWeight: '700' }]}>{
                                            this.pages[this.state.pageId].addbtn_name
                                        }</Text>
                                        <Feather name="plus-circle" size={20} color={this.pages[this.state.pageId].color} />
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
                {this._renderEditModal()}
                {this._renderChooseModal()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: constant.C_BLACK_0,
    },
    header: {
        width: '100%', height: 80, paddingLeft: 24,
        paddingRight: 24, paddingTop: 30, borderBottomColor: '#ffffff77', borderBottomWidth: 1,
    },
    formView: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%',
    },
    titleTxt: { fontSize: 18, fontWeight: '700', color: constant.C_BLACK_0, textAlign: 'center' },
    setting_item: { flexDirection: 'column', },
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

    optionbtn_view: { width: '100%', padding: 12, alignItems: 'flex-end', },
    optionbtn: { backgroundColor: constant.C_BLACK_0, borderRadius: 5, paddingTop: 6, paddingBottom: 6, paddingLeft: 8, paddingRight: 8, },
    roundBg: { height: 500, width: '100%', borderBottomRightRadius: 20, borderBottomLeftRadius: 20 },
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
    th: { height: '100%', flex: 1, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
    th_txt: { color: constant.C_BLACK_0, fontSize: 12, fontWeight: '700' },
    tr: { height: 36, flex: 1, flexDirection: 'row' },
    td: { height: '100%', flex: 1, borderWidth: 1, borderColor: constant.C_BLACK_20, justifyContent: 'center', alignItems: 'center' },
    td_txt: { color: constant.C_BLACK_90, fontSize: 12, fontWeight: '500' },
    td_odd: { backgroundColor: constant.C_BLUE_5 },
    topmodal: {
        height: screenHeight,
        width: screenWidth,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#00000055',
        justifyContent: 'flex-start',
    },
    editmodalContent: { padding: 12, width: '100%', backgroundColor: constant.C_BLACK_0, borderBottomRightRadius: 12, borderBottomLeftRadius: 12 },
    WSettingBoardItem: { flex: 1, flexDirection: 'row', borderRadius: 5, padding: 8, },
    WSettingBoardHlp: { flexDirection: 'column', padding: 28, paddingBottom: 12, paddingTop: 12 },
    WresetBtn: { padding: 8, paddingTop: 3, paddingBottom: 3, marginTop: 12, backgroundColor: '#ffffff00', borderRadius: 4, borderWidth: 1, borderColor: constant.C_BLACK_0 },
    WsettingDescTxt: { fontSize: 14, fontWeight: '500', color: constant.C_BLACK_0, },
});

