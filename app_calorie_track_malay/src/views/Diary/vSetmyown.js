import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Input } from 'react-native-elements';
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
//svgs
import Svg_calorie from '../../assets/svgs/diary/ic_calendar_calorie.svg'
import Svg_protein from '../../assets/svgs/diary/ic_protein.svg'
import Svg_carb from '../../assets/svgs/diary/ic_carb.svg'
import Svg_fat from '../../assets/svgs/diary/ic_fat.svg'

export default class vSetmyown extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            selectedIndex: 0,
            isModal: false,
        }
    }

    componentDidMount = () => {
    }

    list = [
        { name: 'Protein', icon: <Svg_protein width={45} height={45} /> },
        { name: 'Carbohydrates', icon: <Svg_carb width={45} height={45} /> },
        { name: 'Fat', icon: <Svg_fat width={45} height={45} /> },
    ]

    _renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={[{ width: '100%', }, Gstyles.row_center]}>
                    <View style={[Gstyles.flex_1, { flexDirection: 'row', paddingLeft: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <Feather name="arrow-left" size={24} color={constant.C_BLACK_100} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titleTxt}>Set My Own</Text>
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
            <View key={index} style={[Gstyles.row_center_start, { marginTop: 8, marginBottom: 8 }]}>
                {item.icon}
                <View style={[{ paddingLeft: 10, paddingRight: 10, flex: 1, }]}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: constant.C_BLACK_100 }}>{item.name}</Text>
                </View>
                <View style={[{ flexDirection: 'row', alignItems: 'center', }]}>
                    <Input
                        containerStyle={{ width: 80, height: 27, marginRight: 4 }}
                        inputContainerStyle={{
                            width: 65, height: 27,
                            borderColor: constant.C_BLACK_30, borderWidth: 1, borderRadius: 4
                        }}
                        inputStyle={{ color: constant.C_BLUE_50, fontSize: 14, fontWeight: '500', textAlign:'center' }}
                    />
                    <Text style={{ fontSize: 14, fontWeight: '400', color: constant.C_BLACK_70 }}>%</Text>
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
                        <View style={[styles.calorieview, Gstyles.row_center_start]}>
                            <Svg_calorie width={45} height={45} />
                            <View style={[{ paddingLeft: 10, paddingRight: 10, flex: 1, }]}>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: constant.C_BLACK_100 }}>Daily calories</Text>
                                <Text style={{ fontSize: 10, fontWeight: '400', color: constant.C_BLACK_60, marginTop: 6 }}>Between 1200 - 4000 kcal is recommended</Text>
                            </View>
                            <View style={[{ flexDirection: 'row', alignItems: 'center', }]}>
                                <Input
                                    containerStyle={{ width: 80, height: 27, marginRight: 4 }}
                                    inputContainerStyle={{
                                        width: 65, height: 27,
                                        borderColor: constant.C_BLACK_30, borderWidth: 1, borderRadius: 4
                                    }}
                                    inputStyle={{ color: constant.C_BLUE_50, fontSize: 14, fontWeight: '500', textAlign:'center' }}
                                />
                                <Text style={{ fontSize: 12, fontWeight: '500', color: constant.C_BLACK_70 }}>kcal</Text>
                            </View>
                        </View>
                        <View style={styles.macroview}>
                            <Text style={{ fontSize: 16, fontWeight: '400', marginBottom: 16 }}>Macronutrient distribution</Text>
                            {
                                this.list.map((item, index) =>
                                    this._renderOptionItem(item, index)
                                )
                            }
                            <View style={[Gstyles.row_center_start, { width: '100%', height: 30, marginTop: 8, borderRadius: 4, backgroundColor: constant.C_BLACK_10, paddingLeft: 5, paddingRight: 5 }]}>
                                <Text style={[Gstyles.flex_1, { fontSize: 12, fontWeight: '500', color: constant.C_BLACK_100 }]}>Total</Text>
                                <View style={{ width: 1, height: '100%', backgroundColor: constant.C_BLACK_20 }} />
                                <Text style={[{ fontSize: 12, fontWeight: '700', color: constant.C_BLUE_50, width: 80, textAlign: 'center' }]}>100</Text>
                                <Text style={[{ fontSize: 14, fontWeight: '400', color: constant.C_BLACK_70 }]}>%</Text>
                            </View>
                            <Text style={[{ fontSize: 10, fontWeight: '400', color: constant.C_BLACK_50, textAlign: 'right', marginTop: 8 }]}>
                                Total macronutrient distribution needs to add up to 100%
                            </Text>
                        </View>
                        <View style={{ height: 20 }}></View>
                    </ScrollView>
                </View>
                <View style={styles.macroview}>
                    <TouchableOpacity activeOpacity={0.7} style={[styles.sharebtn, Gstyles.col_center, ]}>
                        <Text style={[{ color: constant.C_BLACK_0, fontSize: 16, fontWeight: '700' }]}>Apply changes</Text>
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
    calorieview: { width: '100%', paddingLeft: 20, paddingRight: 20, paddingTop: 25, paddingBottom: 40, },
    categ_txt: { fontSize: 16, fontWeight: '500', color: constant.C_BLACK_100 },
    sharebtn: { width: '100%', height: 45, marginTop: 20, marginBottom: 35, borderRadius: 10, backgroundColor: constant.C_BLUE_50, },
    modalTitleTxt: { fontSize: 14, fontWeight: '300', color: constant.C_BLACK_100 },
    border1: { height: 1, backgroundColor: '#E5E5E5', width: '100%' },
    macroview: { width: '100%', paddingLeft: 20, paddingRight: 20, },
});

