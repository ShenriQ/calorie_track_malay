import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, Animated, Platform, Dimensions} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Input, ListItem } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';
import { width, height } from 'react-native-dimension';
import Picker from '@gregfrench/react-native-wheel-picker'
var PickerItem = Picker.Item;
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import { user_helper, profile_helper } from '@helper';
import Spacing from '../../components/Global/Spacing';
// svgs
import Svg_Tomato from '../../assets/svgs/ic_tomato.svg';
import Svg_Brocooli from '../../assets/svgs/ic_broccoli.svg';
import Svg_Blueberry from '../../assets/svgs/ic_blueberry.svg';
import Svg_BgredCateg from '../../assets/svgs/bg_red_food_categ.svg';
import Svg_BgtealCateg from '../../assets/svgs/bg_teal_food_categ.svg';
import Svg_BgblueCateg from '../../assets/svgs/bg_blue_food_categ.svg';

import Svg_Plus from '../../assets/svgs/discover/ic_plus.svg';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get('window').height

export default class vDiscover extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            activeTab: 1,
            selectedFilter : 2,
            filterModalY: new Animated.Value(-screenHeight),
        }
    }

    componentDidMount = () => {
    }

    food_categs = [
        {
            categ_name: 'Vegetables',
            food_name: 'Tomatoes',
            unit: 2,
            icon: <Svg_Tomato width={32} height={32}/>,
            photo: <Svg_BgredCateg  style={{position : 'absolute', top : 0, left : 0, }}/>,
            cal: 120,
        },
        {
            categ_name: 'Fruit',
            food_name: 'Blueberry',
            unit: 12,
            icon: <Svg_Blueberry width={32} height={32}/>,
            photo: <Svg_BgblueCateg  style={{position : 'absolute', top : 0, left : 0, }}/>,
            cal: 339,
        },
        {
            categ_name: 'Vegetables',
            food_name: 'Broccoli',
            unit: 5,
            icon: <Svg_Brocooli width={32} height={32}/>,
            photo: <Svg_BgtealCateg  style={{position : 'absolute', top : 0, left : 0, }}/>,
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
    foods = [
        {
            name: 'Popcorn (Soft)', photo: require('../../assets/imgs/tmp/food1.png'), isFav: true, cnt: 737, cal : 288,
            user: { name: 'Joseph29_11', photo: require('../../assets/imgs/tmp/avatar.png') },
        },
        {
            name: 'Onigiri', photo: require('../../assets/imgs/tmp/food2.png'), isFav: false, cnt: 58, cal : 288,
            user: { name: 'Nakamura1411', photo: require('../../assets/imgs/tmp/avatar.png') },
        },
        {
            name: 'Sandwich', photo: require('../../assets/imgs/tmp/food3.png'), isFav: false, cnt: 16, cal : 205,
            user: { name: 'Michelandre', photo: require('../../assets/imgs/tmp/avatar.png') },
        },
        {
            name: 'Salad', photo: require('../../assets/imgs/tmp/food4.png'), isFav: false, cnt: 321, cal : 188,
            user: { name: 'Putra322', photo: require('../../assets/imgs/tmp/avatar.png') },
        },
        {
            name: 'Pancake', photo: require('../../assets/imgs/tmp/food5.png'), isFav: false, cnt: 541, cal : 235,
            user: { name: 'Joseph29_11', photo: require('../../assets/imgs/tmp/avatar.png') },
        },
        {
            name: 'Smoothie', photo: require('../../assets/imgs/tmp/food6.png'), isFav: false, cnt: 339, cal : 124,
            user: { name: 'Joseph29_11', photo: require('../../assets/imgs/tmp/avatar.png') },
        }
    ]
    filterList = ['Less than 300kcal', '300~400kcal', 'All', '400~500kcal', 'More than 500kcal']

    _renderFoodItem = (data, index) => {
        return (
            <TouchableOpacity key={index} activeOpacity={0.7} style={styles.food_categ_item}>
                <View 
                    style={styles.food_categ_img}
                >
                    {data.photo}
                    {data.icon}
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
                    
                </View>
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

    _renderMealsCateg = () => {
        const btns = [{ name: 'Recommended', color: constant.C_BLACK_0, bgcolor: constant.C_BLUE_50, bdcolor: constant.C_BLUE_50 },
        { name: 'Breakfast', color: constant.C_RED_50, bgcolor: constant.C_BLACK_0, bdcolor: constant.C_RED_50 },
        { name: 'Lunch', color: constant.C_TEAL_50, bgcolor: constant.C_BLACK_0, bdcolor: constant.C_TEAL_50 },
        { name: 'Dinner', color: constant.C_YELLOW_50, bgcolor: constant.C_BLACK_0, bdcolor: constant.C_YELLOW_50 },
        { name: 'Snack', color: constant.C_BLUE_50, bgcolor: constant.C_BLACK_0, bdcolor: constant.C_BLUE_50 },
        { name: 'Recently Uploaded', color: constant.C_RED_50, bgcolor: constant.C_BLACK_0, bdcolor: constant.C_RED_50 },

        ]
        return (
            <View style={[Gstyles.col_center, { marginTop: 8, marginBottom: 8 }]}>
                <ScrollView horizontal={true} >
                    {btns.map((btn, index) =>
                        <TouchableOpacity key={index} style={{ backgroundColor: btn.bgcolor, marginLeft : 4, marginRight: 10, paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, borderRadius: 6, borderWidth: 1, borderColor: btn.bdcolor }}>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: btn.color }}>{btn.name}</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
        )
    }
    _renderMealItem = (foodItem, index) => {
        const w = width(50) - 25
        return (
            <View key={index} style={[Gstyles.col_center, { padding: 8, width : w }]}>
                <TouchableOpacity onPress={()=>this.goMealDetail(foodItem)} style={[{ backgroundColor: constant.C_BLACK_0, elevation : 2, borderRadius : 12, width : '100%'}, Gstyles.col_center]}>
                    <ImageBackground source={foodItem.photo} style={{width : '100%', height : (w-12),}} imageStyle={{borderTopLeftRadius : 12, borderTopRightRadius : 12}}>
                        <TouchableOpacity activeOpacity={0.7} style={[{ position : 'absolute', top : 13, right : 13,  padding: 6, paddingTop : 2, paddingBottom : 2, }, Gstyles.row_center]}>
                            <Svg_Plus />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={[{ position : 'absolute', bottom : 16, right : 16,  padding: 6, paddingTop : 2, paddingBottom : 2, backgroundColor : constant.C_BLACK_0, borderRadius: 12 }, Gstyles.row_center]}>
                            <Text style={{ color: constant.C_RED_50, fontSize: 10, fontWeight : '500', marginRight: 4 }}>{foodItem.cnt}</Text>
                            <Ionicons name={foodItem.isFav ? "ios-heart" : "heart-outline"} size={16} color={constant.C_RED_50} />
                        </TouchableOpacity>
                    </ImageBackground>
                    <Text style={[{ fontSize: 14, fontWeight: '700', color: constant.C_BLACK_80, padding: 12, paddingBottom : 4 }, Gstyles.text_left]}>{foodItem.name}</Text>
                    {/* <View style={[{padding : 12, paddingTop : 0, flexDirection : 'row', width : '100%'}]}>
                        <Image source={foodItem.user.photo} style={{width : 16,height : 16, borderRadius : 16, resizeMode : 'cover'}}></Image>
                        <Text style={{fontSize : 10, fontWeight :'400', color : constant.C_BLACK_70, marginLeft : 4}}>{foodItem.user.name}</Text>
                    </View> */}
                    <Text style={[{fontSize: 14, fontWeight: '400', color: constant.C_BLUE_50, padding: 12, paddingTop: 0, paddingBottom : 8 }, Gstyles.text_left]}>{foodItem.cal} kcal</Text>
                </TouchableOpacity>
            </View>
        )
    }

    openFilterModal = () => {
        Animated.timing(this.state.filterModalY, {
            duration: 100,
            toValue: 0,
            useNativeDriver: true
        }).start();
    }

    closeFilterModal = () => {
        Animated.timing(this.state.filterModalY, {
            duration: 100,
            toValue: -screenHeight,
            useNativeDriver: true
        }).start();
    }
    _renderFilterModal = () => {
        
        return (
            <Animated.View
                style={[
                    styles.topmodal,
                    {
                        transform: [
                            { translateY: this.state.filterModalY }
                        ]
                    }
                ]}
            >
                <View style={{ width: '100%' }}>
                    <View style={[Gstyles.row_center, Gstyles.w_100, styles.header, {height : 80, paddingTop: 30, backgroundColor: constant.C_BLUE_50, paddingLeft : 20, paddingRight : 20 }]}>
                        <TouchableOpacity onPress={() => this.closeFilterModal()}>
                            <Feather name="chevron-left" size={24} color={constant.C_BLACK_0} />
                        </TouchableOpacity>
                        <Text style={[styles.titleTxt, Gstyles.flex_1]}>Filter</Text>
                        <TouchableOpacity onPress={() => this.closeFilterModal()}>
                            <Text style={{color : constant.C_BLACK_0, fontWeight: '700', fontSize : 14}}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[Gstyles.col_center, styles.filterModalContent, { paddingLeft: 0, paddingRight: 0 }]}>
                    <Picker style={{ width: width(100), height: 200, backgroundColor : constant.C_BLACK_0 }}
                            lineColor={constant.C_BLUE_50} //to set top and bottom line color (Without gradients)
                            selectedValue={this.state.selectedFilter}
                            itemStyle={{color : constant.C_BLUE_50, fontSize: 18 }}
                            onValueChange={(index) => this.setState({selectedFilter : index})}>
                            {this.filterList.map((value, i) => (
                                <PickerItem label={value} value={i} key={i} />
                            ))}
                        </Picker>
                    </View>
                </View>
            </Animated.View>
        )
    }

    goMealDetail = (foodItem) => {
        this.props.rootnav.navigate('discover_meal_detail', {foodItem : foodItem})
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderFilterModal()}
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                <View style={[styles.header, {justifyContent: 'flex-end'}]}>
                    {
                        this.state.activeTab == 1 &&
                        <View style={[Gstyles.row_center, { padding: 20, paddingBottom: 16 }]}>
                            <Input
                                placeholder={Strings["What do you want to search?"]} placeholderTextColor={constant.C_BLACK_50}
                                onChangeText={value => this.setState({ pass: value })} errorMessage={this.state.err_pass}
                                inputStyle={{ color: constant.C_BLACK_80, fontSize: 14 }}
                                leftIcon={<Feather name="search" size={18} color={constant.C_BLACK_50} />}
                                inputContainerStyle={styles.searchBar}
                                containerStyle={styles.searchWrap}
                            />
                            <TouchableOpacity activeOpacity={0.7} style={[{ margin: 8, }, Gstyles.row_center]} onPress={()=>this.openFilterModal()}>
                                <Feather name="filter" size={18} color={constant.C_BLACK_0} />
                                <Text style={{ color: constant.C_BLACK_0, fontSize: 14, marginLeft: 4 }}>Filter</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
                {/* <View style={{ width: '100%', flexDirection : 'row', paddingLeft: 25, paddingRight: 25 }}>
                    <View style={styles.headerTab}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={[styles.headerTabBtn, this.state.activeTab == 0 ? styles.activeTabBtn : {}]}
                            onPress={() => this.setState({ activeTab: 0 })}>
                            <Text style={[styles.headerTabTxt, { color: this.state.activeTab == 0 ? constant.C_BLACK_0 : constant.C_BLACK_60 }]}>{Strings["Featured"]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={[styles.headerTabBtn, this.state.activeTab == 1 ? styles.activeTabBtn : {}]}
                            onPress={() => this.setState({ activeTab: 1 })}>
                            <Text style={[styles.headerTabTxt, { color: this.state.activeTab == 1 ? constant.C_BLACK_0 : constant.C_BLACK_60 }]} >{Strings["Meals"]}</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
                <View style={styles.formView} >
                    <ScrollView style={{ flex: 1, width: '100%' }} >
                        {
                            this.state.activeTab == 0 && this._renderFoodCateg()
                        }
                        {
                            this.state.activeTab == 0 && <Spacing height={20} />
                        }
                        {
                            this.state.activeTab == 0 && this._renderMealPlan()
                        }
                        {
                            this.state.activeTab == 0 && <Spacing height={20} />
                        }
                        {
                            this.state.activeTab == 0 &&
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
                        }
                        {
                            this.state.activeTab == 1 && this._renderMealsCateg()
                        }
                        {
                            this.state.activeTab == 1 &&
                            <View style={{flexDirection : 'row', width : '100%', flexWrap : 'wrap'}}>
                                {
                                    this.foods.map((item, index) => 
                                    this._renderMealItem(item, index)
                                    )
                                }
                            </View>
                        }
                        
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
        backgroundColor: constant.C_BLUE_50, width: '100%', height: 105,
    },
    fs_12: { fontSize: 12 },
    headerTab: { height: 60, width: '100%', marginTop: -25, padding: 10, elevation: 2, backgroundColor: constant.C_BLACK_0, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' },
    headerTabBtn: { height: '100%', flex: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    headerTabTxt: { fontSize: 14, fontWeight: '700', },
    activeTabBtn: { backgroundColor: constant.C_BLUE_50 },
    searchWrap: { height: 40, flex: 1, padding: 0, },
    searchBar: { height: 40, elevation: 4, paddingLeft: 16, margin: 0, backgroundColor: constant.C_BLACK_0, borderBottomWidth: 0, borderRadius: 24 },
    formView: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', paddingTop: 10,
        paddingLeft: 25, paddingRight: 25,
    },
    inputContainer: { height: 56, paddingLeft: 10, backgroundColor: constant.Color_InputBg, borderBottomWidth: 0, borderRadius: 8 },
    titleTxt: { fontSize: 18, fontWeight: '700', color: constant.C_BLACK_0, textAlign: 'center' },
    subjectTxt: { fontSize: 20, fontWeight: '700', color: constant.C_BLACK_80, marginTop: 12, paddingLeft: 12 },
    descTxt: { fontSize: 16, fontWeight: '400', color: constant.C_BG_WHITE, width: '100%', paddingLeft: 12 },
    food_categ_item: { width: 130, height: 160, marginRight: 8, },
    food_categ_img: { width: 130, height: 160, resizeMode: 'contain', padding: 14, paddingBottom: 16, },
    food_categ_icon: { width: 32, height: 32 },
    food_categ_name: { fontSize: 14, fontWeight: '700', color: constant.C_BLACK_0, marginTop: 6 },
    meal_item: { width: 240, height: 160, marginRight: 8, },
    meal_img: { width: 240, height: 160, resizeMode: 'contain', paddingLeft: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 24, },
    meal_name: { fontSize: 16, fontWeight: '700', color: constant.C_BLACK_0, marginTop: 6 },
    article_item: { marginTop: 12, },
    article_img: { width: '100%', height: 200, resizeMode: 'contain', paddingLeft: 20, paddingRight: 20 },
    article_name: { fontSize: 20, fontWeight: '400', color: constant.C_BLACK_0, textAlign: 'center' },
    topmodal: {
        height: screenHeight,
        width: screenWidth,
        zIndex : 100000,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#00000055',
        justifyContent: 'flex-start',
        elevation:2, 
    },
    filterModalContent: {width: '100%', elevation:2, backgroundColor: constant.C_BLACK_0, borderBottomRightRadius: 12, borderBottomLeftRadius: 12, paddingBottom  :12, },
});

