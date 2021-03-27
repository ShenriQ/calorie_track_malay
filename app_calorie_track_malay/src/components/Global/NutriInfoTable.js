import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Pie from 'react-native-pie';
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, lang, Gstyles } from '../../utils' //'@utils';
import ColorIndicator from '../../components/Diary/ColorIndicator';
import Strings from '../../utils/lang';

export default class NutriInfoTable extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            isFull: false,
        }
    }

    componentDidMount = () => {
    }

    _renderTable = (data) => {
        return (
            <View style={styles.table}>
                <View style={styles.tr}>
                    <View style={styles.td}>
                        <Text>Serving size</Text>
                    </View>
                    <View style={styles.td}>
                        <Text style={styles.color_desc}>1.0 Small</Text>
                    </View>
                </View>
                <View style={styles.tr}>
                    <View style={[styles.td, styles.td_odd]}>
                        <Text>Calories <Text style={styles.color_desc}>(Kcal)</Text></Text>
                    </View>
                    <View style={[styles.td, styles.td_odd]}>
                        <Text style={styles.color_desc}>88</Text>
                    </View>
                </View>
                <View style={styles.tr}>
                    <View style={styles.td}>
                        <Text>Protein <Text style={styles.color_desc}>(g)</Text></Text>
                    </View>
                    <View style={styles.td}>
                        <Text style={styles.color_desc}>0.5</Text>
                    </View>
                </View>
                <View style={styles.tr}>
                    <View style={[styles.td, styles.td_odd]}>
                        <Text >Carbohydrate <Text style={styles.color_desc}>(g)</Text></Text>
                    </View>
                    <View style={[styles.td, styles.td_odd]}>
                        <Text style={styles.color_desc}>25.1</Text>
                    </View>
                </View>
                <View style={styles.tr}>
                    <View style={styles.td}>
                        <Text>Sugar <Text style={styles.color_desc}>(g)</Text></Text>
                    </View>
                    <View style={styles.td}>
                        <Text style={styles.color_desc}>3.1</Text>
                    </View>
                </View>
                <View style={styles.tr}>
                    <View style={[styles.td, styles.td_odd]}>
                        <Text>Fat <Text style={styles.color_desc}>(g)</Text></Text>
                    </View>
                    <View style={[styles.td, styles.td_odd]}>
                        <Text style={styles.color_desc}>0.0</Text>
                    </View>
                </View>
                <View style={styles.tr}>
                    <View style={styles.td}>
                        <Text>Fibre <Text style={styles.color_desc}>(g)</Text></Text>
                    </View>
                    <View style={styles.td}>
                        <Text style={styles.color_desc}>1.2</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.nutri_info}>
                <View style={{width : '100%', marginBottom : 8}}>
                    <TouchableOpacity onPress={()=>this.setState({isFull : !this.state.isFull})} 
                        style={[Gstyles.row_center, {width : '100%', height: 45, borderRadius : 10, borderWidth :1, borderColor : constant.C_BLUE_50}]}>
                        <Text style={{fontSize : 14, fontWeight: '700', color : constant.C_BLUE_50, marginRight : 8}}>View full nutrition info</Text>
                        <Feather name={this.state.isFull ? "chevron-up" : "chevron-down"} size={18} color={constant.C_BLUE_50} />
                    </TouchableOpacity>
                </View>
                {
                    this.state.isFull && this._renderTable()
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    nutri_info: { width: '100%', },
    table: {
        backgroundColor: constant.C_BLACK_0,
        borderRadius: 10,
        shadowColor: '#f00',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        margin: 2,
        marginTop: 12,
        marginBottom: 16,
        elevation: 5,
    },
    tr: { height: 60, flex: 1, flexDirection: 'row' },
    td: { height: '100%', flex: 1, borderWidth: 2, borderColor: constant.C_BLUE_10, justifyContent: 'center', alignItems: 'center' },
    td_odd: { backgroundColor: constant.C_BLUE_5 },
    // tr_gap : {width : '100%', height : 1, backgroundColor : constant},
    // td_gap : {height : '100%', width : 1},
    color_desc: { color: constant.C_BLACK_60 }
});

