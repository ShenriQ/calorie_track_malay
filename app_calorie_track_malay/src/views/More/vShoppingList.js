import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { width, height } from 'react-native-dimension';
import { Button, Input } from 'react-native-elements';
import { Modal, ModalContent, BottomModal, ModalTitle } from 'react-native-modals';
// custom import
import { icons, tmp_imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import { user_helper, profile_helper } from '@helper';
import Spacing from '../../components/Global/Spacing';
import AboutModal from '../../components/Modals/About';
import SignoutModal from '../../components/Modals/SignOut';

export default class vShoppingList extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            isEdit: false,
            isShowSearchModal: false,
        }
    }

    componentDidMount = () => {
    }

    shoppingList = [{ name: 'Fish' }, { name: 'Chicken' }, { name: 'Potatoes' }, { name: 'Olives' }, { name: 'Bread' },]
    foodList = [{
        name: 'Corn',
        photo: tmp_imgs.apple
    },
    {
        name: 'Butter',
        photo: tmp_imgs.apple
    },
    {
        name: 'Salt',
        photo: tmp_imgs.apple
    },
    ]

    goAddFood = () => {
        this.props.navigation.navigate('add_food')
    }

    _renderHeader = () => {
        return (
            <View style={[Gstyles.row_center, Gstyles.w_100, styles.header]}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Feather name="chevron-left" size={24} color={constant.C_BLACK_0} />
                </TouchableOpacity>
                <Text style={[styles.titleTxt, Gstyles.flex_1]}>Shopping List</Text>
                <TouchableOpacity onPress={() => this.setState({ isEdit: !this.state.isEdit })}>
                    <Text style={[Gstyles.fs_16, { color: constant.C_BLACK_0 }]}>
                        {
                            this.state.isEdit ? "Save" : "Edit"
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    _renderListItem = (data, index) => {
        const onClick = () => {
            if (data.name == 'My Profile & Goals') {
                this.props.navigation.navigate('profile');
            }
            else if (data.name == 'Reminders') {

            }
        }
        return (
            <TouchableOpacity key={index} activeOpacity={0.6} style={styles.setting_item} onPress={() => onClick()}>
                <View style={[Gstyles.row_center, Gstyles.w_100, { height: '100%', paddingRight: 24 }]}>
                    <Text style={[styles.settingItemTxt, Gstyles.flex_1]}>{data.name}</Text>
                    {
                        this.state.isEdit &&
                        <TouchableOpacity activeOpacity={0.6} style={{ padding: 6 }} onPress={() => onClick()}>
                            <FontAwesome5 name="trash" size={18} color={'#FF1457'} />
                        </TouchableOpacity>
                    }
                </View>
                <View style={styles.border1} />
            </TouchableOpacity>
        )
    }

    _renderSearchItem = (data, index) => {
        return (
            <View key={index} style={[styles.setting_item, Gstyles.col_center]} >
                <View style={[Gstyles.row_center, { height: 48, width : width(95), paddingLeft: 14, paddingRight: 14 }]}>
                    <Image source={data.photo} style={{ width: 42, height: 42, borderRadius: 5 }} />
                    <Text style={[Gstyles.flex_1, { color: constant.C_BLACK_100, width: '100%', fontSize: 18, fontWeight: '700', paddingLeft : 12 }]}>{data.name}</Text>
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
            <BottomModal
                visible={this.state.isShowSearchModal}
                onTouchOutside={() => this.setState({ isShowSearchModal: false })}
                height={0.46}
                width={1}
                onSwipeOut={() => this.setState({ isShowSearchModal: false })}
                modalTitle={
                    <View style={[Gstyles.w_100,]} >
                        <View style={[Gstyles.row_center, Gstyles.w_100, styles.modalTitleBar, { paddingLeft: 20, paddingRight: 20 }]}>
                            <TouchableOpacity onPress={() => this.setState({ isShowSearchModal: false })}>
                                <Ionicons name="close" size={28} color={constant.C_BLACK_100} />
                            </TouchableOpacity>
                            <Text style={[styles.modalTitleTxt, Gstyles.flex_1]}>Search Food</Text>
                            <View style={{ width: 26 }} />
                        </View>
                        <View style={styles.border1} />
                    </View>
                }
            >
                <View
                    style={[{ flex: 1, backgroundColor: constant.C_BLACK_0, }, Gstyles.col_center]}
                >
                    <Input
                        placeholder={Strings["What do you want to search?"]} placeholderTextColor={constant.C_BLACK_50}
                        onChangeText={value => this.setState({ pass: value })} errorMessage={this.state.err_pass}
                        inputStyle={{ color: constant.C_BLACK_80, fontSize: 14 }}
                        leftIcon={<Feather name="search" size={18} color={constant.C_BLACK_50} />}
                        inputContainerStyle={styles.searchBar}
                        containerStyle={styles.searchWrap}
                    />
                    <View style={[Gstyles.row_center, { width: width(95), justifyContent: 'space-between', paddingLeft: 14, paddingRight: 14, marginTop: 12, marginBottom: 8 }]}>
                        <TouchableOpacity activeOpacity={0.7} style={[styles.searchBarBtn, Gstyles.col_center, { backgroundColor: constant.C_BLUE_50 }]}>
                            <Text style={[styles.btnTxt, { color: constant.C_BLACK_0, }]}>Frquent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={[styles.searchBarBtn, Gstyles.col_center, { backgroundColor: constant.C_BLACK_0, borderWidth : 1, borderColor : constant.C_RED_50 }]}>
                            <Text style={[styles.btnTxt, { color: constant.C_RED_50, }]}>My Meals</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={[styles.searchBarBtn, Gstyles.col_center, { backgroundColor: constant.C_BLACK_0, borderWidth : 1, borderColor : constant.C_TEAL_50 }]}>
                            <Text style={[styles.btnTxt, { color: constant.C_TEAL_50, }]}>My Foods</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.border1, { width: width(100) }]} />
                    <View style={[{ width: width(100), flex: 1, }, Gstyles.col_center]}>
                        <ScrollView style={{ width: width(100), flex: 1, }} >
                            {
                                this.foodList.map((item, index) =>
                                    this._renderSearchItem(item, index)
                                )
                            }
                        </ScrollView>
                        <View style={[{ width: '80%', },]}>
                            <TouchableOpacity activeOpacity={0.7} style={[styles.modal_addlist_btn, Gstyles.col_center, { marginTop: 12, marginBottom: 12 }]}>
                                <Text style={[{ color: constant.C_BLACK_0, fontSize: 18, fontWeight: '700' }]}>Add to shopping list (0)</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BottomModal>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                {this._renderHeader()}
                <View style={styles.formView} >
                    <ScrollView style={{ width: '100%', maxHeight: (this.shoppingList.length * 50 + 20), }} >
                        {
                            this.shoppingList.map((item, index) =>
                                this._renderListItem(item, index)
                            )
                        }
                        <Spacing height={20} />
                    </ScrollView>
                    <View style={[styles.addbtn_view, Gstyles.col_center_start]}>
                        <TouchableOpacity style={[styles.addbtn, Gstyles.row_center]} onPress={() => this.setState({ isShowSearchModal: true })}>
                            <Text style={[Gstyles.fs_16, { color: constant.C_BLACK_0, marginRight: 8 }]}>Add</Text>
                            <Feather name="plus-circle" size={20} color={constant.C_BLACK_0} />
                        </TouchableOpacity>
                    </View>
                </View>
                {this._renderSearchModal()}
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
    setting_item: { flexDirection: 'column', height: 50, },
    settingItemTxt: { fontSize: 14, fontWeight: '700', color: constant.C_BLACK_90, paddingLeft: 26 },
    border1: { height: 1, backgroundColor: '#E5E5E5', width: '100%' },
    addbtn_view: { flex: 1, minHeight: 80, width: '100%', paddingTop: 20 },
    addbtn: { backgroundColor: constant.C_BLUE_50, height: 40, width: 120, borderRadius: 20 },
    modalTitleBar: { height: 56 },
    modalTitleTxt: { fontSize: 18, fontWeight: '700', color: constant.C_BLACK_100, textAlign: 'center' },
    searchWrap: { height: 40, width: width(95), padding: 0, marginTop: 12, },
    searchBar: { height: 40, elevation: 4, paddingLeft: 16, margin: 0, backgroundColor: constant.C_BLACK_0, borderBottomWidth: 0, borderRadius: 24 },
    searchBarBtn: { height: 31, width: 110, borderRadius: 5 },
    modal_addlist_btn: { backgroundColor: constant.C_BLUE_50, height: 47, width: '100%', borderRadius: 5 },
});

