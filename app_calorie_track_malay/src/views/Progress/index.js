import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Input } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import { user_helper, profile_helper } from '@helper';
import SearchListItem from '../../components/Diary/SearchListItem';

export default class vProgress extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
        }
    }

    componentDidMount = () => {
    }

    render() {
        return (
            <View style={[styles.container, Gstyles.col_center]}>
                <Text>Progress</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: constant.C_BLACK_0,
    },
});

