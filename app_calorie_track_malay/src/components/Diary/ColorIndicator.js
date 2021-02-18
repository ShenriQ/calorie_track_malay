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


export default class ColorIndicator extends React.Component {
    constructor(props)
    {
        super(props);
        this.props = props;
    }

    componentDidMount(){
    
    }

    UNSAFE_componentWillReceiveProps = (props) => {
        this.props = props;
    }

    render() {
        return (
            <View style={[styles.view, {backgroundColor : this.props.color}]}></View>
        );
    }
    
}

const styles = StyleSheet.create({
    view : {width : 18, height : 18, borderRadius : 5, },
});
