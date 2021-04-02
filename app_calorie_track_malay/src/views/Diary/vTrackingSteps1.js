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
import Svg_gauge from '../../assets/svgs/diary/bg_gauge.svg'
import Svg_protein from '../../assets/svgs/diary/ic_protein.svg'
import Svg_carb from '../../assets/svgs/diary/ic_carb.svg'
import Svg_fat from '../../assets/svgs/diary/ic_fat.svg'

export default class vTrackingSteps1 extends React.Component {
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

    _renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={[{ width: '100%', }, Gstyles.row_center]}>
                    <View style={[Gstyles.flex_1, { flexDirection: 'row', paddingLeft: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <Feather name="arrow-left" size={24} color={constant.C_BLACK_100} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titleTxt}>Daily Step Goal</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>

                    </View>
                </View>
            </View>
        )
    }

    _renderInfo = () => {
        return (
            <View style={[Gstyles.col_center, {width: '100%'}]}>
                <Svg_gauge />
                <View style={[Gstyles.col_center, {position: 'absolute', top: '30%'}]}>
                    <Text style={{fontSize: 8, color: constant.C_BLACK_0}}>Steps walked</Text>
                    <Text style={{fontSize: 30, fontWeight: '700', color: constant.C_BLACK_0, paddingTop: 6, paddingBottom: 6}}>2828</Text>
                    <Text style={{fontSize: 13, color: constant.C_BLACK_0}}>Goal: 8000</Text>
                </View>
            </View>
        )
    }

    _renderDataView = () => {
        return (
            <View style={[Gstyles.col_center_start, styles.dataview]}>
                <Text style={{fontSize: 20, fontWeight: '500', color: constant.C_BLACK_0}}>Target: 2000 steps</Text>
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
                        {this._renderInfo()}
                        <View style={{ height: 30 }}></View>
                        {this._renderDataView()}
                        <View style={{ height: 20 }}></View>
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
        backgroundColor: constant.C_BLACK_0, width: '100%', height: 80, elevation: 6, paddingBottom: 8, alignItems: 'flex-end', flexDirection: 'row',
    },
    formView: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', padding: 20
    },
    titleTxt: {
        textAlign: 'center', fontSize: 22, fontWeight: '700', color: constant.C_BLACK_80, marginLeft: 16, marginRight: 16
    },
    dataview: {width: '100%', height: 350, borderRadius: 20, backgroundColor: constant.C_BLUE_50, paddingTop: 60},
});

