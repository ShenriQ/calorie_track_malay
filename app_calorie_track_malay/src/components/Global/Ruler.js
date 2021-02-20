import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import Carousel from 'react-native-snap-carousel';
// custom import
import { constant, common, lang, Gstyles } from '../../utils' //'@utils';

let that = null
export default class vRuler extends React.Component {

    constructor(props) {
        super(props);
        that = this
        this.props = props;

        this.state = {
            activeIndex: 1,
            carouselItems: [
                {
                    name: "Small",
                    value: 1,
                },
                {
                    name: "Medium",
                    value: 2,
                },
                {
                    name: "Big",
                    value: 3,
                },
                {
                    name: "Jumbo",
                    value: 4,
                },
            ]
        }
    }

    componentDidMount = () => {
    }

    onSelect = (index) => {
        this.setState({ activeIndex: index })
        this.props.onSelect(this.state.carouselItems[index])
    }

    _renderItem({ item, index }) {
        return (
            <View key={index} style={{
                height: 100, flexDirection: 'row'
            }}>
                <View style={styles.small_scale}></View>
                <View style={[Gstyles.col_center, Gstyles.flex_1]}>
                    {
                        index != that.state.activeIndex ?
                            <View style={styles.big_scale} />
                            :
                            <View style={Gstyles.col_center}>
                                <View style={{
                                    backgroundColor: constant.C_BLUE_50, width: 35, height: 35,
                                    // transform: [{ rotate: "45deg"}]
                                    transform: [{ rotateY: "45deg" }, { rotateZ: "45deg" }]
                                }}>
                                </View>
                                <View style={{ width: 4, height: 35, backgroundColor: constant.C_BLUE_50 }} />
                            </View>
                    }
                    <Text style={{
                        fontSize: 20, fontWeight: '700',
                        marginTop: 8, marginBottom: 12,
                        color: index != that.state.activeIndex ? constant.C_BLACK_30 : constant.C_BLUE_50
                    }}>
                        {item.value}
                    </Text>
                    <Text style={{
                        fontSize: 12, fontWeight: '400',
                        color: index != that.state.activeIndex ? constant.C_BLACK_30 : constant.C_BLUE_50
                    }}>
                        {item.name}
                    </Text>
                </View>
                <View style={styles.small_scale}></View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Carousel
                    // containerCustomStyle={{width : '100%'}}
                    layout={"default"}
                    ref={ref => this.carousel = ref}
                    data={this.state.carouselItems}
                    sliderWidth={this.state.carouselItems.length * 100 + 10}
                    itemWidth={100}
                    firstItem={this.state.activeIndex}
                    renderItem={this._renderItem}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1.0}
                    // inactiveSlideShift={-5}
                    useScrollView={false}
                    activeSlideAlignment={'center'}
                    onBeforeSnapToItem={index => this.onSelect(index)}
                    onSnapToItem={index => this.onSelect(index)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { width: '100%', height: 140, backgroundColor: constant.C_BLACK_10, flexDirection: 'row', justifyContent: 'center' },
    small_scale: { width: 2, height: 19, backgroundColor: constant.C_BLACK_20 },
    big_scale: { width: 4, height: 70, backgroundColor: constant.C_BLACK_20 },
});
