import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Input } from 'react-native-elements';
// custom import
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
//svgs

const minHeight = 270

export default class vAddDirection extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            selectedIndex: 0,
            isModal: false,
            text : '',
            height : 0,
        }
    }

    componentDidMount = () => {
    }

    list = [
        { name: 'Calories', isReq: true, isEditable: true, unit: 'kcal' },
        { name: 'Protein', isReq: false, isEditable: false, unit: 'g' },
        { name: 'Carbohydrates', isReq: false, isEditable: false, unit: 'g' },
        { name: 'Fat', isReq: false, isEditable: false, unit: 'g' },
    ]


    _renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={[{ width: '100%', }, Gstyles.row_center]}>
                    <View style={[Gstyles.flex_1, { flexDirection: 'row', paddingLeft: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <Ionicons name="close" size={24} color={constant.C_BLACK_100} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titleTxt}>Directions</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: constant.C_BLUE_50 }}>Save</Text>
                        </TouchableOpacity>
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
                {this._renderHeader()}
                <View style={styles.formView} >
                    <TextInput
                        multiline={true}
                        value={this.state.text}
                        onChangeText={(text) => {
                            this.setState({ text })
                        }}
                        onContentSizeChange={(event) => {
                            this.setState({ height: event.nativeEvent.contentSize.height })
                        }}
                        style={[styles.directionInput, { height: Math.max(minHeight, this.state.height) }]}
                    />
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
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', padding: 20
    },
    titleTxt: {
        textAlign: 'center', fontSize: 22, fontWeight: '700', color: constant.C_BLACK_80, marginLeft: 16, marginRight: 16
    },
    macroview: { width: '100%', paddingTop: 20, paddingLeft: 20, paddingRight: 20, },
    directionInput : {maxHeight: '90%', width: '100%', borderRadius: 12, borderWidth: 1, borderColor: constant.C_BLUE_50, 
        textAlignVertical : 'top', padding : 16, fontSize: 14, fontWeight: '400'},
});

