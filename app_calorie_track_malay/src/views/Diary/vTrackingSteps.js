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

export default class vTrackingSteps extends React.Component {
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
        { name: 'Daily step goal', value: '2000' },
        { name: 'Pedometer steps', value: '' },
        { name: 'Sync with device', value: '' },
        { name: 'Iphone apple health', value: '' },
        { name: 'FitBit', value: '' },
        { name: 'Google fit', value: '' },
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
                    <Text style={styles.titleTxt}>Steps</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>

                    </View>
                </View>
            </View>
        )
    }

    _renderItem = (item, index) => {
        return (
            <TouchableOpacity key={index} style={[Gstyles.row_center_start, styles.itemview]}>
                <View style={[{ paddingLeft: 10, paddingRight: 10, flex: 1, }]}>
                    <Text style={{ fontSize: 20, fontWeight: '400', color: constant.C_BLACK_80 }}>{item.name}</Text>
                </View>
                <View style={[{ flexDirection: 'row', alignItems: 'center', }]}>
                    <Text style={{ fontSize: 20, fontWeight: '500', color: constant.C_BLUE_50 }}>{item.value}</Text>
                </View>
            </TouchableOpacity>
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
                        {
                            this.list.map((item, index) =>
                                this._renderItem(item, index)
                            )
                        }
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
    itemview: { height: 86, width: '100%', paddingLeft: 20, paddingRight: 20, borderBottomColor: constant.C_BLACK_30, borderBottomWidth: 1 },
    modalTitleTxt: { fontSize: 14, fontWeight: '300', color: constant.C_BLACK_100 },
    border1: { height: 1, backgroundColor: '#E5E5E5', width: '100%' },
    macroview: { width: '100%', paddingLeft: 20, paddingRight: 20, },
});

