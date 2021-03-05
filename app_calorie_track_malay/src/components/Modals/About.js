import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Modal, ModalContent } from 'react-native-modals';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { width, height } from 'react-native-dimension';
import { Gstyles, constant } from '../../utils';

const AboutModal = (props) => {
    return (
        <Modal
            visible={props.visible}
            onTouchOutside={() => {
                props.close()
            }}
            modalStyle = {styles.container}
        >
            <ModalContent style={styles.container}>
                <View style={[Gstyles.row_center, Gstyles.w_100]}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => props.close()}>
                        <Ionicons name="close" size={24} color={constant.C_BLACK_0} />
                    </TouchableOpacity>
                    <View style={Gstyles.flex_1} />
                </View>
                <View style={[Gstyles.col_center, Gstyles.w_100, { paddingTop: 16, paddingBottom: 16, paddingLeft: 24, paddingRight: 24 }]}>
                    <Text style={[styles.titleTxt,]}>About Us</Text>
                    <Text style={[styles.descTxt,]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text</Text>
                    <Text style={[styles.titleTxt, {marginTop : 20}]}>Contact Us</Text>
                    <Text style={[styles.descTxt,]}>Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text</Text>
                </View>
            </ModalContent>
        </Modal>
    )
}


const styles = StyleSheet.create({
    container: {
        width: width(90), flexDirection: 'column', alignItems: 'center', backgroundColor: constant.C_BLUE_50, 
        borderRadius : 30
    },
    titleTxt: { fontSize: 24, fontWeight: '700', color: constant.C_BLACK_0, width: '100%', textAlign: 'center',
        marginTop : 8, marginBottom : 8,
     },
    descTxt: { fontSize: 14, fontWeight: '700', color: constant.C_BLACK_0, width: '100%', textAlign: 'center',
    marginTop : 8, }
})
export default AboutModal;