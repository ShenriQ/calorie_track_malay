import React from 'react';
import { BackHandler, View, Text, StyleSheet, ImageBackground, StatusBar, TouchableOpacity, Image, ScrollView, Platform, } from 'react-native';
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
import Spacing from '../../components/Global/Spacing';

class vQ7 extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            loading: false,
        }
    }

    onStartQuery = () => {
        this.props.navigation.navigate('q8')
    }

    render() {
        return (
            <React.Fragment>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <ScrollView style={styles.container}>
                    <Spacing height={70} />
                    <Stepper index={9} />
                    <Image source={require('../../assets/imgs/auth/13.png')} style={styles.img} />
                    <Text style={styles.title_txt}>{Strings["Select activity level?"]}</Text>
                    <View style={[Gstyles.col_center, styles.btn_view]}>
                        <OutlineBtn onPress={this.onStartQuery} name={Strings["Sedentary"]} sub_name={"Little to no exercise"}/>
                        <OutlineBtn onPress={this.onStartQuery} name={Strings["Mild"]} sub_name={"Sports 1-3 days per week"}/>
                        <OutlineBtn onPress={this.onStartQuery} name={Strings["Moderate"]} sub_name={"Sports 3-5 days a week"}/>
                        <OutlineBtn onPress={this.onStartQuery} name={Strings["Heavy"]} sub_name={"Sports 6-7 days a week"}/>
                        <OutlineBtn onPress={this.onStartQuery} name={Strings["Extreme"]} sub_name={"Heavy sports & demanding physical job"}/>
                    </View>
                    <Text style={styles.desc_txt}>{Strings["We use this to calculate your calorie target"]}</Text>
                </ScrollView>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', paddingLeft : 25, paddingRight : 25, backgroundColor : constant.C_BLACK_0
    },
    title_txt: { fontSize: 14, fontWeight: '500', color: constant.C_BLACK_100, textAlign: 'center',},
    desc_txt: { width : '100%', fontSize: 10, fontWeight: '400', color: constant.C_BLACK_100, textAlign: 'center', marginBottom : 30 },
    img_view: { paddingRight: 35 },
    img: { width: '100%', height: 229, resizeMode: 'contain', marginTop : 30, marginBottom : 60 },
    btn_view: { marginTop: 16, marginBottom : 16 }
});

export default connect(null)(vQ7)