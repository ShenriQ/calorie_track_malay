import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Input } from 'react-native-elements';
// custom import
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
//svgs
import Svg_lamp from '../../assets/svgs/diary/ic_lamp1.svg'
import Svg_fruit from '../../assets/svgs/diary/ic_fruit.svg'
import Svg_camera from '../../assets/svgs/diary/ic_camera.svg'
import NutriInfoPie from '../../components/Global/NutriInfoPie';
import NutriInfoTable from '../../components/Global/NutriInfoTable';

export default class vCreateMeal extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            pagetype: this.props.route.params.pagetype,
            selectedIndex: 0,
            isModal: false,
        }
    }

    componentDidMount = () => {
    }

    mealitems = [
        { name: 'Corn', qty: '1 piece', cal: 200 },
        { name: 'Butter', qty: '1 tsp', cal: 30 },
        { name: 'Salt', qty: '1 tsp', cal: 1 },
    ]
    list = [
        { name: 'Calories', isReq: true, isEditable: true, unit: 'kcal' },
        { name: 'Protein', isReq: false, isEditable: false, unit: 'g' },
        { name: 'Carbohydrates', isReq: false, isEditable: false, unit: 'g' },
        { name: 'Fat', isReq: false, isEditable: false, unit: 'g' },
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
                    <Text style={styles.titleTxt}>{this.state.pagetype} Meal</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: constant.C_BLUE_50 }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    _renderPhotoView = () => {
        const onTakePhoto=()=>{
            this.props.navigation.navigate('diary_takephoto')
        }
        return (
            <TouchableOpacity onPress={()=>onTakePhoto()}>
                <ImageBackground source={{}} style={[Gstyles.col_center, { backgroundColor: constant.C_BLACK_10, borderRadius: 20, height: 200, width: '100%' }]}>
                    <View style={[Gstyles.col_center]}>
                        <Svg_camera width={64} height={64} />
                        <Text style={{ fontSize: 18, fontWeight: '500', color: constant.C_BLACK_30 }}>Add photo</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
    _renderNameInputView = () => {
        return (
            <View style={[Gstyles.row_center, styles.nameinputview]}>
                <AntDesign name='edit' size={20} color={constant.C_BLUE_50} />
                <Input
                    placeholder={'Name your meal'}
                    placeholderTextColor={constant.C_BLACK_30}
                    containerStyle={{ flex: 1, marginLeft: 8, height: 35, paddingTop: 3 }}
                    inputContainerStyle={{
                        width: '100%', height: 35, borderWidth: 0, borderColor: constant.C_BLACK_0
                    }}
                    inputStyle={{ color: constant.C_BLACK_100, fontSize: 18, fontWeight: '500', }}
                />
            </View>
        )
    }
    _renderMealItemsView = () => {
        return (
            <View style={[Gstyles.col_center, Gstyles.w_100]}>
                <View style={[Gstyles.row_center, styles.mealItemsView]}>
                    <Svg_fruit width={24} height={24} />
                    <Text style={{ flex: 1, fontSize: 16, color: constant.C_BLACK_80, marginLeft: 8 }}>Meal items</Text>
                    <TouchableOpacity style={{ padding: 4, borderRadius: 8, borderWidth: 1, borderColor: constant.C_BLUE_50 }}>
                        <AntDesign name="plus" size={16} color={constant.C_BLUE_50} />
                    </TouchableOpacity>
                </View>
                {
                    this.mealitems.map((item, index) =>
                        <View key={index} style={[Gstyles.row_center, { width: '100%', paddingLeft: 10, paddingTop: 8, paddingBottom: 8 }]}>
                            <View style={[Gstyles.col_center_start, { flex: 1, alignItems: 'flex-start' }]}>
                                <Text style={{ fontSize: 14, color: constant.C_BLACK_80, fontWeight: '400' }}>{item.name}</Text>
                                <Text style={{ fontSize: 10, color: constant.C_BLUE_50, fontWeight: '400' }}>{item.qty}</Text>
                            </View>
                            <Text style={{ fontSize: 14, color: constant.C_BLACK_80, fontWeight: '400' }}>{item.cal} kcal</Text>
                        </View>
                    )
                }
            </View>
        )
    }
    _renderDirectionLabelView = () => {
        return (
            <View style={[Gstyles.row_center, styles.mealItemsView]}>
                <Svg_lamp width={24} height={24} />
                <Text style={{ flex: 1, fontSize: 16, color: constant.C_BLACK_80, marginLeft: 8 }}>Directions</Text>
            </View>
        )
    }
    _renderDirectionView = () => {
        return (
            <TouchableOpacity activeOpacity={1} style={[styles.directionInputView]} >
                <View style={[Gstyles.row_center_start]}>
                    <AntDesign name='edit' size={16} color={constant.C_BLACK_30} />
                    <Text style={{ flex: 1, fontSize: 13, color: constant.C_BLACK_30, fontWeight: '300', marginLeft: 8 }}>Write instructions here</Text>
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
                        <View style={{ width: '100%', paddingTop: 25, paddingLeft: 18, paddingRight: 18 }} >
                            {this._renderPhotoView()}
                            {this._renderNameInputView()}
                            {this._renderMealItemsView()}
                            {this._renderDirectionLabelView()}
                            {this._renderDirectionView()}
                        </View>
                        <View style={{ width: '100%', height: 6, backgroundColor: constant.C_BLACK_10, marginTop: 16, marginBottom: 12 }}>
                        </View>
                        <View style={{ width: '100%', paddingLeft: 18, paddingRight: 18 }} >
                            <NutriInfoPie />
                            <NutriInfoTable />
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
    nameinputview: { borderBottomColor: constant.C_BLACK_50, borderBottomWidth: 1, width: '100%', marginTop: 18, paddingBottom: 6 },
    mealItemsView: { paddingTop: 14, paddingBottom: 7 },
    directionInputView: { marginTop: 4, width: '100%', minHeight: 97, borderRadius: 10, borderWidth: 1, borderColor: constant.C_BLUE_50, padding: 8 },
});

