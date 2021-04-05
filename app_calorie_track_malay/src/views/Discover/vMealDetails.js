import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { width, height } from 'react-native-dimension';
import { Button, Input } from 'react-native-elements';
import { Modal, ModalContent, BottomModal, ModalTitle } from 'react-native-modals';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Picker from '@gregfrench/react-native-wheel-picker'
var PickerItem = Picker.Item;
import Toast, { BaseToast } from 'react-native-toast-message';
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import Spacing from '../../components/Global/Spacing';
import CustomSwipePicker from '../../components/Discover/CustomSwipePicker';
import NutriInfoPie from '../../components/Global/NutriInfoPie';
// svgs
import Svg_service from '../../assets/svgs/discover/ic_service.svg'
import Svg_cooktime from '../../assets/svgs/discover/ic_cooking-time.svg'
import Svg_preptime from '../../assets/svgs/discover/ic_prep-time.svg'
import Svg_breakfast from '../../assets/svgs/discover/ic_breakfast.svg'
import Svg_lunch from '../../assets/svgs/discover/ic_lunch.svg'
import Svg_dinner from '../../assets/svgs/discover/ic_dinner.svg'
import Svg_snack from '../../assets/svgs/discover/ic_snack.svg'
import Svg_fruit from '../../assets/svgs/diary/ic_fruit.svg'
import Svg_delete from '../../assets/svgs/discover/ic_delete.svg'
import Svg_lamp from '../../assets/svgs/discover/ic_lamp.svg'

const toastConfig = {
    success: ({ text1, ...rest }) => (
        <BaseToast
            {...rest}
            style={{
                borderLeftColor: constant.C_BLACK_0, borderLeftWidth: 0, borderTopLeftRadius: 8, borderTopRightRadius: 8,
                justifyContent: 'center', alignItems: 'center', width: '100%', height: 54, padding: 0
            }}
            contentContainerStyle={{
                width: '100%',
                paddingHorizontal: 0, height: 54, backgroundColor: constant.C_RED_50, borderTopLeftRadius: 8, borderTopRightRadius: 8,
                justifyContent: 'center', alignItems: 'center'
            }}
            text1Style={{
                fontSize: 18,
                color: constant.C_BLACK_0,
                fontWeight: '700',
                textAlign: 'center',
                width: '100%',
            }}
            text1={text1}
            text2={null}
            leadingIcon={null}
            trailingIcon={null}
        />
    )
};

export default class vMealDetails extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            isEdit: false,
            foodItem: {},
            activeTab: 0,
            isShowTrackModal: false,
            curSettingId: 1,
            curTrackDateIndex : 180,
            curTrackDate: new Date(),
            curTrackTime: 1,
            curServingSize: 2,
            isShowEditModal: false,
            isEditMore: false,
            direction: '',
            directionInputHeight: 0,
            datepicker_list: []
        }
    }

    static getDerivedStateFromProps(props, current_state) {
        if (current_state.page !== props.route.params.foodItem) {
            return {
                foodItem: props.route.params.foodItem,
            }
        }
        return null
    }

    componentDidMount = () => {
        // prepare date list for date picker (1 year)
        let tmpDates = []
        for (var i = -180; i < 180; i++) {
            tmpDates.push(moment(new Date()).add(i, 'days')) 
        }
        
        this.setState({datepicker_list : tmpDates})
    }

    shoppingList = [{ name: 'Fish' }, { name: 'Chicken' }, { name: 'Potatoes' }, { name: 'Olives' }, { name: 'Bread' },]
    foodList = [{ name: 'Corn', unit: '1 piece', photo: tmp_imgs.apple, qty: '12 kcal' },
    { name: 'Butter', unit: '1 teaspoon', photo: tmp_imgs.apple, qty: '7 kcal' },
    { name: 'Salt', unit: '1 teaspoon', photo: tmp_imgs.apple, qty: '5 kcal' },]
    mealTimes = ['Breakfast', 'Lunch', 'Dinner', 'Snack']
    servings = [
        {
            value: 0,
            label: '0                     '
        },
        {
            value: 1,
            label: '1                     ',
        },
        {
            value: 2,
            label: '2                     ',
        },
        {
            value: 3.25,
            label: '3             0.25',
        },
        {
            value: 4.5,
            label: '4             0.50',
        }
    ]

    getDateString=(date_obj = new Date())=>{
        let today_str = moment(new Date()).format("ddd MMM D")
        let date_str = moment(date_obj).format("ddd MMM D")
        if(today_str == date_str) {
            return 'Today'
        }
        return date_str
    }

    getMealTimeIcon = (time) => {
        if (time == 'Breakfast') { return <Svg_breakfast /> }
        if (time == 'Lunch') { return <Svg_lunch /> }
        if (time == 'Dinner') { return <Svg_dinner /> }
        if (time == 'Snack') { return <Svg_snack /> }
        return <View />
    }

    _renderHeader = () => {
        return (
            <View style={[Gstyles.row_center, Gstyles.w_100, styles.header]}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Feather name="chevron-left" size={24} color={constant.C_BLACK_0} />
                </TouchableOpacity>
                <Text style={[styles.titleTxt, Gstyles.flex_1]}>{this.state.foodItem.name}</Text>
                <View style={{ width: 20 }} />
            </View>
        )
    }

    _renderMealInfo = () => {
        return (
            <View style={[Gstyles.col_center]} >
                <ImageBackground source={this.state.foodItem.photo} style={{ width: '100%', height: 225, resizeMode: 'cover' }}>
                    <TouchableOpacity activeOpacity={0.8} style={[{ position: 'absolute', top: 16, right: 16, padding: 8, paddingTop: 4, paddingBottom: 4, backgroundColor: constant.C_BLACK_0, borderRadius: 20 }, Gstyles.row_center]}>
                        <Text style={{ color: constant.C_RED_50, fontSize: 14, fontWeight: '500', marginRight: 6 }}>{this.state.foodItem.cnt}</Text>
                        <Ionicons name={this.state.foodItem.isFav ? "ios-heart" : "heart-outline"} size={20} color={constant.C_RED_50} />
                    </TouchableOpacity>
                </ImageBackground>
                <View style={[Gstyles.col_center, { alignItems: 'flex-end', paddingRight: 20, width: '100%' }]}>
                    <View style={[Gstyles.col_center, styles.calorie_view]}>
                        <Text style={styles.calorie_txt}>288 kcal</Text>
                    </View>
                </View>
                <View style={[Gstyles.col_center, { padding: 12, paddingLeft: 24, paddingRight: 24, width: '100%' }]} >
                    <Text style={[Gstyles.text_left, styles.descTxt]}>Created by</Text>
                    <View style={[Gstyles.row_center, { width: '100%', alignItems: 'flex-start' }]}>
                        <View style={[Gstyles.row_center, { flex: 1, }]}>
                            <TouchableOpacity activeOpacity={0.7} >
                                <Image source={this.state.foodItem.user.photo} style={{ width: 32, height: 32, borderRadius: 32, resizeMode: 'cover' }}></Image>
                            </TouchableOpacity>
                            <Text style={[Gstyles.flex_1, { color: constant.C_BLUE_50, width: '100%', fontSize: 14, fontWeight: '700', paddingLeft: 8 }]}>{this.state.foodItem.user.name}</Text>
                        </View>
                        <View style={[Gstyles.col_center, {}]}>
                            <View style={[Gstyles.row_center, { width: 120 }]}>
                                <Svg_preptime />
                                <Text style={[Gstyles.flex_1, { color: constant.C_BLACK_70, fontSize: 10, fontWeight: '700', paddingLeft: 8 }]}>
                                    Prep time
                                </Text>
                                <Text style={[{ color: constant.C_BLACK_100, fontSize: 10, fontWeight: '400', paddingLeft: 8 }]}>
                                    20 mins
                                </Text>
                            </View>
                            <View style={[Gstyles.row_center, { width: 120 }]}>
                                <Svg_cooktime />
                                <Text style={[Gstyles.flex_1, { color: constant.C_BLACK_70, fontSize: 10, fontWeight: '700', paddingLeft: 8 }]}>
                                    Cook time
                                </Text>
                                <Text style={[{ color: constant.C_BLACK_100, fontSize: 10, fontWeight: '400', paddingLeft: 8 }]}>
                                    4 mins
                                </Text>
                            </View>
                            <View style={[Gstyles.row_center, { width: 120 }]}>
                                <Svg_service />
                                <Text style={[Gstyles.flex_1, { color: constant.C_BLACK_70, fontSize: 10, fontWeight: '400', paddingLeft: 8 }]}>
                                    Serves
                                </Text>
                                <Text style={[{ color: constant.C_BLACK_100, fontSize: 10, fontWeight: '400', paddingLeft: 8 }]}>
                                    4 pax
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[Gstyles.row_center_start, { width: '100%', marginBottom: 10, paddingLeft: 20, }]}>
                    <TouchableOpacity onPress={() => this.setState({ isEditMore: false, isShowEditModal: true })} style={[Gstyles.row_center_start,]}>
                        <AntDesign name="edit" color={constant.C_BLUE_50} size={16} />
                        <Text style={{ marginLeft: 4, fontSize: 12, fontWeight: '400', color: constant.C_BLACK_100 }}>Edit meal</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.border1} />
            </View>
        )
    }

    _renderMealListItem = (data, index) => {
        return (
            <View key={index} style={[Gstyles.row_center, { height: 48, width: '100%', marginTop: 6, marginBottom: 6 }]}>
                {/* <Image source={data.photo} style={{ width: 46, height: 46, borderRadius: 5 }} /> */}
                {
                    this.state.isShowEditModal == true &&
                    <TouchableOpacity>
                        <Svg_delete />
                    </TouchableOpacity>
                }
                <View style={[Gstyles.col_center, Gstyles.flex_1, { paddingLeft: 12 }]}>
                    <Text style={[Gstyles.text_left, { color: constant.C_BLACK_100, fontSize: 14, fontWeight: '700', }]}>{data.name}</Text>
                    <Text style={[Gstyles.text_left, { color: constant.C_BLUE_50, fontSize: 10, fontWeight: '500', }]}>{data.unit}</Text>
                </View>
                <Text style={{ color: constant.C_BLACK_100, fontSize: 14, fontWeight: '500', paddingLeft: 12 }}>{data.qty}</Text>
            </View>
        )
    }

    _renderSearchItem = (data, index) => {
        return (
            <View key={index} style={[styles.setting_item, Gstyles.col_center]} >
                <View style={[Gstyles.row_center, { height: 48, width: width(95), paddingLeft: 14, paddingRight: 14 }]}>
                    <Image source={data.photo} style={{ width: 42, height: 42, borderRadius: 5 }} />
                    <Text style={[Gstyles.flex_1, { color: constant.C_BLACK_100, width: '100%', fontSize: 18, fontWeight: '700', paddingLeft: 12 }]}>{data.name}</Text>
                    <TouchableOpacity >
                        <Feather name="plus-circle" size={28} color={constant.C_BLUE_50} />
                    </TouchableOpacity>
                </View>
                <View style={styles.border1} />
            </View>
        )
    }

    _renderTrackModal = () => {
        return (
            <Modal
                visible={this.state.isShowTrackModal}
                onTouchOutside={() => this.setState({ isShowTrackModal: false })}
                height={height(90) > 400 ? 500 : height(90)}
                width={1}
                swipeDirection={null}
                swipeThreshold={1000}
                // onSwipeOut={() => this.setState({ isShowTrackModal: false })}
                modalTitle={
                    <View style={[Gstyles.w_100,]} >
                        <View style={[Gstyles.row_center, Gstyles.w_100, styles.modalTitleBar, { paddingLeft: 20, paddingRight: 20 }]}>
                            <TouchableOpacity onPress={() => this.setState({ isShowTrackModal: false })}>
                                <Ionicons name="close" size={28} color={constant.C_BLACK_100} />
                            </TouchableOpacity>
                            <Text style={[styles.modalTitleTxt, Gstyles.flex_1]}>Track Meal</Text>
                            <View style={{ width: 26 }} />
                        </View>
                        {/* <View style={styles.border1} /> */}
                    </View>
                }
                style={{ justifyContent: 'flex-end', }}
                modalStyle={{ borderRadius: 0, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            >
                <View
                    style={[{ flex: 1, backgroundColor: constant.C_BLACK_0, }, Gstyles.col_center]}
                >
                    <View style={[Gstyles.row_center, { width: width(95), justifyContent: 'space-between', paddingLeft: 14, paddingRight: 14, height: 50 }]}>
                        <Text style={[{ color: constant.C_BLACK_90, fontSize: 18, fontWeight: '400' }]}>Popcorn (Salt)</Text>
                        <Text style={[{
                            color: this.state.curSettingId == 0 ? constant.C_BLACK_0 : constant.C_BLACK_90,
                            borderColor: this.state.curSettingId == 0 ? constant.C_BLUE_50 : constant.C_BLACK_100,
                            backgroundColor: this.state.curSettingId == 0 ? constant.C_BLUE_50 : constant.C_BLACK_0,
                            fontSize: 18, fontWeight: '400', padding: 4, paddingLeft: 10, paddingRight: 10,
                            borderWidth: 1, borderRadius: 30
                        }]}>288 kcal</Text>
                    </View>
                    <View style={[styles.border1, { width: width(100) }]} />
                    <TouchableOpacity onPress={() => this.setState({ curSettingId: 0 })} style={[Gstyles.row_center, { width: width(95), justifyContent: 'space-between', paddingLeft: 14, paddingRight: 14, height: 50 }]}>
                        <Text style={[{ color: constant.C_BLACK_90, fontSize: 18, fontWeight: '400' }]}>Servings</Text>
                        <Text style={[{ color: this.state.curSettingId == 0 ? constant.C_BLUE_50 : constant.C_BLACK_100, fontSize: 18, fontWeight: '400' }]}>{this.state.curServingSize} Servings</Text>
                    </TouchableOpacity>
                    <View style={[styles.border1, { width: width(100) }]} />
                    {
                        this.state.curSettingId == 0 &&
                        <View style={[{ width: '100%', flex: 1, height: 160, backgroundColor: constant.C_BLACK_10 }, Gstyles.row_center]}>
                            <CustomSwipePicker
                                items={this.servings}
                                onChange={({ index, item }) => {
                                    console.log(`Selected index: ${index}`);
                                    console.log(`Selected item: ${item}`);
                                    this.setState({ curServingSize: item.value })
                                }}
                                initialSelectedIndex={2}
                                height={160}
                                width={200}
                            />
                            <Text style={{ fontSize: 18, color: constant.C_BLUE_50 }}>Servings</Text>
                            <View style={{ width: '100%', height: 1, position: 'absolute', top: 96, backgroundColor: constant.C_BLUE_50 }}></View>
                            <View style={{ width: '100%', height: 1, position: 'absolute', top: 126, backgroundColor: constant.C_BLUE_50 }}></View>
                        </View>
                    }
                    <TouchableOpacity onPress={() => this.setState({ curSettingId: 1 })} style={[Gstyles.row_center, { width: width(95), justifyContent: 'space-between', paddingLeft: 14, paddingRight: 14, height: 50 }]}>
                        <Text style={[{ flex: 1, color: constant.C_BLACK_90, fontSize: 18, fontWeight: '400' }]}>Date:</Text>
                        <Text style={[{ color: this.state.curSettingId == 1 ? constant.C_BLUE_50 : constant.C_BLACK_100, marginRight: 6, fontSize: 18, fontWeight: '400' }]}>{moment(this.state.curTrackDate).format('DD MMM, YYYY')}</Text>
                        {this.state.curSettingId == 0 && this.getMealTimeIcon(this.mealTimes[this.state.curTrackTime])}
                    </TouchableOpacity>
                    <View style={[styles.border1, { width: width(100) }]} />
                    {
                        this.state.curSettingId == 1 &&
                        <View style={[{ width: '100%', flex: 1, height: 160, backgroundColor: constant.C_BLACK_10 }, Gstyles.row_center]}>
                            {/* <DatePicker
                                fadeToColor={'none'}
                                style={{ width: width(100), height: 160, backgroundColor: constant.C_BLACK_10, }}
                                mode='datetime'
                                textColor={constant.C_BLUE_50}
                                date={this.state.curTrackDate}
                                onDateChange={(value) => this.setState({ curTrackDate: value })}
                            /> */}
                            
                            <Picker style={{width : '40%', height: '100%', backgroundColor: constant.C_BLACK_10 }}
                                lineColor={constant.C_BLACK_10} //to set top and bottom line color (Without gradients)
                                selectedValue={this.state.curTrackDateIndex}
                                itemStyle={{ color: constant.C_BLUE_50, fontSize: 18 }}
                                itemSpace={18}
                                onValueChange={(index) => this.setState({curTrackDateIndex : index, curTrackDate: this.state.datepicker_list[index]})}>
                                {this.state.datepicker_list.map((value, i) =>
                                    <PickerItem label={this.getDateString(value)} value={i} key={i} />
                                )}
                            </Picker>
                            <Picker style={{width : '40%',height: '100%', backgroundColor: constant.C_BLACK_10 }}
                                lineColor={constant.C_BLACK_10} //to set top and bottom line color (Without gradients)
                                selectedValue={this.state.curTrackTime}
                                itemStyle={{ color: constant.C_BLUE_50, fontSize: 18 }}
                                itemSpace={18}
                                onValueChange={(index) => this.setState({ curTrackTime: index })}>
                                {this.mealTimes.map((value, i) =>
                                    <PickerItem label={value} value={i} key={i} />
                                )}
                            </Picker>
                            <View style={{ width: '100%', height: 1, position: 'absolute', top: 96, backgroundColor: constant.C_BLUE_50 }}></View>
                            <View style={{ width: '100%', height: 1, position: 'absolute', top: 126, backgroundColor: constant.C_BLUE_50 }}></View>
                        </View>
                    }
                    <View style={[{ width: '80%', },]}>
                        <TouchableOpacity activeOpacity={0.7} style={[styles.modal_addlist_btn, Gstyles.col_center, { marginTop: 12, marginBottom: 12 }]}>
                            <Text style={[{ color: constant.C_BLACK_0, fontSize: 18, fontWeight: '700' }]}>Track</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    _renderEditMealModal = () => {

        const onIncServingSize = () => {
            this.setState({ curServingSize: this.state.curServingSize + 1 })
        }
        const onDecServingSize = () => {
            if (this.state.curServingSize == 0) { return }
            this.setState({ curServingSize: this.state.curServingSize - 1 })
        }

        return (
            <Modal
                visible={this.state.isShowEditModal}
                onTouchOutside={() => this.setState({ isShowEditModal: false })}
                height={height(80)}
                width={1}
                swipeDirection={null}
                swipeThreshold={1000}
                // onSwipeOut={() => this.setState({ isShowEditModal: false })}
                modalTitle={
                    <View style={[Gstyles.w_100,]} >
                        <View style={[Gstyles.row_center, Gstyles.w_100, styles.modalTitleBar,
                        { elevation: 3, backgroundColor: constant.C_BLACK_0, paddingLeft: 20, paddingRight: 20 }]}>
                            <TouchableOpacity onPress={() => this.setState({ isShowEditModal: false })}>
                                {
                                    this.state.isEditMore == true ?
                                        <Feather name="chevron-left" size={28} color={constant.C_BLACK_100} />
                                        : <Ionicons name="close" size={28} color={constant.C_BLACK_100} />
                                }
                            </TouchableOpacity>
                            <Text style={[styles.modalTitleTxt, Gstyles.flex_1]}>
                                {
                                    this.state.isEditMore == true ? 'More details' : 'Meal customization'
                                }
                            </Text>
                            <TouchableOpacity onPress={() => this.setState({ isShowEditModal: false })}>
                                <Text style={{ fontSize: 18, fontWeight: '400', color: constant.C_BLUE_50 }}>Create</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={styles.border1} /> */}
                    </View>
                }
                style={{ justifyContent: 'flex-end', }}
                modalStyle={{ borderRadius: 0, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            >
                <View
                    style={[{ flex: 1, backgroundColor: constant.C_BLACK_0, padding: 16, }, Gstyles.col_center]}
                >
                    {
                        this.state.isEditMore == false ?
                            <ScrollView style={[Gstyles.flex_1, { width: '100%' }]}>
                                <ImageBackground source={this.state.foodItem.photo} borderRadius={20} style={{ width: '100%', height: 200, borderRadius: 20, resizeMode: 'cover' }}>
                                </ImageBackground>
                                <View style={[Gstyles.col_center, { alignItems: 'flex-end', paddingRight: 20, width: '100%' }]}>
                                    <View style={[Gstyles.col_center, styles.calorie_view]}>
                                        <Text style={styles.calorie_txt}>288 kcal</Text>
                                    </View>
                                </View>
                                <View style={[Gstyles.row_center, styles.nameinputview]}>
                                    <AntDesign name='edit' size={20} color={constant.C_BLUE_50} />
                                    <Input
                                        placeholder={'Name your meal'}
                                        placeholderTextColor={constant.C_BLACK_30}
                                        containerStyle={{ flex: 1, marginLeft: 8, height: 35, paddingTop: 3 }}
                                        inputContainerStyle={{
                                            width: '100%', height: 35, borderWidth: 0, borderColor: constant.C_BLACK_0
                                        }}
                                        inputStyle={{ color: constant.C_BLACK_100, fontSize: 18, fontWeight: '500', }}
                                    />
                                </View>
                                <View style={[Gstyles.col_center, Gstyles.w_100]}>
                                    <View style={[Gstyles.row_center, styles.mealItemsView]}>
                                        <Svg_fruit width={24} height={24} />
                                        <Text style={{ flex: 1, fontSize: 16, color: constant.C_BLACK_80, marginLeft: 8 }}>Meal items</Text>
                                        <TouchableOpacity style={{ padding: 4, borderRadius: 8, borderWidth: 1, borderColor: constant.C_BLUE_50 }}>
                                            <AntDesign name="plus" size={16} color={constant.C_BLUE_50} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[Gstyles.col_center, { width: '100%', paddingLeft: 16 }]}>
                                        {
                                            this.foodList.map((item, index) =>
                                                this._renderMealListItem(item, index)
                                            )
                                        }
                                    </View>
                                </View>
                                <View style={[Gstyles.col_center, Gstyles.w_100]}>
                                    <View style={[Gstyles.row_center, styles.mealItemsView]}>
                                        <Svg_service width={24} height={24} />
                                        <Text style={{ flex: 1, fontSize: 16, color: constant.C_BLACK_80, marginLeft: 8 }}>Serving size</Text>
                                        <TouchableOpacity onPress={() => onDecServingSize()}
                                            style={{ padding: 4, borderRadius: 8, borderWidth: 1, borderColor: constant.C_BLUE_50 }}>
                                            <AntDesign name="minus" size={16} color={constant.C_BLUE_50} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 18, fontWeight: '400', color: constant.C_BLACK_100, marginLeft: 14, marginRight: 14 }}>{this.state.curServingSize}</Text>
                                        <TouchableOpacity onPress={() => onIncServingSize()}
                                            style={{ padding: 4, borderRadius: 8, borderWidth: 1, borderColor: constant.C_BLUE_50 }}>
                                            <AntDesign name="plus" size={16} color={constant.C_BLUE_50} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.border1} />
                                </View>
                                <Spacing height={18} />
                                <NutriInfoPie />
                            </ScrollView>
                            :
                            <ScrollView style={[Gstyles.flex_1, { width: '100%' }]}>
                                <View style={[Gstyles.col_center, Gstyles.w_100]}>
                                    <View style={[Gstyles.row_center, styles.mealItemsView]}>
                                        <Svg_preptime width={20} height={20} />
                                        <Text style={{ flex: 1, fontSize: 16, color: constant.C_BLACK_80, marginLeft: 8 }}>Prep time</Text>
                                        <Input
                                            keyboardType='decimal-pad'
                                            containerStyle={{ width: 100, height: 26, marginRight: 4 }}
                                            inputContainerStyle={{
                                                width: 90, height: 26,
                                                backgroundColor: constant.C_BLACK_0,
                                                borderColor: constant.C_BLACK_30, borderWidth: 1, borderRadius: 4
                                            }}
                                            textAlign='right'
                                            inputStyle={{ color: constant.C_BLACK_100, fontSize: 12, fontWeight: '400', }}
                                            rightIcon={<Text>mins</Text>}
                                        />
                                    </View>
                                    <View style={[Gstyles.row_center, styles.mealItemsView]}>
                                        <Svg_cooktime width={20} height={20} />
                                        <Text style={{ flex: 1, fontSize: 16, color: constant.C_BLACK_80, marginLeft: 8 }}>Cook time</Text>
                                        <Input
                                            keyboardType='decimal-pad'
                                            containerStyle={{ width: 100, height: 26, marginRight: 4 }}
                                            inputContainerStyle={{
                                                width: 90, height: 26,
                                                backgroundColor: constant.C_BLACK_0,
                                                borderColor: constant.C_BLACK_30, borderWidth: 1, borderRadius: 4
                                            }}
                                            textAlign='right'
                                            inputStyle={{ color: constant.C_BLACK_100, fontSize: 12, fontWeight: '400', }}
                                            rightIcon={<Text>mins</Text>}
                                        />
                                    </View>
                                    <Spacing height={12} />
                                    <View style={styles.border1} />
                                    <View style={[Gstyles.row_center, styles.mealItemsView]}>
                                        <Svg_lamp width={20} height={20} />
                                        <Text style={{ flex: 1, fontSize: 16, color: constant.C_BLACK_80, marginLeft: 8 }}>Add Directions</Text>
                                        <TouchableOpacity onPress={() => { }} style={{ marginRight: 12 }}>
                                            <Text style={{ fontSize: 16, fontWeight: '400', color: constant.C_BLUE_50 }}>Add</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TextInput
                                        multiline={true}
                                        value={this.state.direction}
                                        onChangeText={(text) => {
                                            this.setState({ direction: text })
                                        }}
                                        onContentSizeChange={(event) => {
                                            this.setState({ directionInputHeight: event.nativeEvent.contentSize.height })
                                        }}
                                        style={[styles.directionInput, { height: Math.max(230, this.state.directionInputHeight) }]}
                                    />
                                </View>
                            </ScrollView>
                    }
                    {
                        this.state.isEditMore == false &&
                        <View style={[{ width: '100%', },]}>
                            <TouchableOpacity onPress={() => this.setState({ isEditMore: true })} activeOpacity={0.7} style={[styles.modal_addlist_btn, Gstyles.col_center, { marginTop: 12, marginBottom: 12 }]}>
                                <Text style={[{ color: constant.C_BLACK_0, fontSize: 18, fontWeight: '700' }]}>Edit more details</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </Modal>
        )
    }

    onAddShoppingList = () => {
        Toast.show({
            position: 'bottom',
            bottomOffset: 0,
            text1: 'Added to shopping list     View list',
            text2: '',
            visibilityTime: 2000,
            autoHide: false,
            onPress: () => { Toast.hide() }
        });
    }

    onSave2MyMeal = () => {
        Toast.show({
            position: 'bottom',
            bottomOffset: 0,
            text1: 'Meal saved',
            text2: '',
            visibilityTime: 2000,
            autoHide: false,
            onPress: () => { Toast.hide() }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                {this._renderHeader()}
                <View style={styles.formView} >
                    <ScrollView style={{ width: '100%', }} >
                        {this._renderMealInfo()}
                        <View style={{ width: '100%', flexDirection: 'row', paddingLeft: 24, paddingRight: 24 }}>
                            <View style={styles.headerTab}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={[styles.headerTabBtn, this.state.activeTab == 0 ? styles.activeTabBtn : {}]}
                                    onPress={() => this.setState({ activeTab: 0 })}>
                                    <Text style={[styles.headerTabTxt, { color: this.state.activeTab == 0 ? constant.C_BLACK_0 : constant.C_BLACK_60 }]}>Meal items</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={[styles.headerTabBtn, this.state.activeTab == 1 ? styles.activeTabBtn : {}]}
                                    onPress={() => this.setState({ activeTab: 1 })}>
                                    <Text style={[styles.headerTabTxt, { color: this.state.activeTab == 1 ? constant.C_BLACK_0 : constant.C_BLACK_60 }]} >Directions</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[Gstyles.col_center, { width: '100%', marginTop: 20, paddingLeft: 28, paddingRight: 28, paddingBottom: 80, }]} >
                            {/* <Text style={[Gstyles.text_left, styles.descTxt]}>{
                                this.state.activeTab == 0 ? 'Meal items' : 'Directions'
                            }</Text> */}
                            {
                                this.state.activeTab == 0 ? this.foodList.map((item, index) =>
                                    this._renderMealListItem(item, index)
                                )
                                    :
                                    <Text style={{ fontSize: 14, fontWeight: '400', color: constant.C_BLACK_80 }}>
                                        1. Put the oil in a saucepan and wait for the oil to get hot enough. {"\n"}
                                        2. Put the corn in it.{"\n"}
                                        3. Cook over medium heat. Wait for the popping sound to stop, then add salt and stir until blended.{"\n"}
                                        If so, drain and store the popcorn in the container.{"\n"}
                                        4. Ready to be enjoyed.{"\n"}
                                    </Text>
                            }
                        </View>
                        <View style={styles.border1} />
                        <View style={[Gstyles.col_center, { width: '100%', paddingLeft: 24, paddingRight: 24, }]} >
                            <NutriInfoPie />
                        </View>
                        <View style={styles.border1} />
                        <View style={[Gstyles.col_center, { width: '100%', paddingLeft: 24, paddingRight: 24, }]} >
                            <View style={{ width: '100%', padding: 8, marginTop: 8 }}>
                                <TouchableOpacity onPress={() => this.onAddShoppingList()}
                                    style={[Gstyles.row_center, { width: '100%', height: 45, borderRadius: 10, borderWidth: 1, borderColor: constant.C_BLUE_50 }]}>
                                    <Text style={{ fontSize: 14, fontWeight: '700', color: constant.C_BLUE_50, }}>Add to shopping list</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '100%', padding: 8, marginTop: 8 }}>
                                <TouchableOpacity onPress={() => this.onSave2MyMeal()}
                                    style={[Gstyles.row_center, { width: '100%', height: 45, borderRadius: 10, borderWidth: 1, borderColor: constant.C_BLUE_50 }]}>
                                    <Text style={{ fontSize: 14, fontWeight: '700', color: constant.C_BLUE_50, }}>Save to my meal</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Spacing height={30} />
                    </ScrollView>
                </View>
                <View style={[styles.btmbtn_view, Gstyles.row_center]}>
                    <TouchableOpacity onPress={() => this.onSave2MyMeal()} activeOpacity={0.75} style={[styles.btmbtn, Gstyles.col_center, { borderTopLeftRadius: 16 }]} >
                        <Text style={[{ color: constant.C_BLACK_0, fontWeight: '700', fontSize: 16, lineHeight: 18, width: '80%', textAlign: 'center' }]}>Add to</Text>
                        <Text style={[{ color: constant.C_BLACK_0, fontWeight: '700', fontSize: 16, lineHeight: 18, width: '80%', textAlign: 'center' }]}>weekly meal plan</Text>
                    </TouchableOpacity>
                    <View style={{ height: '100%', width: 2, backgroundColor: constant.C_BLACK_0 }}></View>
                    <TouchableOpacity onPress={() => this.setState({ isShowTrackModal: true })} activeOpacity={0.75} style={[styles.btmbtn, Gstyles.row_center, { borderTopRightRadius: 16 }]} >
                        <Text style={[{ color: constant.C_BLACK_0, fontWeight: '700', fontSize: 16, width: '80%', textAlign: 'center' }]}>Track meal</Text>
                    </TouchableOpacity>
                </View>
                {this._renderTrackModal()}
                {this._renderEditMealModal()}
                <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: constant.C_BLACK_0,
    },
    header: {
        backgroundColor: constant.C_BLUE_50, width: '100%', height: 80, paddingLeft: 24,
        paddingRight: 24, paddingTop: 30,
    },
    formView: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%',
    },
    titleTxt: { fontSize: 18, fontWeight: '700', color: constant.C_BLACK_0, textAlign: 'center' },
    descTxt: { width: '100%', color: constant.C_BLACK_40, fontSize: 12, fontWeight: '500', marginBottom: 6 },
    setting_item: { flexDirection: 'column', height: 50, },
    settingItemTxt: { fontSize: 14, fontWeight: '700', color: constant.C_BLACK_90, paddingLeft: 26 },
    border1: { height: 1, backgroundColor: '#E5E5E5', width: '100%' },
    btmbtn_view: { height: 60, width: '100%', marginTop: 4 },
    btmbtn: { backgroundColor: constant.C_BLUE_50, height: '100%', flex: 1, },
    modalTitleBar: { height: 56 },
    modalTitleTxt: { fontSize: 18, fontWeight: '700', color: constant.C_BLACK_100, textAlign: 'center' },
    searchWrap: { height: 40, width: width(95), padding: 0, marginTop: 12, },
    searchBar: { height: 40, elevation: 4, paddingLeft: 16, margin: 0, backgroundColor: constant.C_BLACK_0, borderBottomWidth: 0, borderRadius: 24 },
    searchBarBtn: { height: 31, width: 110, borderRadius: 5 },
    modal_addlist_btn: { backgroundColor: constant.C_BLUE_50, height: 47, width: '100%', borderRadius: 5 },
    headerTab: { height: 60, width: '100%', marginTop: 12, padding: 10, elevation: 2, backgroundColor: constant.C_BLACK_0, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' },
    headerTabBtn: { height: '100%', flex: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    headerTabTxt: { fontSize: 14, fontWeight: '700', },
    activeTabBtn: { backgroundColor: constant.C_BLUE_50 },
    calorie_view: { width: 96, height: 44, marginTop: -25, backgroundColor: constant.C_BLUE_50, borderRadius: 30 },
    calorie_txt: { fontSize: 18, fontWeight: '700', color: constant.C_BLACK_0 },
    // edit modal
    nameinputview: { borderBottomColor: constant.C_BLACK_50, borderBottomWidth: 1, width: '100%', marginTop: 18, paddingBottom: 6 },
    mealItemsView: { paddingTop: 14, paddingBottom: 7 },
    directionInput: {
        width: '100%', borderRadius: 12, borderWidth: 1, borderColor: constant.C_BLACK_30, marginTop: 12,
        textAlignVertical: 'top', padding: 16, fontSize: 14, fontWeight: '400'
    },
});

