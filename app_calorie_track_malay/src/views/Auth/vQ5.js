import React from 'react';
import { BackHandler, View, Text, StyleSheet, ImageBackground, StatusBar, TouchableOpacity, Image, ScrollView, Platform, } from 'react-native';
import { connect } from 'react-redux';
// custom import
import { icons, imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import { RectBtn } from '../../components/Auth/Btns';
import { InputAnswer } from '../../components/Auth/Inputs';
import Stepper from '../../components/Auth/Stepper';
import Spacing from '../../components/Global/Spacing';
import SwipePicker from '../../components/Global/SwipePicker';

class vQ5 extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            loading: false,
        }
    }

    weights = [
        {
            value: 73,
            label: '73kg (8%)'
        },
        {
            value: 72.5,
            label: '72.5kg (9%)'
        },
        {
            value: 72,
            label: '72kg (10%)'
        },
        {
            value: 71.5,
            label: '71.5kg (10%)'
        },
        {
            value: 71,
            label: '71kg (11%)'
        }
    ]

    onGoNext = () => {
        this.props.navigation.navigate('q6')
    }

    render() {
        return (
            <React.Fragment>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <View style={styles.container}>
                    <Spacing height={70} />
                    <Stepper index={7} />
                    <Image source={require('../../assets/imgs/auth/11.png')} style={styles.img} />
                    <Text style={styles.title_txt}>{Strings["Set your target weight?"]}</Text>
                    <View style={Gstyles.col_center}>
                        <SwipePicker
                            items={this.weights}
                            onChange={({ index, item }) => {
                                console.log(`Selected index: ${index}`);
                                console.log(`Selected item: ${item}`);
                            }}
                            initialSelectedIndex = {2}
                            height={145}
                            width={250}
                        />
                        <Text style={styles.desc_txt}>{Strings["Set realistic target weight, we recommend no more than 10%."]}</Text>
                    </View>
                    <View style={[Gstyles.col_center, styles.nextbtn_view]}>
                        <RectBtn onPress={this.onGoNext} name={Strings["Next"]} />
                    </View>
                </View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', paddingLeft: 25, paddingRight: 25, backgroundColor: constant.C_BLACK_0
    },
    title_txt: { fontSize: 14, fontWeight: '500', color: constant.C_BLACK_100, textAlign: 'center', },
    desc_txt: { width: 200, fontSize: 10, fontWeight: '400', color: constant.C_BLACK_100, textAlign: 'center', },
    img_view: { width: '100%' },
    img: { width: '100%', height: 250, resizeMode: 'contain', marginTop: 30, marginBottom: 30 },
    nextbtn_view: { marginTop: 30, marginBottom: 30, },
});

export default connect(null)(vQ5)