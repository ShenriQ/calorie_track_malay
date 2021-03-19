import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Input } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';
import { width, height } from 'react-native-dimension';
import { Modal, ModalContent, BottomModal, ModalTitle, } from 'react-native-modals';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
//svgs

export default class vShare extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            selectedIndex: 0,
            isModal: false,
            from: new Date(),
            to: new Date(),
            activeDateId: 0,
            isShowDateSelectionModal : false,
        }
    }

    componentDidMount = () => {
    }

    list = [
        { name: 'Today', },
        { name: 'Yesterday', },
        { name: 'Last 7 Days', },
        { name: 'Last 14 Days', },
    ]

    _renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={[{ width: '100%', }, Gstyles.row_center]}>
                    <View style={[Gstyles.flex_1, { flexDirection: 'row', paddingLeft: 20 }]}>
                    </View>
                    <Text style={styles.titleTxt}>Share Diary</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <AntDesign name="close" size={24} color={constant.C_BLACK_50} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    _renderOptionItem = (item, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => this.setState({ selectedIndex: index })} style={[Gstyles.row_center, styles.option_view,]}>
                <Text style={[Gstyles.flex_1, styles.option_txt]}>{item.name}</Text>
                {
                    this.state.selectedIndex == index &&
                    <AntDesign name="checkcircleo" size={16} color={constant.C_BLUE_50} style={{ marginLeft: 4 }} />
                }
            </TouchableOpacity>
        )
    }

    _renderSearchModal = () => {
        return (
            <BottomModal
                visible={this.state.isShowDateSelectionModal}
                onTouchOutside={() => this.setState({ isShowDateSelectionModal: false })}
                height={0.56}
                width={1}
                onSwipeOut={() => this.setState({ isShowDateSelectionModal: false })}
                modalStyle={{borderTopLeftRadius : 18, borderTopRightRadius : 18}}
            >
                <View
                    style={[{ flex: 1, backgroundColor: constant.C_BLACK_0, }, Gstyles.col_center]}
                >
                    <View style={{paddingTop: 26, paddingBottom: 16}}>
                        <Text style={[styles.modalTitleTxt, ]}>Select a date range(max 14 days)</Text>
                    </View>
                    <View style={[styles.border1, { width: width(100) }]} />
                    <TouchableOpacity onPress={()=>this.setState({activeDateId : 0})} style={[Gstyles.row_center, { width: '100%', justifyContent: 'space-between', paddingLeft: 24, paddingRight: 24, height: 50 }]}>
                        <Text style={[{ color: this.state.activeDateId ==0 ? constant.C_BLUE_50 : constant.C_BLACK_90, fontSize: 14, fontWeight: '700' }]}>
                            Start Date
                        </Text>
                        <View style={Gstyles.flex_1}></View>
                        <Text style={[{ color: this.state.activeDateId ==0 ? constant.C_BLUE_50 : constant.C_BLACK_90, fontSize: 14, fontWeight: '700' }]}>
                            {moment(this.state.from).format('DD MMM, YYYY')}
                        </Text>
                    </TouchableOpacity>
                    <View style={[styles.border1, { width: width(100) }]} />
                    <TouchableOpacity onPress={()=>this.setState({activeDateId : 1})} style={[Gstyles.row_center, { width: '100%', justifyContent: 'space-between', paddingLeft: 24, paddingRight: 24, height: 50 }]}>
                        <Text style={[{ color: this.state.activeDateId ==1 ? constant.C_BLUE_50 : constant.C_BLACK_90, fontSize: 14, fontWeight: '700' }]}>
                            End Date
                        </Text>
                        <View style={Gstyles.flex_1}></View>
                        <Text style={[{ color: this.state.activeDateId ==1 ? constant.C_BLUE_50 : constant.C_BLACK_90, fontSize: 14, fontWeight: '700' }]}>
                            {moment(this.state.to).format('DD MMM, YYYY')}
                        </Text>
                    </TouchableOpacity>
                    <View style={[styles.border1, { width: width(100) }]} />
                    <View style={[{ width: width(100), flex: 1, }, Gstyles.col_center]}>
                        <DatePicker
                            fadeToColor={'none'}
                            style={{ flex: 1, width: width(100), backgroundColor: constant.C_BLACK_10, elevation: 1 }}
                            mode='date'
                            textColor={constant.C_BLACK_100}
                            date={this.state.activeDateId == 0 ? this.state.from : this.state.to}
                            onDateChange={(value) => {
                                if(this.state.activeDateId == 0) {
                                    this.setState({ from: value })
                                }
                                else {
                                    this.setState({ to: value })
                                }
                            }}
                        />
                        <View style={[{ width: '80%', },]}>
                            <TouchableOpacity activeOpacity={0.7} style={[styles.sharebtn, Gstyles.col_center, { marginTop: 12, marginBottom: 12 }]}>
                                <Text style={[{ color: constant.C_BLACK_0, fontSize: 18, fontWeight: '700' }]}>Confirm</Text>
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
                <StatusBar hidden={true} translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                {this._renderHeader()}
                <View style={styles.formView} >
                    <ScrollView style={{ flex: 1, width: '100%', }} >
                        <View style={[styles.categ_view, Gstyles.row_center_start]}>
                            <Text style={styles.categ_txt}>Select Days to Share</Text>
                        </View>
                        {
                            this.list.map((item, index) =>
                                this._renderOptionItem(item, index)
                            )
                        }
                        <View style={{ width: '100%', }}>
                            <TouchableOpacity onPress={() => this.setState({ isShowDateSelectionModal: true })} style={[Gstyles.row_center, styles.option_view, { borderBottomWidth: 0 }]}>
                                <Text style={[Gstyles.flex_1, styles.option_txt]}>Choose Date Range</Text>
                            </TouchableOpacity>
                            <View style={[Gstyles.row_center_start, { width: '100%', paddingLeft: 28, paddingRight: 20, }]}>
                                <View style={{ marginRight: 20 }}>
                                    <Text style={{ fontSize: 14, fontWeight: '500', color: constant.C_BLACK_100, marginBottom: 8 }}>From</Text>
                                    <View style={[{ width: 165, height: 35, paddingLeft: 12, paddingRight: 12, borderRadius: 5, backgroundColor: constant.C_BLACK_10 }, Gstyles.row_center]}>
                                        <MaterialCommunityIcons name="calendar" size={20} color={'#B3B3B3'} style={{ marginRight: 8 }} />
                                        <Text style={{ flex: 1, fontSize: 12, fontWeight: '500', color: '#B3B3B3' }}>{moment(this.state.from).format('DD MMM, YYYY')}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 14, fontWeight: '500', color: constant.C_BLACK_100, marginBottom: 8 }}>To</Text>
                                    <View style={[{ width: 165, height: 35, paddingLeft: 12, paddingRight: 12, borderRadius: 5, backgroundColor: constant.C_BLACK_10 }, Gstyles.row_center]}>
                                        <MaterialCommunityIcons name="calendar" size={20} color={'#B3B3B3'} style={{ marginRight: 8 }} />
                                        <Text style={{ flex: 1, fontSize: 12, fontWeight: '500', color: '#B3B3B3' }}>{moment(this.state.to).format('DD MMM, YYYY')}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[Gstyles.row_center_start, { width: '100%', paddingLeft: 28, paddingRight: 20, }]}>
                                <TouchableOpacity onPress={() => {}} style={[Gstyles.col_center, styles.sharebtn]}>
                                    <Text style={{ fontSize: 16, fontWeight: '700', color: constant.C_BLACK_0 }}>Share Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 20 }}></View>
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
        backgroundColor: constant.C_BLACK_0, width: '100%', height: 80, elevation: 6, paddingBottom: 8, alignItems: 'flex-end', flexDirection: 'row',
    },
    formView: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%',
    },
    titleTxt: {
        textAlign: 'center', fontSize: 22, fontWeight: '700', color: constant.C_BLACK_80, marginLeft: 16, marginRight: 16
    },
    option_txt: { paddingLeft: 8, fontSize: 14, fontWeight: '500', color: constant.C_BLACK_80 },
    option_view: { height: 55, width: '100%', paddingLeft: 20, paddingRight: 20, borderBottomColor: constant.C_BLACK_10, borderBottomWidth: 1 },
    categ_view: { height: 47, width: '100%', paddingLeft: 20, backgroundColor: constant.C_BLACK_10 },
    categ_txt: { fontSize: 16, fontWeight: '500', color: constant.C_BLACK_100 },
    sharebtn: { width: '100%', height: 50, marginTop: 50, borderRadius: 10, backgroundColor: constant.C_BLUE_50,  },
    modalTitleTxt : {fontSize: 14, fontWeight: '300', color: constant.C_BLACK_100 },
    border1: { height: 1, backgroundColor: '#E5E5E5', width: '100%' },
});

