import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Input } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';
import { width, height } from 'react-native-dimension';

// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import { user_helper, profile_helper } from '@helper';
import Spacing from '../../components/Global/Spacing';

export default class vDiscover extends React.Component {
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

    food_categs = [
        {
            categ_name: 'Vegetables',
            food_name: 'Tomatoes',
            unit: 2,
            icon: require('../../assets/imgs/discover/tomato.png'),
            photo: require('../../assets/imgs/discover/food_blue_bg.png'),
            cal: 120,
        },
        {
            categ_name: 'Fruit',
            food_name: 'Blueberry',
            unit: 12,
            icon: require('../../assets/imgs/discover/blueberry.png'),
            photo: require('../../assets/imgs/discover/food_red_bg.png'),
            cal: 339,
        },
        {
            categ_name: 'Vegetables',
            food_name: 'Broccoli',
            unit: 5,
            icon: require('../../assets/imgs/discover/broccoli.png'),
            photo: require('../../assets/imgs/discover/food_green_bg.png'),
            cal: 160,
        },
    ]

    meal_plans = [
        {
            name: 'Meal 1 : Breakfast',
            vendor: 'By ABC',
            week: 1,
            rating: 4.7,
            photo: require('../../assets/imgs/tmp/meal.png'),
        },
        {
            name: 'Meal 2 : Lunch',
            vendor: 'By ABC',
            week: 1,
            rating: 4.7,
            photo: require('../../assets/imgs/tmp/meal.png'),
        },
    ]

    articles = [
        {
            name: 'Link to short article written by Nutritionist ABC',
            photo: require('../../assets/imgs/discover/article_bg.png'),
        },
        {
            name: 'Link to short article written by Nutritionist ABC',
            photo: require('../../assets/imgs/discover/article_bg.png'),
        },
    ]

    goAddFood = () => {
        this.props.navigation.navigate('add_food')
    }

    _renderFoodItem = (data, index) => {
        return (
            <TouchableOpacity key={index} activeOpacity={0.7} style={styles.food_categ_item}>
                <ImageBackground source={data.photo} style={styles.food_categ_img}>
                    <Image source={data.icon} style={styles.food_categ_icon} />
                    <Text style={styles.food_categ_name}>{data.categ_name}</Text>
                    <View style={[Gstyles.row_center, Gstyles.flex_1]}>
                        <Text style={[Gstyles.fs_12, Gstyles.flex_1, { color: constant.C_BLACK_0 }]}>{data.food_name}</Text>
                        <Text style={[Gstyles.fs_8, { color: constant.C_BLACK_0 }]}>{data.unit} Pcs</Text>
                    </View>
                    <Text style={[Gstyles.fs_8, { color: constant.C_BLACK_0 }]}>Total Calories</Text>
                    <Text style={[Gstyles.fs_20, { color: constant.C_BLACK_0, fontWeight: '700' }]}>
                        {data.cal}
                        <Text style={[Gstyles.fs_8, { color: constant.C_BLACK_0 }]}> Kcal</Text>
                    </Text>
                </ImageBackground>
            </TouchableOpacity>

        )
    }
    _renderMealPlanItem = (data, index) => {
        return (
            <TouchableOpacity key={index} activeOpacity={0.7} style={styles.meal_item}>
                <ImageBackground source={data.photo} style={styles.meal_img}>
                    <Text style={styles.meal_name}>{data.name}</Text>
                    <View style={[Gstyles.col_center, Gstyles.flex_1,]}>
                        <Text style={[Gstyles.fs_12, Gstyles.w_100, { color: constant.C_BLACK_0 }]}>{data.vendor}</Text>
                    </View>
                    <View style={[Gstyles.row_center, Gstyles.w_100,]}>
                        <View style={[Gstyles.row_center]}>
                            <TouchableOpacity activeOpacity={0.8} style={{ borderRadius: 6, padding: 4, marginRight: 6, backgroundColor: '#f0f0f070' }}>
                                <Feather name="calendar" size={18} color={constant.C_BLACK_0} />
                            </TouchableOpacity>
                            <View style={[Gstyles.col_center]}>
                                <Text style={{ fontSize: 12, fontWeight: '500', color: constant.C_BLACK_0 }}>{data.week}</Text>
                                <Text style={{ fontSize: 8, fontWeight: '400', color: constant.C_BLACK_0 }}>Weeks</Text>
                            </View>
                        </View>
                        <View style={[Gstyles.row_center, { marginLeft: 12 }]}>
                            <TouchableOpacity activeOpacity={0.8} style={{ borderRadius: 6, padding: 4, marginRight: 6, backgroundColor: '#f0f0f070' }}>
                                <Feather name="star" size={18} color={constant.C_BLACK_0} />
                            </TouchableOpacity>
                            <View style={[Gstyles.col_center]}>
                                <Text style={{ fontSize: 12, fontWeight: '500', color: constant.C_BLACK_0 }}>{data.rating}</Text>
                                <Text style={{ fontSize: 8, fontWeight: '400', color: constant.C_BLACK_0 }}>Star</Text>
                            </View>
                        </View>
                        <View style={Gstyles.flex_1} />
                    </View>
                </ImageBackground>
            </TouchableOpacity>

        )
    }
    _renderFoodCateg = () => {
        return (
            <View style={[Gstyles.col_center]}>
                <Text style={[styles.subjectTxt, Gstyles.w_100]}>Example of a topic title</Text>
                <View style={{ height: 160, marginTop: 12 }}>
                    <ScrollView horizontal={true} >
                        {this.food_categs.map((categ, index) =>
                            this._renderFoodItem(categ, index)
                        )}
                    </ScrollView>
                </View>
            </View>
        )
    }
    _renderMealPlan = () => {
        return (
            <View style={[Gstyles.col_center]}>
                <Text style={[styles.subjectTxt, Gstyles.w_100]}>Meal Plan</Text>
                <Text style={styles.descTxt}>A 1200 KcaL meal plan could look like this :</Text>
                <View style={{ height: 160, marginTop: 12 }}>
                    <ScrollView horizontal={true} >
                        {this.meal_plans.map((meal, index) =>
                            this._renderMealPlanItem(meal, index)
                        )}
                    </ScrollView>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                <View style={[styles.header, Gstyles.col_center]}>
                    <Input
                        placeholder={Strings["What do you want to search?"]} placeholderTextColor={constant.C_BLACK_50}
                        onChangeText={value => this.setState({ pass: value })} errorMessage={this.state.err_pass}
                        inputStyle={{ color: constant.C_BLACK_80, fontSize: 14 }}
                        leftIcon={<Feather name="search" size={18} color={constant.C_BLACK_50} />}
                        inputContainerStyle={styles.searchBar}
                        containerStyle={styles.searchWrap}
                    />
                </View>
                <View style={styles.headerTab}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.headerTabBtn, this.state.activeTab == 0 ? styles.activeTabBtn : {}]}
                        onPress={() => this.setState({ activeTab: 0 })}>
                        <Text style={[styles.headerTabTxt, { color: this.state.activeTab == 0 ? constant.C_BLACK_0 : constant.C_BLACK_60 }]}>{Strings["Food"]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.headerTabBtn, this.state.activeTab == 1 ? styles.activeTabBtn : {}]}
                        onPress={() => this.setState({ activeTab: 1 })}>
                        <Text style={[styles.headerTabTxt, { color: this.state.activeTab == 1 ? constant.C_BLACK_0 : constant.C_BLACK_60 }]} >{Strings["Exercise"]}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.formView} >
                    <ScrollView style={{ flex: 1, width: '100%' }} >
                        {
                            this._renderFoodCateg()
                        }
                        <Spacing height={20} />
                        {
                            this._renderMealPlan()
                        }
                        <Spacing height={20} />
                        <View style={[Gstyles.col_center]}>
                            <Text style={[styles.subjectTxt, Gstyles.w_100]}>How to improve metabolism?</Text>
                            <Text style={styles.descTxt}>Learn top 5 tips from professionals in the industry</Text>
                            <View style={{ marginTop: 12, width: '100%' }}>
                                {
                                    this.articles.map((article, index) =>
                                        <TouchableOpacity key={index} activeOpacity={0.7} style={styles.article_item}>
                                            <ImageBackground source={article.photo} style={[styles.article_img, Gstyles.col_center]}>
                                                <Text style={styles.article_name}>{article.name}</Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        </View>
                        <Spacing height={20} />
                    </ScrollView>
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
        backgroundColor: constant.C_BLUE_50, width: '100%', height: 150,
    },
    fs_12: { fontSize: 12 },
    headerTab: { height: 60, width: (width(90) - 20), marginTop: -25, padding: 10, elevation: 2, backgroundColor: constant.C_BLACK_0, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' },
    headerTabBtn: { height: '100%', flex: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    headerTabTxt: { fontSize: 14, fontWeight: '700', },
    activeTabBtn: { backgroundColor: constant.C_BLUE_50 },
    searchWrap: { height: 48, width: width(90), padding: 0, },
    searchBar: { height: 48, elevation: 4, paddingLeft: 16, margin: 0, backgroundColor: constant.C_BLACK_0, borderBottomWidth: 0, borderRadius: 24 },
    formView: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', paddingTop: 10,
        paddingLeft: 25, paddingRight: 25,
    },
    inputContainer: { height: 56, paddingLeft: 10, backgroundColor: constant.Color_InputBg, borderBottomWidth: 0, borderRadius: 8 },
    subjectTxt: { fontSize: 20, fontWeight: '700', color: constant.C_BLACK_80, marginTop: 12, paddingLeft: 12 },
    descTxt: { fontSize: 16, fontWeight: '400', color: constant.C_BG_WHITE, width: '100%', paddingLeft: 12 },
    food_categ_item: { width: 130, height: 160, marginRight: 8, },
    food_categ_img: { width: 130, height: 160, resizeMode: 'contain', padding: 14, paddingBottom: 16, },
    food_categ_icon: { width: 32, height: 32 },
    food_categ_name: { fontSize: 14, fontWeight: '700', color: constant.C_BLACK_0, marginTop: 6 },
    meal_item: { width: 240, height: 160, marginRight: 8, },
    meal_img: { width: 240, height: 160, resizeMode: 'contain', paddingLeft: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 24, },
    meal_name: { fontSize: 16, fontWeight: '700', color: constant.C_BLACK_0, marginTop: 6 },
    article_item : {marginTop : 12,},
    article_img: { width: '100%', height: 200, resizeMode: 'contain', paddingLeft : 20, paddingRight : 20},
    article_name : {fontSize: 20, fontWeight: '400', color: constant.C_BLACK_0, textAlign : 'center'}
});

