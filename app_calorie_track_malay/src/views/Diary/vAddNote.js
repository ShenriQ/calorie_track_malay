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
import Svg_unhappy from '../../assets/svgs/diary/ic_unhappy.svg'
import Svg_meh from '../../assets/svgs/diary/ic_meh.svg'
import Svg_ok from '../../assets/svgs/diary/ic_ok.svg'
import Svg_good from '../../assets/svgs/diary/ic_good.svg'
import Svg_excellent from '../../assets/svgs/diary/ic_excellent.svg'

export default class vAddNote extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            selectedId: 'Excellent',
            note: '',
        }
    }

    componentDidMount = () => {
    }

    list = [
        { name: 'Unhappy', icon: <Svg_unhappy width={50} height={50} /> },
        { name: 'Meh', icon: <Svg_meh width={50} height={50} /> },
        { name: 'Okay', icon: <Svg_ok width={50} height={50} /> },
        { name: 'Good', icon: <Svg_good width={50} height={50} /> },
        { name: 'Excellent', icon: <Svg_excellent width={50} height={50} /> },
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
                    <Text style={styles.titleTxt}>Notes</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: constant.C_BLUE_50 }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    _renderItem = (item, index) => {
        return (
            <TouchableOpacity onPress={()=>{this.setState({selectedId : item.name})}} key={index} style={[Gstyles.col_center,]}>
                {item.icon}
                <Text style={{
                    fontSize: 14, fontWeight: '400', marginTop : 6,
                    color: this.state.selectedId == item.name ? constant.C_BLUE_50 : constant.C_BLACK_100
                }}>{item.name}</Text>
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
                        <View style={[Gstyles.col_center, styles.innerview]}>
                            <View style={styles.noteInputView}>
                                <AntDesign name="edit" color={constant.C_BLACK_30} size={18}
                                    style={{ position: 'absolute', top: 16, left: 12 }} />
                                <TextInput
                                    style={[styles.noteinput]}
                                    onChangeText={text => this.setState({ note: text })}
                                    value={this.state.note}
                                    multiline={true}
                                    placeholder='Write notes here'
                                />
                            </View>
                            <Text style={[styles.qtxt, Gstyles.text_left]}>How are you feeling today?</Text>
                            <View style={styles.faceview}>
                                {
                                    this.list.map((item, index) =>
                                        this._renderItem(item, index)
                                    )
                                }
                            </View>
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
    itemview: { height: 86, width: '100%', paddingLeft: 20, paddingRight: 20, borderBottomColor: constant.C_BLACK_30, borderBottomWidth: 1 },
    modalTitleTxt: { fontSize: 14, fontWeight: '300', color: constant.C_BLACK_100 },
    border1: { height: 1, backgroundColor: '#E5E5E5', width: '100%' },
    innerview: { width: '100%', paddingLeft: 20, paddingRight: 20, },
    noteInputView: {
        height: 140, width: '100%', paddingLeft: 32, paddingRight: 12, paddingTop: 4, marginTop: 32, marginBottom: 26,
        backgroundColor: constant.C_BLACK_10, borderRadius: 10,
    },
    noteinput: { color: constant.C_BLACK_80, fontSize: 14, fontWeight: '300', textAlignVertical: 'top', height: '100%' },
    qtxt: { fontSize: 18, fontWeight: '700', color: constant.C_BLACK_80 },
    faceview : {flex: 1, width: '100%', marginTop: 32, flexDirection : 'row', justifyContent: 'space-between', alignItems: 'stretch'},
});

