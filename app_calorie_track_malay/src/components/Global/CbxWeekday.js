import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { width, height, totalSize } from 'react-native-dimension';
// custom import
import { constant, common, lang, Gstyles } from '../../utils';


export default class CbxWeekday extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            checked: this.props.checked,
        }
    }

    componentDidMount() {

    }

    onChange=()=>{
        if (this.props.enabled == false) {return}
        this.setState({checked : !this.state.checked})
        this.props.onChange(!this.state.checked)
    }

    render() {
        return (
            <TouchableOpacity style={[styles.container, Gstyles.col_center, 
                {
                    borderColor : this.props.enabled ? constant.C_BLUE_50 : constant.C_BLACK_50,
                    backgroundColor : this.props.enabled ? (this.state.checked ? constant.C_BLUE_50 : constant.C_BLACK_0) : constant.C_BLACK_0  }]} 
                activeOpacity={0.8} onPress={()=>this.onChange()}>
                <Text style={[styles.text, {color : this.props.enabled ? (this.state.checked ? constant.C_BLACK_0 : constant.C_BLUE_50) : constant.C_BLACK_50}]}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    container : {width : 36, height : 36, borderRadius : 36, borderWidth : 2},
    text : {fontSize : 18, fontWeight : '500',},
});
