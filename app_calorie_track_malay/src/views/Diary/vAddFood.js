import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Input } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';
import Pie from 'react-native-pie';
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import Ruler from '../../components/Global/Ruler';
import NutriInfoTable from '../../components/Global/NutriInfoTable';
// svgs
import Svg_weighmachine from '../../assets/svgs/diary/ic_weigh_machine.svg';

export default class vAddFood extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            activeTab: 0,
            isModal: false,
            serv_item: {
                name: "Medium",
                value: 2,
            },
        }
    }

    componentDidMount = () => {
    }

    food_item = {
        title: 'Apple',
        description: '1.0 small',
        photo: tmp_imgs.apple,
        cal: '48Kcal',
    }
    nutri_info = [
        { name: 'Carb', w: '0.5g', percentage: 25, color: constant.C_TEAL_50 },
        { name: 'Fat', w: '0.5g', percentage: 25, color: constant.C_RED_50 },
        { name: 'Protein', w: '2.5g', percentage: 50, color: constant.C_BLUE_50 },
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
                    <Text style={styles.titleTxt}>Add food</Text>
                    <View style={{ width: 24, flex: 1 }} />
                </View>
            </View>
        )
    }

    onSetServ = (serv_item) => {
        this.setState({ serv_item: serv_item })
    }

    onGoWeightEstimation = () => {
        this.props.navigation.navigate('diary_food_weight_estimation')
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                {this._renderHeader()}
                <View style={styles.formView} >
                    <ScrollView style={{ flex: 1, width: '100%' }} >
                        <View style={[Gstyles.col_center, { marginTop: 25, marginBottom: 25 }]}>
                            <Image source={tmp_imgs.apple} style={styles.foodimg} />
                            <Text style={styles.foodTxt}>Apple</Text>
                        </View>
                        <View >
                            <View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={{ fontSize: 18, fontWeight: '400', color: constant.C_BLACK_70 }}>230 kcal</Text>
                                </View>
                            </View>
                            <View style={styles.serv_info}>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={() => this.onGoWeightEstimation()}>
                                        <Svg_weighmachine width={18} height={18} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.serv_txt}>
                                    {this.state.serv_item.value}
                                    <Text style={Gstyles.fs_24}> {this.state.serv_item.name}</Text>
                                </Text>
                                <View style={{ alignItems: 'flex-end', flex: 1 }}>
                                    <Text style={styles.serv_gram_txt}>200g</Text>
                                </View>
                            </View>
                            <View style={styles.serv_ruler}>
                                <Ruler activeIndex={1} items={
                                    [
                                        {
                                            name: "Small",
                                            value: 1,
                                        },
                                        {
                                            name: "Medium",
                                            value: 2,
                                        },
                                        {
                                            name: "Big",
                                            value: 3,
                                        },
                                        {
                                            name: "Jumbo",
                                            value: 4,
                                        },
                                    ]
                                } onSelect={this.onSetServ} />
                            </View>
                        </View>
                        <View style={[styles.btnview, Gstyles.col_center]}>
                            <TouchableOpacity activeOpacity={0.7}
                                style={[styles.trackbtn, Gstyles.col_center]}
                                onPress={() => { }}>
                                <Text style={[Gstyles.fs_16, { color: constant.C_BLACK_0, fontWeight: '700' }]} >Track food</Text>
                            </TouchableOpacity>
                            <NutriInfoTable />
                        </View>

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
        backgroundColor: constant.C_BLACK_0, width: '100%', elevation: 4, height: 80, paddingBottom: 8, alignItems: 'flex-end', flexDirection: 'row',
    },
    fs_14: { fontSize: 14 },
    fs_24: { fontSize: 24 },
    formView: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', paddingTop: 10,
        paddingLeft: 25, paddingRight: 25,
    },
    titleTxt: {
        textAlign: 'center', fontSize: 22, fontWeight: '700', color: constant.C_BLACK_80, marginLeft: 16, marginRight: 16
    },
    serv_info: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    serv_ruler: { width: '100%' },
    serv_gram_txt: { fontSize: 14, fontWeight: '400', color: constant.C_BLACK_50, },
    serv_txt: { fontSize: 28, fontWeight: '400', color: constant.C_BLUE_50, textAlign: 'center' },
    set_occation: { borderRadius: 20, backgroundColor: constant.C_BLACK_0, elevation: 2, padding: 20, margin: 5, marginTop: 20 },
    subjectTxt: { fontSize: 20, fontWeight: '500', color: constant.C_BLACK_80, marginTop: 24, marginBottom: 8 },
    nutri_info: { width: '100%', },
    btnview: { width: '100%', marginTop: 28, borderTopWidth: 2, borderTopColor: constant.C_BLACK_20, },
    trackbtn: { width: '100%', height: 45, marginBottom: 12, borderRadius: 10, backgroundColor: constant.C_BLUE_80 },
    color_desc: { color: constant.C_BLACK_60 },
    foodimg: { width: 53, height: 53, resizeMode: 'cover', borderRadius: 12 },
    foodTxt: { fontSize: 35, fontWeight: '400', color: constant.C_BLACK_80 },
});

