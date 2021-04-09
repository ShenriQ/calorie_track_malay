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

import Icon from 'react-native-vector-icons/Feather';
import SearchListItem from '../../components/Diary/SearchListItem';
import ColorIndicator from '../../components/Diary/ColorIndicator';
import PieChart from '../../components/Global/Pie';
//svgs
import Svg_barchart from '../../assets/svgs/diary/ic_barchart.svg';
import Svg_piechart from '../../assets/svgs/diary/ic_piechart.svg';
import Svg_goalflag from '../../assets/svgs/diary/ic_goal_flag.svg';
import Svg_goalweight from '../../assets/svgs/diary/ic_goal_weight.svg';
import Svg_goaltoal from '../../assets/svgs/diary/ic_goal_total.svg';
import Svg_btborder from '../../assets/svgs/diary/ic_bt_brd.svg';

export default class vNutritionInsight extends React.Component {
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

    nutri_goal_info = [
        { name: 'Protein', total: 100, goal: 160, left: 15 },
        { name: 'Carbohydrate', total: 0, goal: 0, left: 0 },
        { name: 'Sugar', total: 0, goal: 0, left: 0 },
        { name: 'Fat', total: 0, goal: 0, left: 0 },
        { name: 'Fibre', total: 0, goal: 0, left: 0 },
        { name: 'Salt', total: 0, goal: 0, left: 0 }
    ]

    macro_data = [{
        title: "Protein",
        unit: "50g",
        goal: "70%",
        name: "60%",
        value: 60,
        hexcolor: constant.C_BLUE_50,
        color: { 'r': 25, 'g': 99, 'b': 201 }
    }, {
        title: "Carbohydrate",
        unit: "2g",
        goal: "20%",
        name: "24%",
        value: 24,
        hexcolor: constant.C_RED_50,
        color: { 'r': 255, 'g': 71, 'b': 124 }
    }, {
        title: "Fat",
        unit: "10g",
        goal: "10%",
        name: "16%",
        value: 16,
        hexcolor: constant.C_TEAL_50,
        color: { 'r': 57, 'g': 198, 'b': 184 }
    }]

    _renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={[{ width: '100%', }, Gstyles.row_center]}>
                    <View style={[Gstyles.flex_1, { flexDirection: 'row', paddingLeft: 20 }]}>

                    </View>
                    <TouchableOpacity onPress={() => { }}>
                        <Feather name="chevron-left" size={24} color={constant.C_BLUE_50} />
                    </TouchableOpacity>
                    <Text style={styles.titleTxt}>{Strings["Today"]}</Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Feather name="chevron-right" size={24} color={constant.C_BLUE_50} />
                    </TouchableOpacity>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <AntDesign name="close" size={24} color={constant.C_BLACK_50} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }

    _renderBtnbar = () => {
        const btn = (name, active) => {
            return (
                <TouchableOpacity activeOpacity={0.8} style={[styles.tabBtn, Gstyles.col_center, Gstyles.mr_8,
                { backgroundColor: active == false ? constant.C_BLACK_0 : constant.C_BLUE_50 }]}>
                    <Text style={{ fontSize: 11, fontWeight: '500', color: active == true ? constant.C_BLACK_0 : constant.C_BLUE_50 }}>{name}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <View style={styles.nutri_btnbar}>
                {btn('1 Day', true)}
                {btn('1 Week', false)}
                {btn('1 Month', false)}
                <View style={Gstyles.flex_1}></View>
                <TouchableOpacity
                    onPress={() => this.setState({ activeTab: 0 })}
                    activeOpacity={0.8} style={[Gstyles.col_center, this.state.activeTab == 0 && styles.activeBorder,
                    { width: 40, height: 40, borderRadius: 10, backgroundColor: constant.C_BLACK_0, elevation: 2, marginRight: 8 }]}>
                    <Svg_barchart width={18} height={18} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.setState({ activeTab: 1 })}
                    activeOpacity={0.8} style={[Gstyles.col_center, this.state.activeTab == 1 && styles.activeBorder, {
                        width: 40, height: 40, borderRadius: 10, backgroundColor: constant.C_BLACK_0, elevation: 2,
                    }]}>
                    <Svg_piechart width={18} height={18} />
                </TouchableOpacity>
            </View>
        )
    }

    _renderProgressLabel = (type) => {
        const getIcon = () => {
            if (type == 'total') {
                return <Svg_goaltoal width={16} height={16}/>
            }
            else if (type == 'goal') {
                return <Svg_goalflag width={16} height={16}/>
            }
            else if (type == 'left') {
                return <Svg_goalweight width={16} height={16}/>
            }
        }
        const getTxt = () => {
            if (type == 'total') {
                return Strings["Total"]
            }
            else if (type == 'goal') {
                return Strings["Goals"]
            }
            else if (type == 'left') {
                return Strings["Left"]
            }
        }
        return (
            <View>
                <View style={[Gstyles.row_center, { marginBottom: 8 }]}>
                    {getIcon()}
                    <Text style={{ fontSize: 14, fontWeight: '500', color: constant.C_BLUE_50, marginLeft: 4 }}>{getTxt()}</Text>
                </View>
                <Svg_btborder />
            </View>
        )
    }
    _renderNutriInfoHeader = () => {
        return (
            <View style={[Gstyles.row_center, { borderBottomColor: constant.C_BLACK_10, borderBottomWidth: 2 }]}>
                <Text style={[Gstyles.flex_1, Gstyles.color_desc, Gstyles.fs_14, Gstyles.pl_8]}>{Strings["Type"]}</Text>
                <View style={Gstyles.row_center}>
                    <View style={Gstyles.mr_8}>{this._renderProgressLabel('total')}</View>
                    <View style={Gstyles.mr_8}>{this._renderProgressLabel('goal')}</View>
                    <View >{this._renderProgressLabel('left')}</View>
                </View>
            </View>
        )
    }
    _renderNutriInfoRow = (data, index) => {
        const getPercent = () => {
            if (data.goal > 0) {
                return data.total / data.goal
            }
            else {
                return 0
            }
        }
        return (
            <View key={index} style={[Gstyles.col_center, Gstyles.pt_12, Gstyles.pb_12]}>
                <View style={[Gstyles.row_center, Gstyles.pt_12, Gstyles.pb_12]}>
                    <Text style={[Gstyles.flex_1, Gstyles.color_desc, Gstyles.fs_16, Gstyles.pl_8]}>{data.name}</Text>
                    {
                        data.goal > 0 && <View style={Gstyles.row_center}>
                            <View style={[Gstyles.row_center, Gstyles.mr_8, { width: 64 }]}>
                                <Text style={[Gstyles.color_desc, Gstyles.fs_12, { color: constant.C_BLUE_50 }]}>{data.total}</Text>
                            </View>
                            <View style={[Gstyles.row_center, Gstyles.mr_8, { width: 64 }]}>
                                <Text style={[Gstyles.color_desc, Gstyles.fs_12, { color: constant.C_BLUE_50 }]}>{data.goal}</Text>
                            </View>
                            <View style={[Gstyles.row_center, { width: 64 }]}>
                                <Text style={[Gstyles.color_desc, Gstyles.fs_12, { color: constant.C_BLUE_50 }]}>{data.left}g</Text>
                            </View>
                        </View>
                    }
                </View>
                <View style={[Gstyles.w_100, Gstyles.pl_8, Gstyles.pr_8]}>
                    <Progress.Bar progress={getPercent()} color={constant.C_BLUE_50} width={null} height={8} borderWidth={0} unfilledColor={constant.C_BLACK_10} style={[Gstyles.w_100,]} />
                </View>
            </View>
        )
    }

    _renderPieChart = (data) => {
        const options = {
            margin: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            },
            width: 160,
            height: 160,
            color: '#2980B9',
            r: 35,
            R: 80,
            legendPosition: 'topLeft',
            animate: {
                type: 'oneByOne',
                duration: 200,
                fillTransition: 3
            },
            label: {
                fontFamily: 'Arial',
                fontSize: 10,
                fontWeight: true,
                color: '#FFFFFF'
            },
            color: [

            ]
            // pallete:
            //     [
            //       {'r':25,'g':99,'b':201},
            //       {'r':24,'g':175,'b':35},
            //       {'r':190,'g':31,'b':69}
            //     ]
        }
        return (
            <PieChart data={data}
                options={options}
                accessorKey="value"
            />
        )
    }

    _renderMacroInfoHeader = () => {
        return (
            <View style={[Gstyles.row_center, { borderBottomColor: constant.C_BLACK_10, borderBottomWidth: 2 }]}>
                <Text style={[Gstyles.flex_1, Gstyles.color_desc, Gstyles.fs_14, Gstyles.pl_8]}>
                    {/* {Strings["Type"]} */}
                </Text>
                <View style={Gstyles.row_center}>
                    <View style={Gstyles.mr_8}>{this._renderProgressLabel('total')}</View>
                    <View >{this._renderProgressLabel('goal')}</View>
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
                        <View style={styles.nutri_analysis}>
                            {this._renderBtnbar()}
                            {this.state.activeTab == 0 ?
                                <View>
                                    <Text style={styles.subjectTxt}>{Strings["Nutrients"]}</Text>
                                    <View style={styles.nutri_info}>
                                        {this._renderNutriInfoHeader()}
                                        {
                                            this.nutri_goal_info.map((item, index) =>
                                                this._renderNutriInfoRow(item, index)
                                            )
                                        }
                                    </View>
                                </View>
                                :
                                <View style={styles.macro_analysis}>
                                        <Text style={[styles.subjectTxt, { width:'100%' }]}>Macros</Text>
                                        <View style={[styles.nutri_pie_circle1, Gstyles.col_center]}>
                                            <View style={[styles.nutri_pie_circle2, Gstyles.col_center]}>
                                                {this._renderPieChart(this.macro_data)}
                                            </View>
                                        </View>
                                        <View style={styles.nutri_info}>
                                            {this._renderMacroInfoHeader()}
                                            {
                                                this.macro_data.map((item, index) =>
                                                    <View key={index} style={styles.nutri_item_info}>
                                                        <ColorIndicator color={item.hexcolor} />
                                                        <Text style={[Gstyles.fs_18, Gstyles.flex_1, Gstyles.color_title, Gstyles.ml_12]}>
                                                            {item.title}
                                                            <Text style={[Gstyles.fs_14, Gstyles.color_desc]}> ({item.unit})</Text>
                                                        </Text>
                                                        <Text style={[Gstyles.fs_18, Gstyles.mr_8, Gstyles.color_title, { textAlign: 'center', width: 64 }]}>{item.name}</Text>
                                                        <Text style={[Gstyles.fs_18, { color: constant.C_BLUE_50, textAlign: 'center', width: 64 }]}>{item.goal}</Text>
                                                    </View>
                                                )
                                            }
                                        </View>
                                </View>
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
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', paddingTop: 10,
        paddingLeft: 18, paddingRight: 18,
    },
    titleView: {
        height: 50, width: 276, backgroundColor: constant.C_BLACK_0, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
    },
    titleTxt: {
        textAlign: 'center', fontSize: 22, fontWeight: '700', color: constant.C_BLACK_80, marginLeft: 16, marginRight: 16
    },
    subjectTxt: { fontSize: 20, fontWeight: '500', color: constant.C_BLACK_80, marginTop: 24, marginBottom: 16 },
    nutri_analysis: {
        flex: 1,
        borderRadius: 24,
        padding: 16,
        elevation: 3,
        margin: 3,
        marginTop: 40,
        backgroundColor: constant.C_BLACK_0,
    },
    nutri_btnbar: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: -30 },
    nutri_info: {
        width: '100%',
        marginTop: 20,
        // backgroundColor: '#ff0',
    },
    macro_analysis: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    nutri_pie_circle1: { width: 224, height: 224, borderRadius: 112, borderWidth: 2, borderColor: constant.C_BLACK_10 },
    nutri_pie_circle2: { width: 200, height: 200, borderRadius: 100, backgroundColor: constant.C_BLACK_10 },

    pie_chart_num: { textAlign: 'center', fontSize: 18, fontWeight: '500', color: constant.C_BLACK_90 },
    pie_chart_unit: { textAlign: 'center', fontSize: 14, color: constant.C_BLACK_60 },
    tabBtn: { height: 40, width: 60, elevation: 2, borderRadius: 10, backgroundColor: '#fff' },
    activeBorder: { borderWidth: 1, borderColor: constant.C_BLUE_50 },
    nutri_item_info: { width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 24, paddingBottom: 8 },

    table: {
        backgroundColor: constant.C_BLACK_0,
        borderRadius: 10,
        shadowColor: '#f00',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        margin: 10,
        elevation: 5,
    },
    tr: { height: 60, flex: 1, flexDirection: 'row' },
    td: { height: '100%', flex: 1, borderWidth: 2, borderColor: constant.C_BLUE_10, justifyContent: 'center', alignItems: 'center' },
    td_odd: { backgroundColor: constant.C_BLUE_5 },
    // tr_gap : {width : '100%', height : 1, backgroundColor : constant},
    // td_gap : {height : '100%', width : 1},
});

