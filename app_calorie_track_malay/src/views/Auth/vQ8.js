import React from 'react';
import { BackHandler, View, Text, StyleSheet, ImageBackground, StatusBar, TouchableOpacity, Image, ScrollView, Platform, } from 'react-native';
import { connect } from 'react-redux';
// custom import
import { icons, imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import { user_helper, profile_helper } from '@helper';
import { addUser } from '../../redux/actions';
import { InputCheckbox } from '../../components/Auth/Inputs';
import {RectBtn} from '../../components/Auth/Btns';
import Stepper from '../../components/Auth/Stepper';
import Spacing from '../../components/Global/Spacing';

class vQ8 extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            loading: false,
            option1: false,
            option2: false,
            option3: false,
            option4: false,
            option5: false,
            option6: false,
            option7: false,
        }
    }

    onSelectItem = (index) => {
        if(index == 1) {
            this.setState({option1 : !this.state.option1})
        }
        else if(index == 2) {
            this.setState({option2 : !this.state.option2})
        }
        else if(index == 3) {
            this.setState({option3 : !this.state.option3})
        }
        else if(index == 4) {
            this.setState({option4 : !this.state.option4})
        }
        else if(index == 5) {
            this.setState({option5 : !this.state.option5})
        }
        else if(index == 6) {
            this.setState({option6 : !this.state.option6})
        }
        else if(index == 7) {
            this.setState({option7 : !this.state.option7})
        }
    }

    onGoNext = () => {
        this.props.navigation.navigate('q9')
    }

    render() {
        return (
            <React.Fragment>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <ScrollView style={styles.container}>
                    <Spacing height={70} />
                    <Stepper index={10} />
                    <Image source={require('../../assets/imgs/auth/14.png')} style={styles.img} />
                    <Text style={styles.title_txt}>{Strings["Do you have any medical conditions?"]}</Text>
                    <Text style={styles.desc_txt}>{Strings["(select all that apply)"]}</Text>
                    <View style={[Gstyles.col_center, styles.btn_view]}>
                        <InputCheckbox onPress={()=>this.onSelectItem(1)} checked={this.state.option1} name={"No, I have no med conditions"} />
                        <InputCheckbox onPress={()=>this.onSelectItem(2)} checked={this.state.option2} name={"High blood pressure"} />
                        <InputCheckbox onPress={()=>this.onSelectItem(3)} checked={this.state.option3} name={"High blood sugar"} />
                        <InputCheckbox onPress={()=>this.onSelectItem(4)} checked={this.state.option4} name={"Cholesterol"} />
                        <InputCheckbox onPress={()=>this.onSelectItem(5)} checked={this.state.option5} name={"PCOS, endometriosis.."} />
                        <InputCheckbox onPress={()=>this.onSelectItem(6)} checked={this.state.option6} name={"I am pregnant/ breastfeeding"} />
                        <InputCheckbox onPress={()=>this.onSelectItem(7)} checked={this.state.option7} name={"Other"} />
                    </View>
                    <View style={[Gstyles.col_center, styles.nextbtn_view]}>
                        <RectBtn onPress={this.onGoNext} name={Strings["Next"]} />
                    </View>
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
    desc_txt: { fontSize: 14, fontWeight: '400', color: constant.C_BLACK_50, textAlign: 'center',},
    img_view: { paddingRight: 35 },
    img: { width: '100%', height: 228, resizeMode: 'contain', marginTop : 30, marginBottom : 40 },
    btn_view: { marginTop: 16, },
    nextbtn_view : { marginTop: 30, marginBottom : 30, },
});

export default connect(null)(vQ8)