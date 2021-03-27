import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Input } from 'react-native-elements';
// custom import
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
//svgs

export default class vNewExercise extends React.Component {
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
        { name: 'Name of exercise', unit : '', keytype : 'default', inputContainerStyle : styles.inputContainerstyle1},
        { name: 'Number', unit : '', keytype : 'decimal-pad', inputContainerStyle : styles.inputContainerstyle1},
        { name: 'Unit', unit : 'mins', keytype : 'decimal-pad', inputContainerStyle : styles.inputContainerstyle1},
        { name: 'Calories burnt', unit : 'kcal', keytype : 'decimal-pad', inputContainerStyle : styles.inputContainerstyle2},
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
                    <Text style={styles.titleTxt}>New Exercise</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <Text style={{fontSize: 18, fontWeight: '500', color: constant.C_BLUE_50}}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    _renderOptionItem = (item, index) => {
        return (
            <View key={index} style={[Gstyles.row_center_start, styles.listitem]}>
                <View style={[Gstyles.row_center_start, { paddingLeft: 10, paddingRight: 10, flex: 1, }]}>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: constant.C_BLACK_100 }}>{item.name}</Text>
                </View>
                <View style={[{ flexDirection: 'row', alignItems: 'center', width : 120 }]}>
                    <Input
                        keyboardType={item.keytype}
                        containerStyle={{ flex:1, height: 27,}}
                        inputContainerStyle={item.inputContainerStyle}
                        inputStyle={styles.inputstyle}
                    />
                    <Text style={{ fontSize: 12, fontWeight: '400', color: '#bbb',  }}>{item.unit}</Text>
                </View>
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
                            {
                                this.list.map((item, index) =>
                                    this._renderOptionItem(item, index)
                                )
                            }
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
    macroview: { width: '100%', paddingTop: 20, paddingLeft: 20, paddingRight: 20, },
    listitem: { paddingTop: 12, paddingBottom: 12, borderBottomColor : constant.C_BLACK_20, borderBottomWidth : 1 },
    inputstyle: { color: constant.C_BLUE_50, fontSize: 14, fontWeight: '500', textAlign:'right' },
    inputContainerstyle1: {
        width: '100%', height: 27,
        backgroundColor : constant.C_BLACK_0, borderBottomColor : constant.C_BLACK_20,
    },
    inputContainerstyle2: {
        width: '100%', height: 27,
        backgroundColor : constant.C_BLACK_0,
        borderColor: constant.C_BLACK_30, borderWidth: 1, borderRadius: 4
    },
});

