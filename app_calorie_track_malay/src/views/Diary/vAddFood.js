import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Input } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';
import Pie from 'react-native-pie';
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, lang } from '../../utils' //'@utils';
import { user_helper, profile_helper } from '@helper';
import Icon from 'react-native-vector-icons/Feather';
import SearchListItem from '../../components/Diary/SearchListItem';
import ColorIndicator from '../../components/Diary/ColorIndicator';
import Strings from '../../utils/lang';

export default class vAddFood extends React.Component {
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

    food_item = {
        title: 'Apple',
        description: '1.0 small',
        photo: tmp_imgs.apple,
        cal: '48Kcal',
    }
    nutri_info = [
        { name: 'Carb', w: '0.5g', percentage: 25, color: constant.C_TEAL_50 },
        { name: 'Fat', w: '0.5g', percentage: 25, color: constant.C_RED_50 },
        { name: 'Protein', w: '2.5g', percentage: 50, color: constant.C_BLUE_50 },
    ]

    _renderTable = (data) => {
        return (
            <View style={styles.table}>
                <View style={styles.tr}>
                    <View style={styles.td}>
                        <Text>Serving size</Text>
                    </View>
                    <View style={styles.td}>
                        <Text style={styles.color_desc}>1.0 Small</Text>
                    </View>
                </View>
                <View style={styles.tr}>
                    <View style={[styles.td, styles.td_odd]}>
                        <Text>Calories <Text style={styles.color_desc}>(Kcal)</Text></Text>
                    </View>
                    <View style={[styles.td, styles.td_odd]}>
                        <Text style={styles.color_desc}>88</Text>
                    </View>
                </View>
                <View style={styles.tr}>
                    <View style={styles.td}>
                        <Text>Protein <Text style={styles.color_desc}>(g)</Text></Text>
                    </View>
                    <View style={styles.td}>
                        <Text style={styles.color_desc}>0.5</Text>
                    </View>
                </View>
                <View style={styles.tr}>
                    <View style={[styles.td, styles.td_odd]}>
                        <Text >Carbohydrate <Text style={styles.color_desc}>(g)</Text></Text>
                    </View>
                    <View style={[styles.td, styles.td_odd]}>
                        <Text style={styles.color_desc}>25.1</Text>
                    </View>
                </View>
                <View style={styles.tr}>
                    <View style={styles.td}>
                        <Text>Sugar <Text style={styles.color_desc}>(g)</Text></Text>
                    </View>
                    <View style={styles.td}>
                        <Text style={styles.color_desc}>3.1</Text>
                    </View>
                </View>
                <View style={styles.tr}>
                    <View style={[styles.td, styles.td_odd]}>
                        <Text>Fat <Text style={styles.color_desc}>(g)</Text></Text>
                    </View>
                    <View style={[styles.td, styles.td_odd]}>
                        <Text style={styles.color_desc}>0.0</Text>
                    </View>
                </View>
                <View style={styles.tr}>
                    <View style={styles.td}>
                        <Text>Fibre <Text style={styles.color_desc}>(g)</Text></Text>
                    </View>
                    <View style={styles.td}>
                        <Text style={styles.color_desc}>1.2</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                <View style={styles.header}>
                    <TouchableOpacity style={styles.calorie_plus} onPress={() => this.props.navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color={constant.C_BLACK_80} />
                    </TouchableOpacity>
                    <View style={styles.titleView}>
                        <Text style={styles.titleTxt}>{Strings["Add Food"]}</Text>
                    </View>
                    <TouchableOpacity style={styles.calorie_plus} onPress={() => this.props.navigation.goBack()}>
                        <AntDesign name="close" size={24} color={constant.C_BLACK_40} />
                    </TouchableOpacity>
                </View>
                <View style={styles.formView} >
                    <ScrollView style={{ flex: 1, width: '100%' }} >
                        <SearchListItem item={this.food_item} hiddenAddBtn={true} onPress={() => { }} />
                        <View style={styles.nutri_info}>
                            <Text style={styles.subjectTxt}>{Strings["Nutrition info"]}</Text>
                            <View style={styles.nutri_chart}>
                                <View style={styles.nutri_piechart}>
                                    <Pie radius={50} innerRadius={35}
                                        sections={this.nutri_info}
                                        strokeCap={'butt'}
                                    />
                                    <View style={{ position: 'absolute', top: '25%', left: '35%' }}>
                                        <Text style={styles.pie_chart_num}>95</Text>
                                        <Text style={styles.pie_chart_unit}>Kcal</Text>
                                    </View>
                                </View>
                                <View style={styles.nutri_chart_info}>
                                    {
                                        this.nutri_info.map((item, index) =>
                                            <View key={index} style={styles.nutri_item_info}>
                                                <ColorIndicator color={item.color} />
                                                <Text style={[styles.nutri_item_info_txt, { color: constant.C_BLACK_100, flex: 5 }]}>{item.name}</Text>
                                                <Text style={[styles.nutri_item_info_txt, { color: constant.C_BLACK_60, flex: 2 }]}>{item.w}</Text>
                                                <Text style={[styles.nutri_item_info_txt, { color: constant.C_BLUE_50 }]}>%{item.percentage}</Text>
                                            </View>
                                        )
                                    }
                                </View>
                            </View>
                            {
                                this._renderTable()
                            }
                        </View>
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
        backgroundColor: constant.C_BLACK_0, width: '100%', height: 84, elevation: 6, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly',
    },
    fs_14: { fontSize: 14 },
    fs_24: { fontSize: 24 },
    formView: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', paddingTop: 10,
        paddingLeft: 25, paddingRight: 25,
    },
    titleView: {
        height: 50, width: 276, backgroundColor: constant.C_BLACK_0, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'
    },
    titleTxt: {
        textAlign: 'center', fontSize: 22, fontWeight: '700', color: constant.C_BLACK_80
    },
    subjectTxt: { fontSize: 20, fontWeight: '500', color: constant.C_BLACK_80, marginTop: 16, marginBottom: 8 },
    nutri_info: { width: '100%', },
    nutri_chart: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 },
    nutri_piechart: { marginRight: 24, },
    pie_chart_num: { textAlign: 'center', fontSize: 18, fontWeight: '500', color: constant.C_BLACK_90 },
    pie_chart_unit: { textAlign: 'center', fontSize: 14, color: constant.C_BLACK_60 },
    nutri_chart_info: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 12, },
    nutri_item_info: { width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', },
    nutri_item_info_txt: { fontSize: 14, paddingLeft: 12, marginTop: 6, marginBottom: 6 },

    table: {
        backgroundColor: constant.C_BLACK_0,
        borderRadius: 10,
        shadowColor: '#f00',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        margin: 2,
        marginTop : 20,
        marginBottom : 20,
        elevation: 5,
    },
    tr: { height: 60, flex: 1, flexDirection: 'row' },
    td: { height: '100%', flex: 1, borderWidth: 2, borderColor: constant.C_BLUE_10, justifyContent : 'center', alignItems : 'center' },
    td_odd: { backgroundColor: constant.C_BLUE_5 },
    // tr_gap : {width : '100%', height : 1, backgroundColor : constant},
    // td_gap : {height : '100%', width : 1},
    color_desc : {color : constant.C_BLACK_60}
});

