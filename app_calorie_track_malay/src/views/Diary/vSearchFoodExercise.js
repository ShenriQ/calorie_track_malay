import React from 'react';
import {BackHandler, View, Text, StyleSheet, ScrollView, StatusBar,TouchableOpacity, Image, ImageBackground, TextInput , Platform,  } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Input } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';
// custom import
import {icons, tmp_imgs} from '@assets';
import {constant, common, lang} from '../../utils' //'@utils';
import {user_helper, profile_helper} from '@helper';
import Icon from 'react-native-vector-icons/Feather';
import SearchListItem from '../../components/Diary/SearchFoodExercise/SearchListItem';

export default class vLearn extends React.Component {
    constructor(props){
        super(props);

        this.props = props;
        this.state = {
            activeTab : 0,
            isModal : false,
        }
    }

    componentDidMount = () => {
    }

    goLogin = () => {
        this.props.navigation.navigate('login')
    }

    onQuitApp = () => {
        Platform.OS === 'ios' ?
        RNExitApp.exitApp() : BackHandler.exitApp()
    }

    food_items = [
        {
            title : 'Apple',
            description : '1.0 small',
            photo : tmp_imgs.apple,
            cal : '48Kcal',
        },
        {
            title : 'Apple Pie',
            description : '220g',
            photo : tmp_imgs.apple1,
            cal : '209Kcal',
        },
    ]

    goMedDetail = () => {
        this.props.navigation.navigate('meddetail')
    }


    render(){
        return (
            <View style = {styles.container}>
                {this.state.isModal && <ModalOption navigation = {this.props.navigation} onBackPressed = {() => this.setState({isModal : false})} />} 
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
                <Spinner  visible={this.state.loading} />
                <View style = {styles.header}>
                    <TouchableOpacity style = {styles.calorie_plus} onPress = {()=>{}}>
                        <AntDesign name = "arrowleft" size = {24} color = {constant.C_BLACK_0}/>
                    </TouchableOpacity>
                    <View style = {styles.headerTab}>
                        <TouchableOpacity 
                            activeOpacity={0.7} 
                            style = {[styles.headerTabBtn, this.state.activeTab==0 ? styles.activeTabBtn : {}]} 
                            onPress = {()=>this.setState({activeTab : 0})}>
                            <Text style = {[styles.fs_12, {color : this.state.activeTab==0 ? constant.C_BLACK_0 : constant.C_BLACK_60} ]}>Food</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            activeOpacity={0.7} 
                            style = {[styles.headerTabBtn, this.state.activeTab==1 ? styles.activeTabBtn : {}]} 
                            onPress = {()=>this.setState({activeTab : 1})}>
                            <Text style = {[styles.fs_12, {color : this.state.activeTab==1 ? constant.C_BLACK_0 : constant.C_BLACK_60}]} >Exercise</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {{width : 20}}>
                    </View>
                </View>
                <View style = {{ height: 50, marginTop : 20, }}>
                        <Input 
                            placeholder='Search name here...' placeholderTextColor = {constant.C_BLACK_40} 
                            onChangeText={value => this.setState({ pass: value })} errorMessage = {this.state.err_pass}
                            inputStyle = {{color : constant.C_BLACK_80, fontSize : 14}} secureTextEntry = {true}
                            leftIcon = {<Feather name = "search" size = {18} color = {constant.C_BLACK_40}/>}
                            inputContainerStyle = {styles.searchBar} 
                            />
                </View>
                <View style = {styles.formView} >
                    <ScrollView style = {{flex : 1, width : '100%'}} >
                        {
                            [].concat(this.food_items, this.food_items, this.food_items, this.food_items).map((item, index) => 
                                <SearchListItem item = {item} hiddenDate = {true} key = {index} onPress = {() => this.goMedDetail()}/>
                            )
                        }
                        <View style = {{height: 25,}}></View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1, flexDirection : 'column', alignItems : 'center', backgroundColor : constant.C_BLACK_0,
    },
    header : {
        backgroundColor : constant.C_BLUE_50, width : '100%', height : 90, alignItems : 'center', flexDirection : 'row', justifyContent : 'space-evenly',
    },
    fs_12 : {fontSize : 12},
    headerTab: {height : 50, width : 276, backgroundColor : constant.C_BLACK_0, borderRadius : 15, flexDirection : 'row', justifyContent : 'space-evenly', alignItems : 'center'},
    headerTabBtn : {height : 30, width : 120, borderRadius : 10, justifyContent : 'center', alignItems : 'center'},
    activeTabBtn : {backgroundColor : constant.C_BLUE_50},
    searchBar : {height : 50, width: '92%', elevation : 4, paddingLeft : 16, backgroundColor : constant.C_BLACK_0, borderBottomWidth : 0, borderRadius : 23},
    formView : {
        flex : 1, flexDirection : 'column', justifyContent : 'flex-start', alignItems : 'center', width : '100%', paddingTop : 10,
        paddingLeft : 25, paddingRight : 25,
    },
    titleView : {
        width : '100%', alignItems : 'center', marginTop : 8, marginBottom : 40,
    },
    titleTxt : {
        textAlign : 'center', fontSize : 22, fontWeight : '700', color : constant.Color_Text
    },
    termsTxt : {
        textAlign : 'center', fontSize : 12, color : constant.Color_Text1,
    },
    fogotTxt : {
        textAlign : 'center', fontSize : 14, fontWeight : '500', color : constant.Color_Primary
    },
    inputContainer : {height : 56, paddingLeft : 10, backgroundColor : constant.Color_InputBg, borderBottomWidth : 0, borderRadius : 8},
    logo : {
        width : 163, resizeMode : 'contain', marginTop : 10, marginBottom : 20
    },
    loginBtn : {
        width : '100%', borderRadius : 8, height : 56,
    },
    socialBtn : {
        justifyContent : 'center', alignItems : 'center', width : 44, height : 44, borderRadius : 22, borderColor : constant.Color_Primary, borderWidth : 1, 
    }
});

