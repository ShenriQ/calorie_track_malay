import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Pie from 'react-native-pie';
// custom import
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import ColorIndicator from '../../components/Diary/ColorIndicator';

export default class NutriInfoPie extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
        }
    }

    componentDidMount = () => {
    }

    nutri_info = [
        { name: 'Carb', w: '0.5g', percentage: 25, color: constant.C_TEAL_50 },
        { name: 'Fat', w: '0.5g', percentage: 25, color: constant.C_RED_50 },
        { name: 'Protein', w: '2.5g', percentage: 50, color: constant.C_BLUE_50 },
    ]
    pie_info = [
        { percentage: 25, color: constant.C_TEAL_50 },
        { percentage: 25, color: constant.C_RED_50 },
        { percentage: 50, color: constant.C_BLUE_50 },
    ]

    render() {
        return (
            <View style={styles.nutri_info}>
                <View style={styles.nutri_chart}>
                    <View style={styles.nutri_piechart}>
                        <Pie radius={50} innerRadius={35}
                            sections={this.pie_info}
                            strokeCap={'butt'}
                        />
                        <View style={{ position: 'absolute', top: '25%', left: '35%' }}>
                            <Text style={styles.pie_chart_num}>95</Text>
                            <Text style={styles.pie_chart_unit}>Kcal</Text>
                        </View>
                    </View>
                    <View style={styles.nutri_chart_info}>
                        {
                            this.nutri_info.map((item, index) =>
                                <View key={index} style={styles.nutri_item_info}>
                                    <ColorIndicator color={item.color} />
                                    <Text style={[styles.nutri_item_info_txt, { color: constant.C_BLACK_100, flex: 5 }]}>{item.name}</Text>
                                    <Text style={[styles.nutri_item_info_txt, { color: constant.C_BLACK_60, flex: 2 }]}>{item.w}</Text>
                                    <Text style={[styles.nutri_item_info_txt, { color: constant.C_BLUE_50 }]}>{item.percentage}%</Text>
                                </View>
                            )
                        }
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    nutri_info: { width: '100%', },
    nutri_chart: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center',},
    nutri_piechart: { marginRight: 24, },
    pie_chart_num: { textAlign: 'center', fontSize: 18, fontWeight: '500', color: constant.C_BLACK_90 },
    pie_chart_unit: { textAlign: 'center', fontSize: 14, color: constant.C_BLACK_60 },
    nutri_chart_info: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 12, },
    nutri_item_info: { width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', },
    nutri_item_info_txt: { fontSize: 14, paddingLeft: 12, marginTop: 6, marginBottom: 6 },
    color_desc: { color: constant.C_BLACK_60 }
});

