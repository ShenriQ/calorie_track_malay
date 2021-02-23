import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
// custom import
import { constant, common, Strings, Gstyles } from '../../utils';

export const InputSignin = (props) => {
    return (
        <TextInput
            style={styles.SigninInputView}
            placeholderTextColor={constant.C_BLACK_100}
            onChangeText={text => props.onChange(text)}
            value={props.value}
            placeholder={props.placeholder}
        />
    )
}

export const InputAnswer = (props) => {
    return (
        <TextInput
            style={styles.AnswerInputView}
            onChangeText={text => props.onChange(text)}
            value={props.value}
            placeholder={props.placeholder}
        />
    )
}

export const InputCheckbox = (props) => {
    return (
        <TouchableOpacity style={[Gstyles.row_center, styles.outlinebtn]} activeOpacity={0.6} onPress={() => props.onPress()}>
            <Text style={styles.outlinebtn_txt}>{props.name}</Text>
            <View style={[styles.checkbox, Gstyles.col_center]}>
                {
                    props.checked && <Feather name='check' size={20} color={constant.C_BLUE_50}/>
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    SigninInputView: {
        height: 51, width: '100%', paddingLeft: 12, paddingRight: 12, marginTop: 8, marginBottom: 8,
        borderRadius: 10, borderColor: constant.C_BLUE_50, borderWidth: 1,
    },
    AnswerInputView : {
        height: 112, width: 273, paddingLeft: 12, paddingRight: 12, marginTop: 8, marginBottom: 8, backgroundColor : constant.C_BLACK_5,
        borderRadius: 10, borderColor: constant.C_BLACK_40, borderWidth: 1, 
        fontSize : 36, color : constant.C_BLACK_100, textAlign : 'center', fontWeight : '900'
    },
    outlinebtn: {
        height: 51, width: '100%', marginTop: 8, marginBottom: 8, paddingLeft : 12, paddingRight : 12,
        borderRadius: 10, borderWidth: 1, borderColor: constant.C_BLUE_50,
        backgroundColor: constant.C_BLACK_0
    },
    outlinebtn_txt: { fontSize: 14, fontWeight: '500', color: constant.C_BLACK_100, flex: 1 },
    checkbox: { width: 31, height: 31, borderRadius: 5, borderWidth: 1, borderColor: constant.C_BLUE_50, backgroundColor: constant.C_BLACK_0 }
});
