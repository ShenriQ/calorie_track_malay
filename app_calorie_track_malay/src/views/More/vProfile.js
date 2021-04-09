import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { width, height } from 'react-native-dimension';

// custom import
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';

import Spacing from '../../components/Global/Spacing';
// svgs
import Weight_svg from '../../assets/svgs/ic_weight.svg';


export default class vProfile extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            loading: false
        }
    }

    componentDidMount = () => {
    }

    user_profile = {
        name: 'Ben',
        gender: 'Male',
        age: 30,
        height: '175 cm',
        start_weight: '75 kg',
        activity_level: 'Little or no activity',
        medical_condition: 'Nothing',
        overall_goal: 'To lose weight',
        goal_weight: '70 kg',
        to_lose_per_week: '0.45 kg',
        membership: 'Free membership',
        photo: require('../../assets/imgs/tmp/avatar.png'),
    }

    settingList = [
        {
            id: 'name',
            name: 'Name',
            icon: <SimpleLineIcons name="user" size={20} color={constant.C_BLUE_50} />
        },
        {
            id: 'gender',
            name: 'Gender',
            icon: <Fontisto name="transgender" size={24} color={constant.C_BLUE_50} />
        },
        {
            id: 'age',
            name: 'Age',
            icon: <MaterialIcons name="access-time" size={24} color={constant.C_BLUE_50} />
        },
        {
            id: 'height',
            name: 'Height',
            icon: <MaterialIcons name="height" size={24} color={constant.C_BLUE_50} />
        },
        {
            id: 'start_weight',
            name: 'Start Weight',
            icon: <Weight_svg width={24} height={24}/>
        },
        {
            id: 'activity_level',
            name: 'Activity Level',
            icon: <MaterialCommunityIcons name="run" size={24} color={constant.C_BLUE_50} />
        },
        {
            id: 'medical_condition',
            name: 'Medical Conditions',
            icon: <Ionicons name="medkit-outline" size={20} color={constant.C_BLUE_50} />
        },
    ]

    goalList = [
        {
            id: 'overall_goal',
            name: 'Overall Goal',
            icon: <MaterialCommunityIcons name="flag-outline" size={24} color={constant.C_BLUE_50} />
        },
        {
            id: 'goal_weight',
            name: 'Goal Weight',
            icon: <Weight_svg width={24} height={24} />
        },
        {
            id: 'to_lose_per_week',
            name: 'To Lose per Week',
            icon: <Feather name="trending-down" size={20} color={constant.C_BLUE_50} />
        },
    ]

    goAddFood = () => {
        this.props.navigation.navigate('add_food')
    }

    _renderHeader = () => {
        return (
            <View style={[Gstyles.row_center, Gstyles.w_100]}>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>this.props.navigation.goBack()}>
                    <Feather name="chevron-left" size={24} color={constant.C_BLACK_0} />
                </TouchableOpacity>
                <Text style={[styles.titleTxt, Gstyles.flex_1]}>My Profile & Goals</Text>
                <TouchableOpacity activeOpacity={0.7} >
                    <Text style={[Gstyles.fs_16, { color: constant.C_BLACK_0 }]}>Edit</Text>
                </TouchableOpacity>
            </View>
        )
    }
    _renderInfoItem = (data, index) => {
        return (
            <TouchableOpacity key={index} activeOpacity={0.7} style={styles.info_item}>
                <View style={[Gstyles.row_center, Gstyles.w_100, { height: '100%' }]}>
                    {data.icon}
                    <Text style={[styles.infoItemTxt, Gstyles.flex_1]}>{data.name}</Text>
                    <Text style={[styles.infoValTxt]}>{this.user_profile[data.id]}</Text>
                </View>
                <View style={{ height: 1, backgroundColor: '#E5E5E5', width: '100%' }} />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                <View style={[styles.header, Gstyles.col_center_start]}>
                    {this._renderHeader()}
                </View>
                <View style={styles.formView} >
                    <ScrollView style={{ flex: 1, width: '100%'}} >
                        <View style={{ flex: 1, width: '100%', padding: 4 }}>
                            <Text style={styles.settingTxt}>Basic Information</Text>
                            <View style={styles.infoView} >
                                {
                                    this.settingList.map((settingItem, index) =>
                                        this._renderInfoItem(settingItem, index)
                                    )
                                }
                            </View>
                            <Text style={[styles.settingTxt, { color: constant.C_BLACK_90 }]}>Personal Goals</Text>
                            <View style={styles.infoView} >
                                {
                                    this.goalList.map((settingItem, index) =>
                                        this._renderInfoItem(settingItem, index)
                                    )
                                }
                            </View>
                            <Spacing height={20} />
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
        backgroundColor: constant.C_BLUE_50, width: '100%', height: 252, paddingLeft: 12,
        paddingRight: 12, paddingTop: 40, borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
    },
    formView: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', paddingTop: 10,
        paddingLeft: 28, paddingRight: 28, marginTop: -180
    },
    infoView: { width: '100%', backgroundColor: constant.C_BLACK_0, elevation: 3, borderRadius: 16, },
    titleTxt: { fontSize: 18, fontWeight: '700', color: constant.C_BLACK_0, textAlign: 'center', width: '100%' },
    settingTxt: {
        fontSize: 18, fontWeight: '700', color: constant.C_BLACK_0, marginBottom: 8, width: '100%',
        textAlign: 'left', paddingLeft: 4, marginTop: 20
    },
    info_item: { flexDirection: 'column', paddingLeft: 12, paddingRight: 12, height: 50, },
    infoItemTxt: { fontSize: 14, fontWeight: '700', color: constant.C_BLUE_50, paddingLeft: 12 },
    infoValTxt: { fontSize: 14, fontWeight: '700', color: constant.C_BLACK_90, },
});

