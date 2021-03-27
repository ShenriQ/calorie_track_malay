import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Input } from 'react-native-elements';
// custom import
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
//svgs

export default class vCreateFood extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            pageIndex: 0,
            isModal: false,
        }
    }

    componentDidMount = () => {
    }

    list1 = [
        { name: 'Food Name', isOptional: false, },
        { name: 'Serving Size', isOptional: false, },
        { name: 'Serving per container', isOptional: false, },
        { name: 'Brand name', isOptional: true, },
    ]
    list2 = [
        { name: 'Calories', isReq: true, isEditable: false, unit: 'kcal' },
        { name: 'Protein', isReq: false, isEditable: false, unit: 'g' },
        { name: 'Carbohydrates', isReq: false, isEditable: true, unit: 'g' },
        { name: 'Sugar', isReq: false, isEditable: false, unit: 'g' },
        { name: 'Fat', isReq: false, isEditable: false, unit: 'g' },
        { name: 'Fibre', isReq: false, isEditable: false, unit: 'g' },
        { name: 'Salt', isReq: false, isEditable: false, unit: 'g' },
    ]

    _renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={[{ width: '100%', }, Gstyles.row_center]}>
                    <View style={[Gstyles.flex_1, { flexDirection: 'row', paddingLeft: 20 }]}>
                        {
                            this.state.pageIndex == 0 ?
                                <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                                    <Feather name="arrow-left" size={24} color={constant.C_BLACK_100} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => this.setState({ pageIndex: 0 })}>
                                    <Feather name="arrow-left" size={24} color={constant.C_BLACK_100} />
                                </TouchableOpacity>
                        }
                    </View>
                    <Text style={styles.titleTxt}>Create Food</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                        {
                            this.state.pageIndex == 0 ?
                                <TouchableOpacity onPress={() => this.setState({ pageIndex: 1 })}>
                                    <Text style={{ fontSize: 18, fontWeight: '500', color: constant.C_BLUE_50 }}>Next</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                                    <Text style={{ fontSize: 18, fontWeight: '500', color: constant.C_BLUE_50 }}>Done</Text>
                                </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        )
    }

    _renderInfoItem = (item, index) => {
        return (
            <View key={index} style={[Gstyles.row_center_start, { marginTop: 8, marginBottom: 8 }]}>
                <View style={[Gstyles.row_center_start, { paddingLeft: 10, paddingRight: 10, flex: 1, }]}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: constant.C_BLACK_100 }}>{item.name}</Text>
                    {
                        item.isOptional == true &&
                        <Text style={{ fontSize: 12, fontWeight: '400', color: constant.C_RED_50, marginLeft: 6 }}>(Optional)</Text>
                    }
                </View>
                <View style={[{ flexDirection: 'row', alignItems: 'center', }]}>
                    <Input
                        containerStyle={{ width: 100, height: 30, marginRight: 4 }}
                        inputContainerStyle={{
                            width: 100, height: 30,
                            borderColor: constant.C_BLUE_50, borderWidth: 1, borderRadius: 4
                        }}
                        inputStyle={{ color: constant.C_BLACK_100, fontSize: 14, fontWeight: '500', textAlign: 'center' }}
                    />
                </View>
            </View>
        )
    }

    _renderNutriItem = (item, index) => {
        return (
            <View key={index} style={[Gstyles.row_center_start, { marginTop: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: constant.C_BLACK_10 }]}>
                <View style={[Gstyles.row_center_start, { paddingRight: 10, flex: 1, }]}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: constant.C_BLACK_100 }}>{item.name}</Text>
                    {
                        item.isReq == true &&
                        <Text style={{ fontSize: 12, fontWeight: '400', color: constant.C_RED_50, marginLeft: 6 }}>(required)</Text>
                    }
                </View>
                <View style={[Gstyles.row_center]}>
                    <Input
                        keyboardType='decimal-pad'
                        containerStyle={{ width: 80, height: 26, marginRight: 4 }}
                        inputContainerStyle={{
                            width: 68, height: 26,
                            backgroundColor: item.isEditable ? constant.C_BLACK_0 : constant.C_BLACK_10,
                            borderColor: item.isEditable ? constant.C_BLUE_50 : constant.C_BLACK_10, borderWidth: 1, borderRadius: 4
                        }}
                        inputStyle={{ color: constant.C_BLACK_100, fontSize: 12, fontWeight: '700', textAlign: 'center' }}
                    />
                    <Text style={{ fontSize: 12, fontWeight: '400', color: '#bbb', minWidth: 26 }}>{item.unit}</Text>
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
                                this.state.pageIndex == 1 &&
                                <Text style={{fontSize: 16, fontWeight: '700', color: constant.C_BLACK_80, marginTop: 12, marginBottom : 12}}>Nutrition Facts</Text>
                            }
                            {
                                this.state.pageIndex == 0 ?
                                    this.list1.map((item, index) =>
                                        this._renderInfoItem(item, index)
                                    )
                                    :
                                    this.list2.map((item, index) =>
                                        this._renderNutriItem(item, index)
                                    )
                            }
                            <View style={{ height: 35 }}></View>
                            {
                                this.state.pageIndex == 1 &&
                                <TouchableOpacity style={[Gstyles.col_center, styles.doneBtn]}>
                                    <Text style={{ fontSize: 16, fontWeight: '700', color: constant.C_BLACK_0 }}>Done</Text>
                                </TouchableOpacity>
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
    doneBtn: { width: '100%', height: 45, borderRadius: 8, backgroundColor: constant.C_BLUE_50 }
});

