import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
// svgs
import Svg_beans from '../../assets/svgs/food_cat/beans.svg';
import Svg_milk from '../../assets/svgs/food_cat/milk.svg';
import Svg_fish from '../../assets/svgs/food_cat/fish.svg';
import Svg_meat from '../../assets/svgs/food_cat/meat.svg';
import Svg_vegetable from '../../assets/svgs/food_cat/vegetable.svg';
import Svg_potato from '../../assets/svgs/food_cat/potato.svg';

export default class vFoodWEstimation extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            activeTab: 0,
            isModal: false,
        }
    }

    componentDidMount = () => {
    }

    data = [
        {
            cat: 'Cereal Products & Potatoes', icon: <Svg_potato />,
            items: [
                { name: '2 potatoes', w: '90g', cal: '80kcal', img: require('../../assets/imgs/tmp/food1.png') },
                { name: '2 ladles of rice', w: '150g', cal: '80kcal', img: require('../../assets/imgs/tmp/food2.png') },
                { name: '2 slices of wholemeal breads', w: '60g', cal: '140kcal', img: require('../../assets/imgs/tmp/food3.png') },
                { name: '1 cup of yellow noodles', w: '110g', cal: '230kcal', img: require('../../assets/imgs/tmp/food4.png') },
            ]
        },
        {
            cat: 'Vegetables', icon: <Svg_vegetable />,
            items: [
                { name: '2 potatoes', w: '90g', cal: '80kcal', img: require('../../assets/imgs/tmp/food1.png') },
                { name: '2 ladles of rice', w: '150g', cal: '80kcal', img: require('../../assets/imgs/tmp/food2.png') },
                { name: '1 cup of yellow noodles', w: '110g', cal: '230kcal', img: require('../../assets/imgs/tmp/food4.png') },
            ]
        },
        {
            cat: 'Meats & Poultry', icon: <Svg_meat />,
            items: [
                { name: '2 slices of wholemeal breads', w: '60g', cal: '140kcal', img: require('../../assets/imgs/tmp/food3.png') },
                { name: '1 cup of yellow noodles', w: '110g', cal: '230kcal', img: require('../../assets/imgs/tmp/food4.png') },
            ]
        },
        {
            cat: 'Fish & Seafood', icon: <Svg_fish />,
            items: [
                { name: '2 ladles of rice', w: '150g', cal: '80kcal', img: require('../../assets/imgs/tmp/food2.png') },
                { name: '1 cup of yellow noodles', w: '110g', cal: '230kcal', img: require('../../assets/imgs/tmp/food4.png') },
            ]
        },
        {
            cat: 'Cheese, Dairy & Eggs', icon: <Svg_milk />,
            items: [
                { name: '2 potatoes', w: '90g', cal: '80kcal', img: require('../../assets/imgs/tmp/food1.png') },
                { name: '1 cup of yellow noodles', w: '110g', cal: '230kcal', img: require('../../assets/imgs/tmp/food4.png') },
            ]
        },
        {
            cat: 'Beans & Pulses', icon: <Svg_beans />,
            items: [
                { name: '2 ladles of rice', w: '150g', cal: '80kcal', img: require('../../assets/imgs/tmp/food2.png') },
                { name: '2 slices of wholemeal breads', w: '60g', cal: '140kcal', img: require('../../assets/imgs/tmp/food3.png') },
                { name: '2 potatoes', w: '90g', cal: '80kcal', img: require('../../assets/imgs/tmp/food1.png') },
                { name: '1 cup of yellow noodles', w: '110g', cal: '230kcal', img: require('../../assets/imgs/tmp/food4.png') },
            ]
        },
    ]

    _renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={[{ width: '100%', }, Gstyles.row_center]}>
                    <View style={[Gstyles.flex_1, { flexDirection: 'row', paddingLeft: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <Feather name="arrow-left" size={24} color={constant.C_BLACK_80} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titleTxt}>Food Weight Estimation</Text>
                    <View style={{ width: 24, flex: 1 }} />
                </View>
            </View>
        )
    }

    _renderCategItem = (item, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => this.setState({ activeTab: index })} style={[Gstyles.col_center, styles.categ,
            { backgroundColor: this.state.activeTab == index ? constant.C_BLUE_50 : constant.C_BLACK_0 }]}>
                {item.icon}
                <Text style={{textAlign: 'center', fontSize: 14, fontWeight: '500', 
                    color : this.state.activeTab == index ? constant.C_BLACK_0 : constant.C_BLACK_50, marginTop: 8}}>{item.cat}</Text>
            </TouchableOpacity>
        )
    }

    _renderFoodItem = (item, index) => {
        return (
            <TouchableOpacity key={index} style={[Gstyles.row_center, styles.fooditem]}>
                <View >
                    <Image source={item.img} style={styles.foodimg}/>
                </View>
                <View style={[Gstyles.flex_1, {padding: 8}]}>
                    <Text style={{fontSize: 16, fontWeight: '400', color: constant.C_BLACK_100}}>{item.name}</Text>
                    <View style={[Gstyles.row_center_start, {marginTop: 8}]}>
                        <Text style={{fontSize: 14, fontWeight: '400', color: constant.C_BLUE_50}}>{item.w} / </Text>
                        <Text style={{fontSize: 14, fontWeight: '400', color: constant.C_RED_50}}>{item.cal}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                {this._renderHeader()}
                <View style={[Gstyles.flex_1, Gstyles.row_center, {height : '100%'}]} >
                    <View style={[Gstyles.col_center, {width: 140,  height: '100%' }]} >
                        <ScrollView style={{ width: '100%', height: '100%' }} >
                            {
                                this.data.map((item, index) =>
                                    this._renderCategItem(item, index)
                                )
                            }
                        </ScrollView>
                    </View>
                    <View style={{height: '100%', width: 2, backgroundColor: constant.C_BLUE_50}}></View>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, {height: '100%' }]} >
                        <ScrollView style={{ flex: 1, height: '100%', backgroundColor: constant.C_BLACK_10 }} >
                            {
                                this.data[this.state.activeTab].items.map((item, index) =>
                                    this._renderFoodItem(item, index)
                                )
                            }
                        </ScrollView>
                    </View>
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
        backgroundColor: constant.C_BLACK_0, width: '100%', elevation: 4, height: 80, paddingBottom: 8, alignItems: 'flex-end', flexDirection: 'row',
    },
    formView: {
        flex: 1,
    },
    titleTxt: {
        textAlign: 'center', fontSize: 22, fontWeight: '700', color: constant.C_BLACK_80, marginLeft: 16, marginRight: 16
    },
    categ: { width: '100%', height: 120, borderBottomWidth: 1, borderBottomColor: constant.C_BLACK_20, padding: 12, },
    fooditem: { width: '100%', height: 120, backgroundColor: constant.C_BLACK_0, borderBottomWidth: 1, borderBottomColor: constant.C_BLACK_20, padding: 12, },
    foodimg : {width: 84, height: 84, backgroundColor: '#F7F9FF', borderRadius: 16,},
});

