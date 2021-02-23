import React from 'react';
import { BackHandler, View, Text, StyleSheet, ImageBackground, StatusBar, TouchableOpacity, Image, ScrollView, Platform, } from 'react-native';
import { connect } from 'react-redux';
// custom import
import { icons, imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import { user_helper, profile_helper } from '@helper';
import { addUser } from '../../redux/actions';
import { InputCheckbox } from '../../components/Auth/Inputs';
import { RectBtn } from '../../components/Auth/Btns';
import Stepper from '../../components/Auth/Stepper';
import Spacing from '../../components/Global/Spacing';

class vQ10 extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            loading: false,
        }
    }

    componentDidMount(){
        setTimeout(()=>{
            this.props.navigation.navigate('register')
        }, 3000)
    }

    render() {
        return (
            <React.Fragment>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <ScrollView style={styles.container}>
                    <Spacing height={70} />
                    <Stepper index={12} />
                    <Image source={require('../../assets/imgs/auth/16.png')} style={styles.img} />
                    <View style={Gstyles.col_center}>
                        <Text style={styles.title_txt}>Loading 75%</Text>
                        <Text style={styles.desc_txt}>We are now setting up your profile. Meanwhile, get ready to master the right way of eating well!</Text>
                    </View>
                </ScrollView>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', paddingLeft: 25, paddingRight: 25, backgroundColor: constant.C_BLACK_0
    },
    title_txt: { fontSize: 14, fontWeight: '700', color: constant.C_BLACK_100, textAlign: 'center', },
    desc_txt: { fontSize: 10, fontWeight: '500', width: 250, color: constant.C_BLACK_100, textAlign: 'center', marginTop: 6 },
    img_view: { paddingRight: 35 },
    img: { width: '100%', height: 287, resizeMode: 'contain', marginTop: 30, marginBottom: 40 },
});

export default connect(null)(vQ10)