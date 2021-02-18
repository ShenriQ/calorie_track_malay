import React from 'react';
import {BackHandler,Share, View, Text, Dimensions, Button,ImageBackground, FlatList, TextInput,StyleSheet, ScrollView , Image, TouchableOpacity} from 'react-native';
import {Avatar, Divider, Badge} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {width, height, totalSize} from 'react-native-dimension';
// custom import
import {icons, imgs} from '@assets';
import {constant, common, lang} from '@utils';
import {user_helper, profile_helper} from '@helper';

export default class TabNavBottom extends React.Component {
    constructor(props)
    {
        super(props);
        this.props = props;
        this.state = {
            sel_index : this.props.sel_index
        }
    }

    componentDidMount(){
    
    }

    UNSAFE_componentWillReceiveProps = (props) => {
        this.props = props;
        this.setState({sel_index : this.props.sel_index})
    }

    goPage = (route) => {
        this.props.navigation.navigate(route)
    }

    render() {
        return (
            <View style = {styles.container}>
                <TouchableOpacity style = {{padding : 8}} onPress= {() => this.goPage('discover')}>
                    <Image source = {this.state.sel_index != 0? icons.compass1 : icons.compass2} style = {{width : 26, height : 26, resizeMode : 'contain'}}/>
                </TouchableOpacity>
                <TouchableOpacity style = {{padding : 8}} onPress= {() => this.goPage('tracking')}>
                    <Image source = {this.state.sel_index != 1? icons.chart1 : icons.chart2} style = {{width : 23, height : 23, resizeMode : 'contain'}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress = {this.props.onPlusPressed} activeOpacity = {0.85} style = {{marginTop : -45,}}>
                    <Image source = {icons.plus} style = {{width : 56, height : 56, resizeMode : 'cover', borderColor : '#fff', borderWidth : 3, borderRadius : 28,  }}/>
                </TouchableOpacity>
                <TouchableOpacity style = {{padding : 8}} onPress= {() => this.goPage('learn')}>
                    <Image source = {this.state.sel_index != 2? icons.doc1 : icons.doc2} style = {{width : 32, height : 32, resizeMode : 'contain'}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress= {() => this.goPage('profile')}>
                    <Image source = {imgs.avatar_2} style = {{width : 32, height : 32, resizeMode : 'cover', borderColor : constant.Color_Primary, borderWidth : this.state.sel_index != 3 ? 0 : 2, borderRadius : 16, }}/>
                    <Image source = {icons.profil_sub} style = {{position : 'absolute', bottom : -2, right : -2, width : 20, height : 20, resizeMode : 'contain',  }}/>
                </TouchableOpacity>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container : {
        width : '100%', height : 58, backgroundColor : '#fff', elevation : 12, flexDirection : 'row', justifyContent : 'space-evenly', alignItems : 'center',
    },
});
