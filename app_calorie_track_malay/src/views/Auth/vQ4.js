import React from 'react';
import { BackHandler, View, Text, StyleSheet, ImageBackground, StatusBar, TouchableOpacity, Image, TextInput, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Button, Input } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';
import { connect } from 'react-redux';
// custom import
import { icons, imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import { RectBtn, LinkBtn, OutlineBtn } from '../../components/Auth/Btns';
import Stepper from '../../components/Auth/Stepper';
//svg
import Svg17 from '../../assets/svgs/auth/17.svg'

class vQ4 extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            loading: false,
        }
    }

    onStartQuery = () => {
        this.props.navigation.navigate('q5')
    }

    render() {
        return (
            <React.Fragment>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <View style={styles.container}>
                    <Stepper index={4} />
                    <Svg17 width={'100%'} height={240} style={styles.img}/>
                    <Text style={styles.title_txt}>{"What is your gender?"}</Text>
                    <View style={[Gstyles.col_center, styles.btn_view]}>
                        <OutlineBtn onPress={this.onStartQuery} name={"Male"} />
                        <OutlineBtn onPress={this.onStartQuery} name={"Female"} />
                    </View>
                </View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', paddingTop : 70, paddingBottom : 30, paddingLeft : 25, paddingRight : 25, backgroundColor : constant.C_BLACK_0
    },
    title_txt: { fontSize: 14, fontWeight: '500', color: constant.C_BLACK_100, textAlign: 'center',},
    img_view: { paddingRight: 35 },
    img: { width: '100%', height: 240, resizeMode: 'contain', marginTop : 30, marginBottom : 60 },
    btn_view: { marginTop: 30 }
});

export default connect(null)(vQ4)