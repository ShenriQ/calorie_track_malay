import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
// custom import
import { constant, common, Strings, Gstyles } from '../../utils';

const All_Steps = 12
const Stepper = (props) => {
    return (
        <View style={[styles.stepper, Gstyles.row_center]}>
            <Progress.Bar progress={(1 / All_Steps) * props.index}
                color={constant.C_YELLOW_30} width={null}
                height={2} borderWidth={0}
                unfilledColor={constant.C_BLACK_30} style={[Gstyles.flex_1,]}
            />
            <Text style={styles.step_txt}>Step {props.index}</Text>
        </View>
    )
}

export default Stepper;
const styles = StyleSheet.create({
    stepper: {},
    step_txt : {fontSize : 12, fontWeight : '500', color : constant.C_BLACK_100, marginLeft : 10},
});
