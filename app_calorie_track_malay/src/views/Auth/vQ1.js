import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { connect } from 'react-redux';
// custom import
import {setAnswer} from '../../redux/actions/user';
import { constant, common, Strings, Gstyles } from '../../utils' //'@utils';
import { OutlineBtn } from '../../components/Auth/Btns';
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

    onStartQuery = (answer) => {
        this.props.setAnswer({
            ...this.props.answerInfo,
            goal : answer
        })
        this.props.navigation.navigate('q2')
    }

    render() {
        return (
            <View style={styles.container}>
                <Stepper index={1} />
                <Svg4 width={'100%'} height={200} style={styles.img} />
                <Text style={styles.title_txt}>{Strings["What’s your goal ?"]}</Text>
                <View style={[Gstyles.col_center, styles.btn_view]}>
                    {
                        constant.q_goal.map((item, index) =>
                        <OutlineBtn key={index} onPress={()=>this.onStartQuery(item.key)} name={item.name} />
                        )
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', paddingTop: 70, paddingBottom: 30, paddingLeft: 25, paddingRight: 25, backgroundColor: constant.C_BLACK_0
    },
    title_txt: { fontSize: 14, fontWeight: '500', color: constant.C_BLACK_100, textAlign: 'center', },
    img_view: { paddingRight: 35 },
    img: { width: '100%', height: 200, resizeMode: 'contain', marginTop: 30, marginBottom: 60 },
    btn_view: { marginTop: 30 }
});


const mapStatetoProps=(state)=>{
    return {
        answerInfo : state.user.answerInfo
    }
}
const mapDispatchToProps = {
    setAnswer, 
}
export default connect(mapStatetoProps, mapDispatchToProps)(vQ1);