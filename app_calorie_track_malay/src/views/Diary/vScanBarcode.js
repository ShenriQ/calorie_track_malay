import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Input } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';
import { QRScannerView } from 'react-native-qrcode-scanner-view';
// custom import
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
//svgs
import Svg_copy from '../../assets/svgs/ic_copyfile.svg'
import Svg_capture from '../../assets/svgs/ic_capture.svg'
import Svg_refresh from '../../assets/svgs/diary/ic_refresh.svg'

export default class vScanBarcode extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            selectedPage: 0,
            isModal: false,
            result_photo: ''
        }
    }

    componentDidMount = () => {
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            this.setState({ result_photo: data.uri, selectedPage: 1 })
            console.log(data.uri);
        }
    };


    _renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={[{ width: '100%', }, Gstyles.row_center]}>
                    <View style={[Gstyles.flex_1, { flexDirection: 'row', paddingLeft: 20 }]}>
                    </View>
                    <Text style={styles.titleTxt}>Barcode Scanner</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <Ionicons name="close" size={24} color={constant.C_BLACK_100} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    _renderCameraView = () => {
        const barcodeReceived = (event) => { console.log('Type: ' + event.type + '\nData: ' + event.data) };
        return (
            < QRScannerView
                onScanResult={barcodeReceived}
                renderHeaderView={this._renderHeaderView}
                renderFooterView={this._renderCaptureView}
                hintText={null}
                rectStyle={{
                    width: 280, height: 238, borderWidth: 0,
                    borderColor: constant.C_BLACK_0, borderRadius: 40
                }}
                // isShowCorner = {false}    
                scanBarAnimateReverse={true} />
        )
    }

    _renderHeaderView = () => {
        return (
            <View style={[Gstyles.col_center]}>
                <View style={[Gstyles.row_center, styles.headerView]} >
                    <TouchableOpacity style={[Gstyles.col_center, styles.headerviewBtn]}>
                        <Text style={styles.headerviewBtnTxt}>Manual Search</Text>
                    </TouchableOpacity>
                    <View style={{ width: 12 }}></View>
                    <TouchableOpacity style={[Gstyles.col_center, styles.headerviewBtn]}>
                        <Text style={styles.headerviewBtnTxt}>Flash Off</Text>
                    </TouchableOpacity>
                </View>
                <View style={[Gstyles.col_center]}>
                    <Text style={styles.hint}>Place the barcode properly in the box </Text>
                    <Text style={styles.hint}>to scan the product</Text>
                </View>
            </View>
        )
    }

    _renderCaptureView = () => {
        return (
            <View style={[Gstyles.row_center, styles.captureView]} >
                <TouchableOpacity>
                    <Svg_copy />
                </TouchableOpacity>
                <View style={Gstyles.flex_1}></View>
                <TouchableOpacity onPress={() => this.takePicture()}>
                    <Svg_capture />
                </TouchableOpacity>
                <View style={Gstyles.flex_1}></View>
                <TouchableOpacity>
                    <Svg_refresh />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} translucent backgroundColor="transparent" barStyle="light-content" />
                <Spinner visible={this.state.loading} />
                {this._renderHeader()}
                <View style={[Gstyles.flex_1, { width: '100%' }]}>
                    {this._renderCameraView()}
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
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%',
    },
    titleTxt: {
        textAlign: 'center', fontSize: 22, fontWeight: '700', color: constant.C_BLACK_80, marginLeft: 16, marginRight: 16
    },
    preview: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    flashBtn: { position: 'absolute', top: 8, right: 8, borderRadius: 20, padding: 8, paddingLeft: 12, paddingRight: 12, backgroundColor: '#00000033' },
    captureView: { position: 'absolute', bottom: 12, right: 8, paddingLeft: 25, paddingRight: 25, height: 120, width: '100%' },
    headerView: { width: '100%', height: 80, paddingLeft: 20, paddingRight: 20 },
    headerviewBtn: { flex: 1, height: 48, backgroundColor: constant.C_BLACK_0, borderRadius: 10 },
    headerviewBtnTxt: { fontSize: 16, fontWeight: '500', color: constant.C_BLUE_50 },
    hint : {fontSize: 16, color: '#f6f6f688'},
});

