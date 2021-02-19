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
    nutri_chart_info: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 12, },
    nutri_item_info: { width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', },
    nutri_item_info_txt: { fontSize: 14, paddingLeft: 12, marginTop: 6, marginBottom: 6 }
});

