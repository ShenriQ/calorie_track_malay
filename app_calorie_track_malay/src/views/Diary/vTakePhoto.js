import React from 'react';
import { BackHandler, View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Input } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';
// custom import
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
//svgs
import Svg_copy from '../../assets/svgs/ic_copyfile.svg'
import Svg_capture from '../../assets/svgs/ic_capture.svg'
import Svg_refresh from '../../assets/svgs/ic_refresh.svg'

export default class vTakePhoto extends React.Component {
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
                        <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                            <Feather name="arrow-left" size={24} color={constant.C_BLACK_100} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titleTxt}>{this.state.selectedPage == 1 ? 'Confirm Photo' : 'Take Photo'}</Text>
                    <View style={[Gstyles.flex_1, Gstyles.row_center, { justifyContent: 'flex-end', paddingRight: 20 }]}>
                        {
                            this.state.selectedPage == 1 &&
                            <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
                                <Text style={{ fontSize: 18, fontWeight: '500', color: constant.C_BLUE_50 }}>Confirm</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        )
    }
    _renderCameraView = () => {
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                onGoogleVisionBarcodesDetected={({ barcodes }) => {
                    console.log(barcodes);
                }}
            />
        )
    }

    _renderCaptureView = () => {
        return (
            <View style={[Gstyles.row_center, { paddingLeft: 25, paddingRight: 25, height: 120, width: '100%' }]} >
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
                {
                    this.state.selectedPage == 0 ?
                        <View style={[Gstyles.flex_1, { width: '100%' }]}>
                            {this._renderCameraView()}
                            <TouchableOpacity style={[Gstyles.row_center, styles.flashBtn]}>
                                <FontAwesome name="flash" color={constant.C_BLACK_0} size={12}/>
                                <Text style={{marginLeft: 3, fontSize: 11, color: constant.C_BLACK_0}}>Flash</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <Image source={{uri: this.state.result_photo}} style={styles.preview} />
                }
                {this._renderCaptureView()}
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
    flashBtn : {position:'absolute', top: 8, right: 8, borderRadius: 20,  padding: 8, paddingLeft:12, paddingRight: 12, backgroundColor: '#00000033'},
});

