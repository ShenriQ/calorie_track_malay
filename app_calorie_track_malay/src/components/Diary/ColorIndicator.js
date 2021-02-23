import React from 'react';
import {View, StyleSheet} from 'react-native';
// custom import
import { icons, imgs } from '@assets';
import { constant, common, Strings } from '../../utils';


export default class ColorIndicator extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <View style={[styles.view, { backgroundColor: this.props.color }]}></View>
        );
    }
}

const styles = StyleSheet.create({
    view: { width: 18, height: 18, borderRadius: 5, },
});
