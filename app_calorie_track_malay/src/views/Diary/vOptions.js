import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Input } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';
// import Pie from 'react-native-pie';
import * as Progress from 'react-native-progress';
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import { user_helper, profile_helper } from '@helper';
import Icon from 'react-native-vector-icons/Feather';
import SearchListItem from '../../components/Diary/SearchListItem';
import ColorIndicator from '../../components/Diary/ColorIndicator';
import PieChart from '../../components/Global/Pie';
//svgs
import Svg_weekview from '../../assets/svgs/diary/ic_week-view.svg';
import Svg_easydays from '../../assets/svgs/diary/ic_easier-days.svg';
import Svg_calbadge from '../../assets/svgs/diary/ic_calorie-badge.svg';
import Svg_sharediary from '../../assets/svgs/diary/ic_share-diary.svg';
import Svg_wellbalance from '../../assets/svgs/diary/ic_well-balanced-diet.svg';
import Svg_highprotein from '../../assets/svgs/diary/ic_high-protein-diet.svg';
import Svg_lchf from '../../assets/svgs/diary/ic_lchf-diet.svg';
import Svg_setmyown from '../../assets/svgs/diary/ic_setmyown.svg';
import Svg_suku from '../../assets/svgs/diary/ic_suku_diet.svg';

export default class vOptions extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            activeTab: 0,
            isModal: false,
        }
    }

    componentDidMount = () => {
    }

    options = [
        {name : 'Reports', list : [{name : 'Week View', page: 'diary_weekview', icon : <Svg_weekview width={33} height={33} />}]},
        {name : 'Settings', list : [
            {name : 'Easier Days', page: 'diary_easierday', icon : <Svg_easydays width={33} height={33} />},
            {name : 'Calorie Badge', page: 'diary_caloriebadge', icon : <Svg_calbadge width={33} height={33} />},
        ]},
        {name : 'Sharing', list : [{name : 'Share Diary', page: 'diary_share', icon : <Svg_sharediary width={33} height={33} />}]},
        {name : 'Custom Nutrition', list : [
            {name : 'Well Balanced Diet', page: 'diary_optiondiet', icon : <Svg_wellbalance width={33} height={33} />},
            {name : 'SukuSukuSeparuh Diet', page: 'diary_optiondiet', icon : <Svg_suku width={33} height={33} />},
            {name : 'High Protein Diet', page: 'diary_optiondiet', icon : <Svg_highprotein width={33} height={33} />},
            {name : 'LCHF Diet', page: 'diary_optiondiet', icon : <Svg_lchf width={33} height={33} />},
            {name : 'Set My Own', page: 'diary_setmyown', icon : <Svg_setmyown width={33} height={33} />},
        ]},
    ]

    _renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={[{ width: '100%', }, Gstyles.row_center]}>
                    <View style={[Gstyles.flex_1, { flexDirection: 'row', paddingLeft: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <Feather name="arrow-left" size={24} color={constant.C_BLACK_80} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titleTxt}>Diary Options</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <AntDesign name="close" size={24} color={constant.C_BLACK_50} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    _renderOptionItem = (option, index) => {
        return (
            <TouchableOpacity key={index} onPress={()=>{this.props.rootnav.navigate(option.page, {name : option.name})}}  style={[Gstyles.row_center, styles.option_view,]}>
                {option.icon}
                <Text style={[Gstyles.flex_1, styles.option_txt]}>{option.name}</Text>
                <View style={Gstyles.row_center}>
                    <Feather name="chevron-right" size={22} color={constant.C_BLACK_50} />
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
                            this.options.map((option, index1) =>
                            <View key={index1}>
                                <View style={[styles.categ_view, Gstyles.row_center_start]}>
                                    <Text style={styles.categ_txt}>{option.name}</Text>
                                </View>
                                <View>
                                    {
                                        option.list.map((item, index2) => 
                                        this._renderOptionItem(item, index2)
                                        )
                                    }
                                </View>
                            </View>
                            
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
    option_txt: {paddingLeft : 8, fontSize : 14, fontWeight : '400', color : constant.C_BLACK_80},
    option_view: {height : 55, width : '100%', paddingLeft : 20, paddingRight : 20, borderBottomColor: constant.C_BLACK_10, borderBottomWidth: 1},
    categ_view : {height : 47, width :'100%', paddingLeft : 20, backgroundColor : constant.C_BLACK_10},
    categ_txt : {fontSize : 14, fontWeight : '500', color : constant.C_BLACK_100},
});

