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
import Svg4 from '../../assets/svgs/auth/4.svg'

class vQ1 extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            loading: false,
        }
    }

    onStartQuery = () => {
        this.props.navigation.navigate('q2')
    }

    render() {
        return (
            <React.Fragment>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <View style={styles.container}>
                    <Stepper index={1} />
                    <Svg4 width={'100%'} height={200} style={styles.img}/>
                    <Text style={styles.title_txt}>{Strings["What’s your goal ?"]}</Text>
                    <View style={[Gstyles.col_center, styles.btn_view]}>
                        <OutlineBtn onPress={this.onStartQuery} name={Strings["Lose weight"]} />
                        <OutlineBtn onPress={this.onStartQuery} name={Strings["Maintain weight"]} />
                        <OutlineBtn onPress={this.onStartQuery} name={Strings["Gain weight"]} />
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
    img: { width: '100%', height: 200, resizeMode: 'contain', marginTop : 30, marginBottom : 60 },
    btn_view: { marginTop: 30 }
});

export default connect(null)(vQ1)