import React from 'react';
import { View, Text, StyleSheet,StatusBar,} from 'react-native';
import { connect } from 'react-redux';
// custom import
import { constant, Strings, Gstyles } from '../../utils' //'@utils';
import {RectBtn, LinkBtn} from '../../components/Auth/Btns';
//svgs
import Svg1 from '../../assets/svgs/auth/1.svg'

class vSplash extends React.Component {
    constructor(props) {
        super(props);
        
        this.props = props;
        this.state = {
            loading: false,
        }
    }

    componentDidMount = () => {
    }

    onStartQuery=()=>{
        this.props.navigation.navigate('q1')
        // this.props.navigation.navigate('register')
    }
    onGoLogin=()=>{
        this.props.navigation.navigate('login')
    }

    render() {
        return (
            <React.Fragment>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <View style={styles.container}>
                    <Text style={styles.brand_txt}>{constant.app_brand}</Text>
                    <View style={styles.container}>
                        <View style={styles.img_view}>
                            <Svg1 width={'100%'} height={'100%'} style={styles.img}/>
                        </View>
                        <Text style={styles.appname_txt}>{constant.app_name}</Text>
                    </View>
                    <View style={[Gstyles.col_center, styles.btn_view]}>
                        <RectBtn onPress={this.onStartQuery} name={Strings["Get started"]}/>
                        <LinkBtn onPress={this.onGoLogin} name={Strings["I’m already a member"]}/>
                    </View>
                </View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', backgroundColor : constant.C_BLACK_0
    },
    brand_txt : {fontSize : 24, fontWeight : '700', color : constant.C_BLACK_100, marginTop : 70, marginLeft : 20},
    appname_txt : {fontSize:14, fontWeight : '400', color : constant.C_BLACK_100, textAlign : 'center', width : '100%', marginTop : 12},
    img_view : {flex : 1, paddingRight : 35},
    img : {width : '100%', height : '100%', resizeMode : 'contain'},
    btn_view : {marginBottom : 50, marginTop : 65}
});

export default connect(null)(vSplash)