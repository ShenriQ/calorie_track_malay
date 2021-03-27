import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { width, height } from 'react-native-dimension';
import { Modal, ModalContent, BottomModal, ModalTitle, } from 'react-native-modals';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
// import Pie from 'react-native-pie';
import * as Progress from 'react-native-progress';
// custom import
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import { user_helper, profile_helper } from '@helper';
//svg icons
import Svg_gauge from '../../assets/svgs/diary/item2_gauge.svg';
import Svg_barchart from '../../assets/svgs/diary/ic_barchart.svg';
import Svg_target from '../../assets/svgs/diary/ic_target.svg';
import Svg_apple from '../../assets/svgs/diary/ic_apple.svg';
import Svg_arrow from '../../assets/svgs/diary/ic_arrow.svg';
import Svg_water from '../../assets/svgs/diary/ic_water.svg';
import Svg_face_good from '../../assets/svgs/diary/ic_good.svg'


export default class vDiary extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            activeTab: 0,
            isOptionModal: false,
            isDateModal: false,
            isfrom: false,
            todate: new Date(),
            fromdate: new Date(),
        }
    }

    componentDidMount = () => {
    }

    calorie_data = [{
        name: "Breakfast",
        total: 237,
        type: 'food',
        list: [
            { name: 'Noodle soup', unit: "1 bowl", value: 237, }
        ]
    }, {
        name: "Lunch",
        total: 0,
        type: 'food',
        list: []
    }, {
        name: "Dinner",
        total: 0,
        type: 'food',
        list: []
    },
    {
        name: "Snack",
        total: 0,
        type: 'food',
        list: []
    },
    {
        name: "Activity Burn",
        total: 150,
        type: 'activity',
        list: [{ name: 'Running', unit: "5 minutes", value: 150, }]
    },
    ]

    note_data = [
        { icon: <Svg_face_good width={40} height={40} />, note: 'Lorem ipsum', }
    ]

    goPage = (page) => {
        this.props.navigation.navigate(page)
    }
    goAddFood = (mealtype) => {
        this.props.rootnav.navigate('diary_addmeal', { mealtype: mealtype })
    }

    _renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={[{ width: '100%', }, Gstyles.row_center]}>
                    <View style={[Gstyles.flex_1, { flexDirection: 'row', paddingLeft: 20 }]}>
                        <TouchableOpacity onPress={() => { }}>
                            <AntDesign name="arrowleft" size={24} color={constant.C_BLACK_100} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => { }}>
                        <Feather name="chevron-left" size={24} color={constant.C_BLUE_50} />
                    </TouchableOpacity>
                    <Text style={styles.titleTxt}>{Strings["Today"]}</Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Feather name="chevron-right" size={24} color={constant.C_BLUE_50} />
                    </TouchableOpacity>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                        <TouchableOpacity style={[styles.headerChartBtn, Gstyles.col_center]} onPress={() => this.goPage('nutri_insight')}>
                            <Svg_barchart width={18} height={18} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.headerChartBtn, Gstyles.col_center]} onPress={() => this.goPage('options')}>
                            <Svg_target width={20} height={20} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }

    _renderDash = () => {
        const data = [{ name: 'Protein', value: 4, total: 82, color: constant.C_BLUE_50 },
        { name: 'Carbohydrates', value: 5, total: 164, color: constant.C_RED_50 },
        { name: 'Fat', value: 2, total: 37, color: constant.C_TEAL_50 },]
        return (
            <View style={{ width: '100%', backgroundColor: constant.C_BLACK_0 }}>
                <View style={[{ width: '100%', }, Gstyles.row_center]}>
                    <View style={[Gstyles.col_center, { marginRight: -22, padding: 8, zIndex: 1 }]}>
                        <Text style={{ fontSize: 25, fontWeight: '700', color: constant.C_BLUE_50, marginBottom: 12 }}>1260</Text>
                        <Text style={[{ width: 60, fontWeight: '700', textAlign: 'center' }, Gstyles.fs_11]}>Weekly Remaining</Text>
                    </View>
                    <View style={[Gstyles.col_center, {}]}>
                        <View style={[Gstyles.col_center, { width: 250, height: 250, }]}>
                            <Svg_gauge width={250} height={250} style={{ position: 'absolute', top: 0, left: 0 }} />
                            <View style={[Gstyles.col_center, {}]}>
                                <Text style={{ fontSize: 35, fontWeight: '700', color: constant.C_BLACK_0 }}>237</Text>
                                <Text style={[{ width: 60, fontWeight: '700', textAlign: 'center', color: constant.C_BLACK_0 }, Gstyles.fs_11]}>Consumed Today</Text>
                            </View>
                            <View style={[Gstyles.row_center, { position: 'absolute', bottom: 30, left: 40 }]}>
                                <Svg_apple width={23} height={23} />
                                <Text style={[Gstyles.fs_18, { color: constant.C_RED_50 }]}>237</Text>
                            </View>
                            <View style={[Gstyles.row_center, { position: 'absolute', bottom: 30, right: 40 }]}>
                                <Svg_arrow width={23} height={23} />
                                <Text style={[Gstyles.fs_18, { color: constant.C_RED_50 }]}>1150</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[Gstyles.col_center, { marginLeft: -22, padding: 8 }]}>
                        <Text style={{ fontSize: 25, fontWeight: '700', color: constant.C_BLUE_50, marginBottom: 12 }}>150</Text>
                        <Text style={[{ width: 60, fontWeight: '700', textAlign: 'center' }, Gstyles.fs_11]}>Activity earned</Text>
                    </View>
                </View>
                <View style={[{ width: '100%', borderColor: constant.C_BLACK_20, borderWidth: 1 }, Gstyles.row_center]}>
                    {
                        data.map((item, index) =>
                            <View key={index} style={styles.dashbox}>
                                <Text style={{ fontSize: 12, fontWeight: '400', color: constant.C_BLACK_100 }}>{item.name}</Text>
                                <Progress.Bar progress={item.value / item.total} color={item.color} width={null} height={8} borderWidth={0} unfilledColor={constant.C_BLACK_10} style={[Gstyles.w_100,]} />
                                <Text style={{ fontSize: 12, fontWeight: '400', color: constant.C_BLACK_60 }}><Text style={{ color: item.color, }}>{item.value}</Text>/{item.total}g</Text>
                            </View>
                        )
                    }
                    <View style={styles.dashbox}>
                        <Text style={{ fontSize: 12, fontWeight: '400', color: constant.C_BLACK_100 }}>Water</Text>
                        <TouchableOpacity>
                            <Svg_water width={56} height={45} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }

    _renderPanelItem = (data, id) => {
        return (
            <View key={id} style={{ width: '100%', backgroundColor: constant.C_BLACK_0, marginTop: 12, elevation: 1 }}>
                <View style={[{ width: '100%', height: 50, backgroundColor: constant.C_BLUE_50, paddingLeft: 16, paddingRight: 12 }, Gstyles.row_center]}>
                    <Text style={{ color: constant.C_BLACK_0, fontSize: 16, fontWeight: '700' }}>{data.name}</Text>
                    <View style={Gstyles.flex_1} />
                    <Text style={{ color: constant.C_BLACK_0, fontSize: 17, fontWeight: '500' }}>{data.total} kcal</Text>
                </View>
                <View style={[{ width: '100%', borderColor: constant.C_BLACK_20, borderWidth: 1 }, Gstyles.col_center]}>
                    {
                        data.list.map((item, index) =>
                            <View key={index} style={[{ width: '100%', padding: 16, }, Gstyles.col_center]}>
                                <View style={[Gstyles.row_center, { width: '100%' }]}>
                                    <Text style={{ fontSize: 16, fontWeight: '500', color: constant.C_BLACK_100 }}>{item.name}</Text>
                                    <View style={{ flex: 1 }} />
                                    <Text style={{ color: item.color, fontSize: 16, }}>{item.value}</Text>
                                </View>
                                <Text style={{ fontSize: 14, fontWeight: '400', width: '100%', color: constant.C_BLUE_50, marginTop: 6 }}>{item.unit}</Text>
                            </View>
                        )
                    }
                </View>
                <View style={[{ width: '100%', height: 50, backgroundColor: '#f5f8ff', paddingLeft: 18, paddingRight: 18 }, Gstyles.row_center]}>
                    <TouchableOpacity onPress={() => this.goAddFood(data.name)} style={[Gstyles.row_center]}>
                        <Feather name='plus' size={20} color={constant.C_BLUE_50} />
                        <Text style={{ color: constant.C_BLUE_50, fontSize: 14, fontWeight: '400', marginLeft: 6 }}>Add {data.type}</Text>
                    </TouchableOpacity>
                    <View style={Gstyles.flex_1} />
                    <TouchableOpacity onPress={() => this.setState({ isOptionModal: true })}>
                        <Entypo name="dots-three-horizontal" size={22} color={constant.C_BLACK_50} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _renderPanelNote = (list) => {
        const goAddNote=()=>{
            this.props.rootnav.navigate('diary_addnote')
        }
        
        return (
            <View style={{ width: '100%', backgroundColor: constant.C_BLACK_0, marginTop: 12, elevation: 1 }}>
                <View style={[{ width: '100%', height: 50, backgroundColor: constant.C_BLUE_50, paddingLeft: 16, paddingRight: 12 }, Gstyles.row_center]}>
                    <Text style={{ color: constant.C_BLACK_0, fontSize: 16, fontWeight: '700' }}>Notes</Text>
                    <View style={Gstyles.flex_1} />
                </View>
                <View style={[{ width: '100%', borderColor: constant.C_BLACK_20, borderWidth: 1 }, Gstyles.col_center]}>
                    {
                        list.map((item, index) =>
                            <View key={index} style={[{ width: '100%', padding: 16, }, Gstyles.row_center]}>
                                <TouchableOpacity onPress={()=>{}}> 
                                {item.icon}
                                </TouchableOpacity>
                                <Text style={{ flex: 1, fontSize: 14, fontWeight: '400', width: '100%', color: constant.C_BLUE_50, marginLeft: 12 }}>{item.note}</Text>
                            </View>
                        )
                    }
                </View>
                <View style={[{ width: '100%', height: 50, backgroundColor: '#f5f8ff', paddingLeft: 18, paddingRight: 18 }, Gstyles.row_center]}>
                    <TouchableOpacity onPress={()=>goAddNote()} style={[Gstyles.row_center]}>
                        <Feather name='plus' size={20} color={constant.C_BLUE_50} />
                        <Text style={{ color: constant.C_BLUE_50, fontSize: 14, fontWeight: '400', marginLeft: 6 }}>Add</Text>
                    </TouchableOpacity>
                    <View style={Gstyles.flex_1} />
                </View>
            </View>
        )
    }

    _renderMoreOptionModal = () => {
        const onTrackingStep=()=>{
            this.setState({isOptionModal : false,})
            this.props.rootnav.navigate('diary_trackingsteps')
        }
        const onCopyTodate=()=>{
            this.setState({isfrom : false, isOptionModal : false, isDateModal : true})
        }
        const onCopyfromdate=()=>{
            this.setState({isfrom : true, isOptionModal : false, isDateModal : true})
        }
        return (
            <BottomModal
                visible={this.state.isOptionModal}
                onTouchOutside={() => this.setState({ isOptionModal: false })}
                height={200}
                width={1}
                onSwipeOut={() => this.setState({ isOptionModal: false })}
            >
                <View
                    style={[{ flex: 1, backgroundColor: constant.C_BLACK_0, }, Gstyles.col_center]}
                >
                    <TouchableOpacity onPress={()=>onTrackingStep()} style={[Gstyles.row_center, { width: '100%', justifyContent: 'space-between', paddingLeft: 14, paddingRight: 14, height: 50 }]}>
                        <Text style={[{ color: constant.C_BLACK_80, fontSize: 14, fontWeight: '400' }]}>Manage steps tracking</Text>
                    </TouchableOpacity>
                    <View style={[styles.border1, { width: '100%' }]} />
                    <TouchableOpacity onPress={()=>onCopyfromdate()} style={[Gstyles.row_center, { width: '100%', justifyContent: 'space-between', paddingLeft: 14, paddingRight: 14, height: 50 }]}>
                        <Text style={[{ color: constant.C_BLACK_80, fontSize: 14, fontWeight: '400' }]}>Copy from date</Text>
                    </TouchableOpacity>
                    <View style={[styles.border1, { width: '100%' }]} />
                    <TouchableOpacity onPress={()=>onCopyTodate()} style={[Gstyles.row_center, { width: '100%', justifyContent: 'space-between', paddingLeft: 14, paddingRight: 14, height: 50 }]}>
                        <Text style={[{ color: constant.C_BLACK_80, fontSize: 14, fontWeight: '400' }]}>Copy to date</Text>
                    </TouchableOpacity>
                </View>
            </BottomModal>
        )
    }

    _renderDateModal = () => {
        return (
            <BottomModal
                visible={this.state.isDateModal}
                onTouchOutside={() => this.setState({ isDateModal: false })}
                height={300}
                width={1}
                onSwipeOut={() => this.setState({ isDateModal: false })}
                modalTitle={
                    <View style={[Gstyles.w_100,]} >
                        <View style={[Gstyles.row_center, Gstyles.w_100, styles.modalTitleBar, { paddingLeft: 20, paddingRight: 20 }]}>
                            <TouchableOpacity onPress={() => this.setState({ isDateModal: false })}>
                                <Ionicons name="close" size={28} color={constant.C_BLACK_80} />
                            </TouchableOpacity>
                            <Text style={[styles.modalTitleTxt, Gstyles.flex_1]}>
                                {
                                    this.state.isfrom ? 'Copy from date' : 'Copy to date'
                                }
                            </Text>
                            <View style={{ width: 26 }} />
                        </View>
                        <View style={styles.border1} />
                    </View>
                }
            >
                <View
                    style={[{ flex: 1, backgroundColor: constant.C_BLACK_0, }, Gstyles.col_center]}
                >
                    <View style={[styles.border1, { width: '100%' }]} />
                    <View style={[Gstyles.row_center, { width: '100%', justifyContent: 'space-between', paddingLeft: 24, paddingRight: 24, height: 50 }]}>
                        <Text style={[{ color: constant.C_BLACK_90, fontSize: 18, fontWeight: '400' }]}>Date : </Text>
                        <Text style={[{ color: constant.C_BLACK_90, fontSize: 18, fontWeight: '400' }]}>
                            {
                                this.state.isfrom ?
                                    moment(this.state.fromdate).format('DD MMM, YYYY')
                                    : moment(this.state.todate).format('DD MMM, YYYY')
                            }
                        </Text>
                    </View>
                    <View style={[styles.border1, { width: '100%' }]} />
                    <View style={[{ width: '100%', flex: 1, }, Gstyles.col_center]}>
                        <DatePicker
                            fadeToColor={'none'}
                            style={{ flex: 1, width: width(100), backgroundColor: constant.C_BLACK_10, elevation: 1 }}
                            mode='date'
                            textColor={constant.C_BLUE_50}
                            date={this.state.isfrom ? this.state.fromdate : this.state.todate}
                            onDateChange={(value) => {
                                if(this.state.isfrom) {
                                    this.setState({ fromdate: value })
                                }
                                else {
                                    this.setState({ todate: value })
                                }
                            }}
                        />
                    </View>
                </View>
            </BottomModal>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} translucent backgroundColor="transparent" barStyle="light-content" />
                {this._renderHeader()}
                <View style={styles.formView} >
                    <ScrollView style={{ flex: 1, width: '100%', backgroundColor: constant.C_BLACK_10 }} >
                        {this._renderDash()}
                        {
                            this.calorie_data.map((item, index) =>
                                this._renderPanelItem(item, index)
                            )
                        }
                        {
                            this._renderPanelNote(this.note_data)
                        }
                        <View style={{ height: 20 }}></View>
                    </ScrollView>
                </View>
                {this._renderMoreOptionModal()}
                {this._renderDateModal()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: constant.C_BLACK_0,
    },
    header: {
        backgroundColor: constant.C_BLACK_0, width: '100%', height: 80, elevation: 6, paddingBottom: 5, alignItems: 'flex-end', flexDirection: 'row',
    },
    headerChartBtn: { height: 40, width: 40, borderRadius: 10, marginLeft: 8, backgroundColor: constant.C_BLACK_0, elevation: 3 },
    titleTxt: {
        textAlign: 'center', fontSize: 22, fontWeight: '700', color: constant.C_BLACK_80, marginLeft: 16, marginRight: 16
    },
    dashbox: {
        height: 80, flex: 1, padding: 8, flexDirection: 'column', justifyContent: 'space-between',
        alignItems: 'center', borderLeftColor: constant.C_BLACK_20, borderLeftWidth: 1
    },
    formView: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%',
    },
    border1: { height: 1, backgroundColor: '#E5E5E5', width: '100%' },
    subjectTxt: { fontSize: 20, fontWeight: '500', color: constant.C_BLACK_80, marginTop: 24, marginBottom: 16 },
    modalTitleBar: { height: 56 },
    modalTitleTxt: { fontSize: 18, fontWeight: '700', color: constant.C_BLACK_80, textAlign: 'center' },
});

