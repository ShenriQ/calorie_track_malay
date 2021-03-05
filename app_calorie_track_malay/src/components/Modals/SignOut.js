import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Modal, ModalContent, BottomModal, ModalTitle } from 'react-native-modals';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { width, height } from 'react-native-dimension';
import { Gstyles, constant } from '../../utils';

const SignoutModal = (props) => {
    return (
        <BottomModal
            visible={props.visible}
            onTouchOutside={() => props.close()}
            height={223}
            width={1}
            onSwipeOut={() => props.close()}
            modalTitle={
                <ModalTitle
                    title="Are you sure to sign out?"
                    hasTitleBar
                />
            }
        >
            <ModalContent
                style={{
                    flex: 1,
                    backgroundColor: constant.C_BLACK_0,
                }}
            >
                <View style={[Gstyles.col_center, Gstyles.w_100, { paddingTop: 16, paddingBottom: 16, paddingLeft: 24, paddingRight: 24 }]}>
                    <TouchableOpacity activeOpacity={0.7} style={[styles.signoutBtn, Gstyles.col_center]}>
                        <Text style={[styles.btnTxt, {color: constant.C_BLACK_0,}]}>Sign Out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={[styles.cancelBtn, Gstyles.col_center]}>
                        <Text style={[styles.btnTxt, {color: constant.C_BLUE_50,}]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ModalContent>
        </BottomModal>
    )
}


const styles = StyleSheet.create({
    container: {
        width: width(90), flexDirection: 'column', alignItems: 'center', backgroundColor: constant.C_BLUE_50,
        borderRadius: 30
    },
    titleTxt: {
        fontSize: 24, fontWeight: '700', color: constant.C_BLACK_0, width: '100%', textAlign: 'center',
        marginTop: 8, marginBottom: 8,
    },
    btnTxt: { fontSize: 18, fontWeight: '700', width: '100%', textAlign: 'center', },
    signoutBtn: { width : '100%', height : 47, backgroundColor : constant.C_BLUE_50, borderRadius : 5, marginTop : 16},
    cancelBtn: { width : '100%', height : 47, backgroundColor : constant.C_BLACK_0, borderRadius : 5, 
        borderColor : constant.C_BLUE_50, borderWidth : 1, marginTop : 16 },
})
export default SignoutModal;