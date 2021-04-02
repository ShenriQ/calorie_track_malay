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
import {RoundRectBlueBtn} from '../../components/Auth/Btns';
import Spacing from '../../components/Global/Spacing';
//svgs
import Svg_steps from '../../assets/svgs/diary/bg_steps.svg'

export default class vTrackingSteps2 extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            selectedIndex: 0,
            isModal: false,
            steps : '',
        }
    }

    componentDidMount = () => {
    }

    _renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={[{ width: '100%', }, Gstyles.row_center]}>
                    <View style={[Gstyles.flex_1, { flexDirection: 'row', paddingLeft: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <Feather name="arrow-left" size={24} color={constant.C_BLACK_100} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titleTxt}>Set Pedometer</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>

                    </View>
                </View>
            </View>
        )
    }

    _renderMain = () => {
        return (
            <View style={[Gstyles.col_center, {width: '100%'}]}>
                <Svg_steps />
                <Spacing height={20}/>
                <Text  style={styles.subTitle}>Enter Steps</Text>
                <Spacing height={20}/>
                <TextInput 
                    placeholder="0"
                    placeholderTextColor={constant.C_BLACK_40}
                    style={this.state.steps == '' ? styles.inactiveInput : styles.activeInput }
                    value={this.state.steps}
                    onChange={(value)=> this.setState({steps : value})}
                    textAlign={'center'}
                />
                <Spacing height={20}/>
                <Text style={styles.desc}>Your first 2000 steps are excluded from the calorie burn calculation. Most people achieve this unless very sedentary. </Text>
                <Spacing height={20}/>
                <RoundRectBlueBtn name="Save" onPress={()=>{}}/>
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
                        {this._renderMain()}
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
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', padding: 30
    },
    titleTxt: {
        textAlign: 'center', fontSize: 22, fontWeight: '700', color: constant.C_BLACK_80, marginLeft: 16, marginRight: 16
    },
    inactiveInput : {fontSize: 22, fontWeight: '700', width: '100%', height: 42, backgroundColor : constant.C_BLACK_10, borderRadius: 8},
    activeInput : {fontSize: 22, fontWeight: '700', width: '100%', height: 42, borderWidth: 1, borderColor: constant.C_BLUE_50, 
        backgroundColor : constant.C_BLACK_0, borderRadius: 8, padding: 0, },
    subTitle : {fontSize: 18, fontWeight: '400', color: constant.C_BLACK_100,},
    desc : {fontSize: 14, fontWeight: '400', color: constant.C_BLACK_60,},
});

