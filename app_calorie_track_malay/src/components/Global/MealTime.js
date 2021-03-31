import React, { useEffect, useState } from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import {constant, common, Gstyles, Strings} from '../../utils';
import Svg_morning from '../../assets/svgs/ic_morning.svg'
import Svg_sun from '../../assets/svgs/ic_sun.svg'
import Svg_night from '../../assets/svgs/ic_night.svg'
import Svg_potato from '../../assets/svgs/ic_potato_chip.svg'
import Svg_plusbtn from '../../assets/svgs/ic_plusbtn.svg'

const MealTime = (props) => {
    return (
        <View style={[styles.set_occation, Gstyles.row_center]}>
            <Text style={[{ flex: 1, fontSize: 16, fontWeight: '700', color: constant.C_BLACK_100, marginRight: 50 }]}>Meal time</Text>
            <View style={[Gstyles.row_center]}>
                <View style={[Gstyles.col_center, { height: 70, marginRight: 18 }]}>
                    <Svg_morning />
                    <View style={Gstyles.flex_1}></View>
                    <TouchableOpacity style={styles.calorie_plus} onPress={() => { }}>
                        <Svg_plusbtn />
                    </TouchableOpacity>
                </View>
                <View style={[Gstyles.col_center, { height: 70, paddingTop: 4, marginRight: 18 }]}>
                    <Svg_sun />
                    <View style={Gstyles.flex_1}></View>
                    <TouchableOpacity style={styles.calorie_plus} onPress={() => { }}>
                        <Svg_plusbtn />
                    </TouchableOpacity>
                </View>
                <View style={[Gstyles.col_center, { height: 70, paddingTop: 5, marginRight: 18 }]}>
                    <Svg_night />
                    <View style={Gstyles.flex_1}></View>
                    <TouchableOpacity style={styles.calorie_plus} onPress={() => { }}>
                        <Svg_plusbtn />
                    </TouchableOpacity>
                </View>
                <View style={[Gstyles.col_center, { height: 70, paddingTop: 6, }]}>
                    <Svg_potato />
                    <View style={Gstyles.flex_1}></View>
                    <TouchableOpacity style={styles.calorie_plus} onPress={() => { }}>
                        <Svg_plusbtn />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    set_occation: { borderRadius: 20, backgroundColor: constant.C_BLACK_0,
        borderWidth: 1, borderColor: constant.C_BLACK_20,
         padding: 20, },
});

export default MealTime;
