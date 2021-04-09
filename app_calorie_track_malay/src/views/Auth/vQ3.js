import React from 'react';
import {View, Text, StyleSheet,StatusBar, TouchableOpacity, ScrollView,} from 'react-native';
import { connect } from 'react-redux';
// custom import
import {setAnswer} from '../../redux/actions/user';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import { RectBtn } from '../../components/Auth/Btns';
import Stepper from '../../components/Auth/Stepper';
import Spacing from '../../components/Global/Spacing';
//svg
import Svg6 from '../../assets/svgs/auth/6.svg'
import Svg7 from '../../assets/svgs/auth/7.svg'

class vQ3 extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            loading: false,
            selected: false,
        }
    }

    onSelectItem = () => {
        this.setState({ selected: !this.state.selected })
    }

    onGoNext = () => {
        this.props.setAnswer({
            ...this.props.answerInfo,
            isGetReminder : this.state.selected
        })
        this.props.navigation.navigate('q4')
    }

    render() {
        return (
            <React.Fragment>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <ScrollView style={styles.container}>
                    <Spacing height={70} />
                    <Stepper index={3} />
                    {
                        this.state.selected ?
                            <TouchableOpacity onPress={this.onSelectItem} style={styles.img_view} activeOpacity={0.8}>
                                <Svg7 width={'100%'} height={312} style={styles.img} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={this.onSelectItem} style={styles.img_view} activeOpacity={0.8}>
                                <Svg6  width={'100%'} height={312} style={styles.img} />
                            </TouchableOpacity>
                    }
                    <Text style={styles.title_txt}>{Strings["Get reminders about your diet tracking and health tips"]}</Text>
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
    title_txt: { fontSize: 14, fontWeight: '500', color: constant.C_BLACK_100, textAlign: 'center', paddingLeft: '15%', paddingRight: '15%' },
    desc_txt: { fontSize: 14, fontWeight: '400', color: constant.C_BLACK_50, textAlign: 'center', },
    img_view: { width: '100%' },
    img: { width: '100%', height: 312, resizeMode: 'contain', marginTop: 30, marginBottom: 45 },
    nextbtn_view: { marginTop: 30, marginBottom: 30, },
});

const mapStatetoProps=(state)=>{
    return {
        answerInfo : state.user.answerInfo
    }
}
const mapDispatchToProps = {
    setAnswer, 
}
export default connect(mapStatetoProps, mapDispatchToProps)(vQ3);