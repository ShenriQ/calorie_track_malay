import React from 'react';
import {BackHandler,Share, View, Text, Dimensions, Button,ImageBackground, FlatList, TextInput,StyleSheet, ScrollView , Image, TouchableOpacity} from 'react-native';
import {Avatar, Divider, Badge} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {width, height, totalSize} from 'react-native-dimension';
// custom import
import {icons, imgs} from '@assets';
import {constant, common, lang} from '../../utils';
import {user_helper, profile_helper} from '@helper';


export default class SearchListItem extends React.Component {
    constructor(props)
    {
        super(props);
        this.props = props;
        this.state = {
            item : this.props.item,
        }
    }

    componentDidMount(){
    
    }

    UNSAFE_componentWillReceiveProps = (props) => {
        this.props = props;
    }

    render() {
        return (
            <TouchableOpacity style = {styles.container} activeOpacity = {0.8} onPress = {this.props.onPress}>
                <View style = {styles.row}>
                    <Image source = {this.state.item.photo} style = {styles.img}/>
                </View>
                <View style = {styles.detail}>
                    <Text style = {styles.title}>{this.state.item.title}</Text>
                    <Text style = {styles.description}>{this.state.item.description}</Text>
                </View>
                <View style = {styles.calorie}>
                    <Text style = {styles.calorie_val}>{this.state.item.cal}</Text>
                    {
                        this.props.hiddenAddBtn == false && 
                        <TouchableOpacity style = {styles.calorie_plus} onPress = {()=>this.props.onPress()}>
                            <Feather name = "plus" size = {24} color = {constant.C_BLUE_50}/>
                        </TouchableOpacity>
                    }
                </View>
            </TouchableOpacity>
        );
    }
    
}

const styles = StyleSheet.create({
    container : {
        width : '100%', flexDirection : 'row', paddingTop : 10, paddingBottom : 10, 
        // marginTop : 10, 
        // borderRadius : 13, 
        // backgroundColor : '#fff', 
        // elevation : 1,
    },
    img : {width : 60, height : 60, resizeMode : 'contain', borderRadius : 16, },
    row : {flexDirection : 'row', justifyContent : 'flex-start', alignItems : 'flex-start',},
    detail : {flex : 1, flexDirection : 'column', justifyContent : 'flex-start', alignItems : 'flex-start', marginLeft : 16},
    calorie : { flexDirection : 'row', justifyContent : 'center', alignItems : 'center', },
    calorie_val : {fontSize : 12, color : constant.C_BLACK_70},
    calorie_plus : {padding : 4, marginLeft : 10},
    date : {flexDirection : 'row', justifyContent : 'flex-end', alignItems : 'center', marginTop : 12, },
    title : {color : constant.C_BLACK_80, fontSize : 16, fontWeight : 'bold', marginRight : 20,},
    description : {color : constant.C_BLACK_70, fontSize : 12, fontWeight : '300',marginTop : 6, marginBottom : 4},
});
