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
import Svg_lchf from '../../assets/svgs/diary/ic_lchf_diet.svg'
import Svg_high from '../../assets/svgs/diary/ic_high-protein-diet.svg'
import Svg_suku from '../../assets/svgs/diary/ic_big_suku_diet.svg'
import Svg_well from '../../assets/svgs/diary/ic_wellbalanced_diet.svg'

export default class vOptiondiet extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            pagename: this.props.route.params.name,
            selectedIndex: 0,
            isModal: false,
        }
    }

    componentDidMount = () => {
    }

    list = {
        'LCHF Diet': {
            icon: <Svg_lchf width={100} height={100} />,
            txt: 'A well balanced diet: 20% daily calories from protein, 55% carbohydrates and 25% fat.'
        },
        'High Protein Diet': {
            icon: <Svg_high width={100} height={100} />,
            txt: 'A well balanced diet: 20% daily calories from protein, 55% carbohydrates and 25% fat.'
        },
        'SukuSukuSeparuh Diet': {
            icon: <Svg_suku width={100} height={100} />,
            txt: 'A well balanced diet: 20% daily calories from protein, 55% carbohydrates and 25% fat.'
        },
        'Well Balanced Diet': {
            icon: <Svg_well width={100} height={100} />,
            txt: 'A well balanced diet: 20% daily calories from protein, 55% carbohydrates and 25% fat.'
        },
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
                    <Text style={styles.titleTxt}>{this.state.pagename}</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                        
                    </View>
                </View>
            </View>
        )
    }

    _renderOptionItem = () => {
        return (
            <View style={[Gstyles.col_center, { marginTop: 120, marginBottom: 8, paddingLeft: 24, paddingRight: 24, borderRadius: 12, borderWidth: 1, borderColor: constant.C_BLUE_50 }]}>
                <View style={{ marginTop: -65 }}>
                    {this.list[this.state.pagename].icon}
                </View>
                <Text style={{ fontSize: 16, lineHeight: 24, fontWeight: '500', color: '#666666', textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
                    {this.list[this.state.pagename].txt}</Text>
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
                        <View style={styles.macroview}>
                            {this._renderOptionItem()}
                            <TouchableOpacity activeOpacity={0.7} style={[styles.sharebtn, Gstyles.col_center,]}>
                                <Text style={[{ color: constant.C_BLACK_0, fontSize: 16, fontWeight: '700' }]}>Set This Goal</Text>
                            </TouchableOpacity>
                        </View>
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
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%',
    },
    titleTxt: {
        textAlign: 'center', fontSize: 22, fontWeight: '700', color: constant.C_BLACK_80, marginLeft: 16, marginRight: 16
    },
    option_txt: { paddingLeft: 8, fontSize: 14, fontWeight: '500', color: constant.C_BLACK_80 },
    option_view: { height: 55, width: '100%', paddingLeft: 20, paddingRight: 20, borderBottomColor: constant.C_BLACK_10, borderBottomWidth: 1 },
    calorieview: { width: '100%', paddingLeft: 20, paddingRight: 20, paddingTop: 25, paddingBottom: 40, },
    categ_txt: { fontSize: 16, fontWeight: '500', color: constant.C_BLACK_100 },
    sharebtn: { width: 225, height: 45, marginTop: 60, marginBottom: 35, borderRadius: 10, backgroundColor: constant.C_BLUE_50, },
    modalTitleTxt: { fontSize: 14, fontWeight: '300', color: constant.C_BLACK_100 },
    border1: { height: 1, backgroundColor: '#E5E5E5', width: '100%' },
    macroview: { width: '100%', paddingLeft: 20, paddingRight: 20, alignItems: 'center' },
});

