import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
// custom import
import { constant, common, Strings, Gstyles } from '../../utils';

export const RectBtn = (props) => {
    return (
        <TouchableOpacity style={[styles.view, Gstyles.col_center]} activeOpacity={0.8} onPress={() => props.onPress()}>
            <Text style={styles.txt}>{props.name}</Text>
        </TouchableOpacity>
    )
}

export const RoundRectBlueBtn = (props) => {
    return (
        <TouchableOpacity style={[styles.roundRectBlutBtn, Gstyles.col_center]} activeOpacity={0.8} onPress={() => props.onPress()}>
            <Text style={styles.roundRectBlutBtn_txt}>{props.name}</Text>
        </TouchableOpacity>
    )
}

export const LinkBtn = (props) => {
    return (
        <TouchableOpacity style={[Gstyles.col_center, styles.link_btn]} activeOpacity={0.7} onPress={() => props.onPress()}>
            <Text style={styles.link_txt}>{props.name}</Text>
        </TouchableOpacity>
    )
}

export const OutlineBtn = (props) => {
    return (
        <TouchableOpacity style={[Gstyles.col_center, styles.outlinebtn]} activeOpacity={0.6} onPress={() => props.onPress()}>
            <Text style={styles.outlinebtn_txt}>{props.name}</Text>
            {
                (props.sub_name != null && props.sub_name != "") &&
                <Text style={styles.outlinesub_txt}>{props.sub_name}</Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    view: { width: 273, height: 36, backgroundColor: constant.C_BLUE_50, marginTop: 8, marginBottom: 8 },
    txt: { fontSize: 14, color: constant.C_BLACK_0 },
    link_btn: { height: 36, marginTop: 8, marginBottom: 8 },
    link_txt: { fontSize: 14, color: constant.C_BLACK_100 },
    outlinebtn: { height: 51, width: '100%', marginTop: 8, marginBottom: 8, borderRadius: 10, borderWidth: 1, borderColor: constant.C_BLUE_50, backgroundColor: constant.C_BLACK_0 },
    outlinebtn_txt: { fontSize: 14, fontWeight: '500', color: constant.C_BLACK_100 },
    outlinesub_txt: { fontSize: 11, fontWeight: '500', color: constant.C_BLACK_50 },
    roundRectBlutBtn : {width: '100%', height: 46, backgroundColor: constant.C_BLUE_50, borderRadius : 12},
    roundRectBlutBtn_txt : {fontSize: 16, fontWeight: '700', color: constant.C_BLACK_0},
});
