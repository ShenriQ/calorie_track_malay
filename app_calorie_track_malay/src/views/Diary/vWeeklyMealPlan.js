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
import Svg_mealplan from '../../assets/svgs/diary/ic_mealplan.svg';
import Svg_scancode from '../../assets/svgs/diary/ic_scanbarcode.svg';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get('window').height

export default class vWeeklyMealPlan extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
        }
    }

    componentDidMount = () => {
    }

    goPage = (page_name) => {
        this.props.navigation.navigate(page_name)
    }

    _renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={[{ width: '100%', }, Gstyles.row_center]}>
                    <View style={[Gstyles.flex_1, { flexDirection: 'row', paddingLeft: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <Feather name="chevron-left" size={24} color={constant.C_BLACK_80} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titleTxt}>Weekly Meal Plan</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                    </View>
                </View>
            </View>
        )
    }

    _renderAddBar = () => {
        return (
            <View style={[{ width: '100%', height: 49, backgroundColor: '#f0f4ff', marginTop: 8, marginBottom: 16 }, Gstyles.row_center]}>
                <View style={[{ flexDirection: 'row', paddingLeft: 20 }]}>
                    <TouchableOpacity style={[Gstyles.row_center]} onPress={() => { }}>
                        <Feather name="plus" size={18} color={constant.C_BLUE_50} />
                        <Text style={{ fontSize: 14, fontWeight: '400', color: constant.C_BLUE_50, marginLeft: 6 }}>Add</Text>
                    </TouchableOpacity>
                </View>
                <View style={[Gstyles.flex_1, Gstyles.col_center, { paddingLeft: 4, paddingRight: 4 }]}>
                </View>
                <View style={[Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: constant.C_BLUE_50 }}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                {this._renderHeader()}
                {this._renderAddBar()}
                <View style={styles.formView} >
                    <ScrollView style={{ flex: 1, width: '100%' }} >
                        
                        <View style={{ height: 25, }}></View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: constant.C_BLACK_10,
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
});

