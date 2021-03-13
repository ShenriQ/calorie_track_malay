import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
import NutriInfo from '../../components/Global/NutriInfo';

const toastConfig = {
    success: ({ text1, ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: constant.C_BLACK_0, borderLeftWidth : 0, justifyContent : 'center', alignItems : 'center', height : 54, padding: 0 }}
        contentContainerStyle={{ paddingHorizontal: 0, height : 54, backgroundColor : constant.C_RED_50, justifyContent : 'center', alignItems : 'center'  }}
        text1Style={{
          fontSize: 18,
          color: constant.C_BLACK_0,
          fontWeight: '700',
          textAlign:'center',
          width :'100%',
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
            isShowSearchModal: false,
            date: new Date(),
            selectedFilter : 0,
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
    }



    shoppingList = [{ name: 'Fish' }, { name: 'Chicken' }, { name: 'Potatoes' }, { name: 'Olives' }, { name: 'Bread' },]
    foodList = [{ name: 'Corn', unit: '1 piece', photo: tmp_imgs.apple, qty: '12 kcal' },
        { name: 'Butter', unit: '1 teaspoon', photo: tmp_imgs.apple, qty: '7 kcal' },
        { name: 'Salt', unit: '1 teaspoon', photo: tmp_imgs.apple, qty: '5 kcal' },]
    mealTimes=['Breakfast', 'Lunch', 'Dinner', 'Snack']

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
                <View style={[Gstyles.col_center, { padding: 12, paddingLeft: 24, paddingRight: 24, width: '100%' }]} >
                    <Text style={[Gstyles.text_left, styles.descTxt]}>Created by</Text>
                    <View style={[Gstyles.row_center, { height: 48, width: width(95), paddingLeft: 14, paddingRight: 14 }]}>
                        <TouchableOpacity activeOpacity={0.7} >
                            <Image source={this.state.foodItem.user.photo} style={{ width: 32, height: 32, borderRadius: 32, resizeMode: 'cover' }}></Image>
                        </TouchableOpacity>
                        <Text style={[Gstyles.flex_1, { color: constant.C_BLUE_50, width: '100%', fontSize: 14, fontWeight: '700', paddingLeft: 8 }]}>{this.state.foodItem.user.name}</Text>
                        <Text style={[{ color: constant.C_BLACK_100, fontSize: 14, fontWeight: '500', paddingLeft: 8 }]}>1733 saved</Text>
                    </View>
                </View>
                <View style={styles.border1} />
            </View>
        )
    }

    _renderMealListItem = (data, index) => {
        return (
            <TouchableOpacity key={index} style={[Gstyles.row_center, { height: 48, width: '100%', marginTop: 6, marginBottom: 6 }]}>
                <Image source={data.photo} style={{ width: 46, height: 46, borderRadius: 5 }} />
                <View style={[Gstyles.col_center, Gstyles.flex_1, { paddingLeft: 12 }]}>
                    <Text style={[Gstyles.text_left, { color: constant.C_BLACK_100, fontSize: 14, fontWeight: '700', }]}>{data.name}</Text>
                    <Text style={[Gstyles.text_left, { color: constant.C_BLACK_100, fontSize: 10, fontWeight: '500', }]}>{data.unit}</Text>
                </View>
                <Text style={{ color: constant.C_BLACK_100, fontSize: 14, fontWeight: '500', paddingLeft: 12 }}>{data.qty}</Text>
            </TouchableOpacity>
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

    _renderSearchModal = () => {
        return (
            <Modal
                visible={this.state.isShowSearchModal}
                onTouchOutside={() => this.setState({ isShowSearchModal: false })}
                height={height(90) > 400 ? 400 : height(90)}
                width={1}
                swipeDirection={null}
                swipeThreshold={1000}
                // onSwipeOut={() => this.setState({ isShowSearchModal: false })}
                modalTitle={
                    <View style={[Gstyles.w_100,]} >
                        <View style={[Gstyles.row_center, Gstyles.w_100, styles.modalTitleBar, { paddingLeft: 20, paddingRight: 20 }]}>
                            <TouchableOpacity onPress={() => this.setState({ isShowSearchModal: false })}>
                                <Ionicons name="close" size={28} color={constant.C_BLACK_100} />
                            </TouchableOpacity>
                            <Text style={[styles.modalTitleTxt, Gstyles.flex_1]}>Select date & time</Text>
                            <View style={{ width: 26 }} />
                        </View>
                        <View style={styles.border1} />
                    </View>
                }
                style={{justifyContent: 'flex-end', }}
                modalStyle={{borderRadius : 0, borderTopLeftRadius : 12, borderTopRightRadius: 12}}
            >
                <View
                    style={[{ flex: 1, backgroundColor: constant.C_BLACK_0, }, Gstyles.col_center]}
                >
                    <View style={[styles.border1, { width: width(100) }]} />
                    <View style={[Gstyles.row_center, { width: width(95), justifyContent: 'space-between', paddingLeft: 14, paddingRight: 14, height: 50 }]}>
                        <Text style={[{ color: constant.C_BLACK_90, fontSize: 18, fontWeight: '400' }]}>Date:</Text>
                        <Text style={[{ color: constant.C_BLACK_90, fontSize: 18, fontWeight: '400' }]}>{moment(this.state.date).format('DD MMM, YYYY')}</Text>
                    </View>
                    <View style={[styles.border1, { width: width(100) }]} />
                    <View style={[{ width: width(100), flex: 1, }, Gstyles.col_center]}>
                        <View style={[{ width: '100%', flex: 1, height : 160, backgroundColor :constant.C_BLACK_10 }, Gstyles.row_center]}>
                            <DatePicker
                                fadeToColor={'none'}
                                style={{ width: width(100), height:160, backgroundColor: constant.C_BLACK_10, }}
                                mode='datetime'
                                textColor={constant.C_BLUE_50}
                                date={this.state.date}
                                onDateChange={(value) => this.setState({ date: value })}
                            />
                            <Picker style={{position: 'absolute', left : '50%', top:0,  width: width(50), height: '100%',  backgroundColor: constant.C_BLACK_10 }}
                                lineColor={constant.C_BLUE_50} //to set top and bottom line color (Without gradients)
                                selectedValue={this.state.selectedFilter}
                                itemStyle={{ color: constant.C_BLUE_50, fontSize: 18 }}
                                itemSpace = {18}
                                onValueChange={(index) => this.setState({ selectedFilter: index })}>
                                {this.mealTimes.map((value, i) => 
                                    <PickerItem label={value} value={i} key={i} />
                                )}
                            </Picker>
                        </View>
                        <View style={[{ width: '80%', },]}>
                            <TouchableOpacity activeOpacity={0.7} style={[styles.modal_addlist_btn, Gstyles.col_center, { marginTop: 12, marginBottom: 12 }]}>
                                <Text style={[{ color: constant.C_BLACK_0, fontSize: 18, fontWeight: '700' }]}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    onAddShoppingList=()=>{
        Toast.show({
            position : 'top',
            text1: 'Items added to shopping list',
            text2: '',
            visibilityTime: 2000,
            onPress : ()=>{Toast.hide()}
        });
    }

    onSave2MyMeal=()=>{
        Toast.show({
            position : 'top',
            text1: 'Meal saved',
            text2: '',
            visibilityTime: 2000,
            onPress : ()=>{Toast.hide()}
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
                            <Text style={[Gstyles.text_left, styles.descTxt]}>{
                                this.state.activeTab == 0 ? 'Meal items' : 'Directions'
                            }</Text>
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
                            <NutriInfo />
                        </View>
                        <View style={styles.border1} />
                        <View style={[Gstyles.col_center, { width: '100%', paddingLeft: 24, paddingRight: 24, }]} >
                            <View style={{ width: '100%', padding: 8, marginTop: 8 }}>
                                <TouchableOpacity onPress={() => this.onAddShoppingList()}
                                    style={[Gstyles.row_center, { width: '100%', paddingTop: 6, paddingBottom: 6, borderRadius: 10, borderWidth: 1, borderColor: constant.C_BLUE_50 }]}>
                                    <Text style={{ fontSize: 14, fontWeight: '700', color: constant.C_BLUE_50, }}>Add to shopping list</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Spacing height={30} />
                    </ScrollView>
                </View>
                <View style={[styles.btmbtn_view, Gstyles.row_center]}>
                    <TouchableOpacity onPress={()=>this.onSave2MyMeal()} activeOpacity={0.75} style={[styles.btmbtn, Gstyles.row_center, { borderTopLeftRadius: 16 }]} >
                        <Text style={[Gstyles.fs_18, { color: constant.C_BLACK_0, fontWeight: '700' }]}>Save to my meal</Text>
                    </TouchableOpacity>
                    <View style={{ height: '100%', width: 2, backgroundColor: constant.C_BLACK_0 }}></View>
                    <TouchableOpacity onPress={() => this.setState({ isShowSearchModal: true })} activeOpacity={0.75} style={[styles.btmbtn, Gstyles.row_center, { borderTopRightRadius: 16 }]} >
                        <Text style={[Gstyles.fs_18, { color: constant.C_BLACK_0, fontWeight: '700' }]}>Copy to diary</Text>
                    </TouchableOpacity>
                </View>
                {this._renderSearchModal()}
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
});

