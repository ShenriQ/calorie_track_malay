import React from 'react';
import { BackHandler, View, Text, StyleSheet, ImageBackground, StatusBar, TouchableOpacity, Image, ScrollView, Platform, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
// custom import
import { icons, imgs } from '@assets';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import { RectBtn } from '../../components/Auth/Btns';
import { InputAnswer } from '../../components/Auth/Inputs';
import Stepper from '../../components/Auth/Stepper';
import Spacing from '../../components/Global/Spacing';
//svg
import Svg8 from '../../assets/svgs/auth/8.svg'
import Svg9 from '../../assets/svgs/auth/9.svg'
import Svg10 from '../../assets/svgs/auth/10.svg'

class vQ5 extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            loading: false,
            index: 0,
            ans1: '',
            ans2: '',
            ans3: '',
        }
    }

    q_items = [
        {
            index: 5,
            img: <Svg8 width={'100%'} height={162} style={styles.img} />,
            question: 'How old are you?',
            desc: 'We asked your age to estimate how many calories your body needs each day'
        },
        {
            index: 6,
            img: <Svg9 width={'100%'} height={162} style={styles.img} />,
            question: 'How tall are you?',
            desc: 'We asked your height and weight to calculate a suitable goal weight range for you'
        },
        {
            index: 7,
            img: <Svg10 width={'100%'} height={162} style={styles.img} />,
            question: 'What’s your weight?',
            desc: 'We asked your height and weight to calculate a suitable goal weight range for you'
        }
    ]

    onChangeValue = (value) => {
        if(this.state.index == 0) {
            this.setState({ ans1: value })
        }
        else if(this.state.index == 1) {
            this.setState({ ans2: value })
        }
        else if(this.state.index == 2) {
            this.setState({ ans3: value })
        }
    }

    onGoNext = () => {
        if(this.state.index == 2) {
            this.props.navigation.navigate('q6')
        }
        else {
            this.setState({index : this.state.index + 1})
        }
    }

    getValue=()=>{
        if(this.state.index == 0) {
            return this.state.ans1
        }
        else if(this.state.index == 1) {
            return this.state.ans2
        }
        else if(this.state.index == 2) {
            return this.state.ans3
        }
    }

    render() {
        return (
            <React.Fragment>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <ScrollView style={styles.container}>
                    <Spacing height={70} />
                    <Stepper index={this.q_items[this.state.index].index} />
                    {this.q_items[this.state.index].img}
                    <Text style={styles.q_txt}>{this.q_items[this.state.index].question}</Text>
                    <View style={Gstyles.col_center}>
                        <InputAnswer onChange={(text) => this.onChangeValue(text)} 
                            value={this.getValue()} 
                            placeholder={''} />
                        <Text style={styles.desc_txt}>{this.q_items[this.state.index].desc}</Text>
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
        flex: 1, flexDirection: 'column', paddingLeft: 25, paddingRight: 25, backgroundColor: constant.C_BLACK_0
    },
    q_txt: { fontSize: 14, fontWeight: '500', color: constant.C_BLACK_100, textAlign: 'center', marginBottom: 30 },
    desc_txt: { width : 250, fontSize: 10, fontWeight: '400', color: constant.C_BLACK_100, textAlign: 'center', },
    img_view: { width: '100%' },
    img: { width: '100%', height: 162, resizeMode: 'contain', marginTop: 30, marginBottom: 30 },
    nextbtn_view: { marginTop: 30, marginBottom: 30, },
});

export default connect(null)(vQ5)