import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View } from "react-native";
import { LineChart, AbstractChart } from "react-native-chart-kit";
import { height } from 'react-native-dimension';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Rect, Text as TextSVG, Svg, Line, ForeignObject } from 'react-native-svg';
import { values } from 'lodash';
import SVG_StartPos from '../../assets/svgs/ic_startpos.svg';
import SVG_GoalPos from '../../assets/svgs/ic_goalpos.svg';
import SVG_NowPos from '../../assets/svgs/ic_nowpos.svg';

const H = 250
const LineGraph = (props) => {
    let [tooltipPos, setTooltipPos] = useState({
        x: 0,
        y: 0,
        visible: false,
        value: 0,
    });

    let values = [75, 75, 74, 73, 72]
    let start = values[0]
    let now = values[values.length - 1]
    let goal = 70
    let y_step = (3 * goal - goal) / (start - goal)
    
    const originPos = { x: 40, y: 30 }
    const graphH = H - originPos.y - 12
    const realGraphH = H - 60
    const realGraphW = props.width * 0.75
    const goalLineY = (realGraphH - originPos.y - 16) / 3

    const getConvertedData = () => {
        let y_values = []
        values.map((item) => {
            y_values.push(goal + (item - goal) * y_step)
        })
        return y_values
    }

    const Y_origin = (y) => {
        return H - y
    }
    
    const startPos=()=>{
        let startY = goalLineY * 3
        let startX = ((realGraphW - 64)  * (1) ) / values.length + originPos.x

        return {x: startX, y : startY}
    }

    const nowPos=()=>{
        let nowY = (goalLineY * (goal + (now - goal) * y_step)) / goal
        let nowX = ((realGraphW - 64)  * (values.length - 1) ) / values.length + originPos.x

        return {x: nowX, y : nowY}
    }

    return (
        <View style={{ flex: 1, width: props.width, height: H }}>
            <LineChart
                data={{
                    labels: ["", "31 Nov", "7 Dec", "28 Dec", "2 Mac",],
                    datasets: [
                        {
                            data: getConvertedData()
                        }
                    ]
                }}
                width={realGraphW} // from react-native
                height={realGraphH}
                yLabelsOffset={10}
                transparent={true}
                // bezier
                withInnerLines={true}
                withVerticalLines={false}
                withHorizontalLines={false}
                segments={3}
                fromZero={true}
                hidePointsAtIndex={[0,]}
                formatYLabel={(point, index) => {
                    if (point == goal) {
                        return point
                    }
                    if (point == goal * 3) {
                        return start
                    }
                    return ""
                }}
                getDotColor={(point, index) => {
                    return '#ffffffff'
                }}
                chartConfig={{
                    // backgroundColor: "#ffffff",
                    // backgroundGradientFromOpacity : 0,
                    fillShadowGradient: '#fff',
                    fillShadowGradientOpacity: 0.45,
                    // backgroundGradientFrom: "#fb8c00",
                    // backgroundGradientTo: "#ffa726",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => '#fff',
                    strokeWidth : 2,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16, 
                    },
                    propsForDots: {
                        r: "4",
                        strokeWidth: "0",
                        stroke: "#ffa726"
                    },
                    propsForBackgroundLines : {
                        stroke: '#ffffff',
                        strokeWidth: 4,
                    },
                    propsForLabels:{fontWeight : '700', }
                }}
                
                style={{
                    marginTop: (H - realGraphH),
                    marginLeft: -24,
                    // backgroundColor: '#f00',
                }}
                // decorator={() => {
                //     return tooltipPos.visible ? (
                //       <ForeignObject x={tooltipPos.x} y={tooltipPos.y}>
                //         <View
                //           style={{
                //             width: 70,
                //             flexDirection: 'row',
                //             backgroundColor: 'black',
                //           }}>
                //           <MaterialCommunityIcons
                //             name="run"
                //             size={32}
                //             color="rgb(67, 67, 67)"
                //           />
                //           <Text
                //             style={{
                //               color: 'white',
                //               fontSize: 16,
                //               fontWeight: 'bold',
                //               textAnchor: 'middle',
                //             }}>
                //             {tooltipPos.value}
                //           </Text>
                //         </View>
                //       </ForeignObject>
                //     ) : null;
                //   }}
                // onDataPointClick={(data) => {
                //     let isSamePoint = tooltipPos.x === data.x && tooltipPos.y === data.y;

                //     isSamePoint
                //         ? setTooltipPos((previousState) => {
                //             return {
                //                 ...previousState,
                //                 value: data.value,
                //                 visible: !previousState.visible,
                //             };
                //         })
                //         : setTooltipPos({
                //             x: data.x,
                //             value: data.value,
                //             y: data.y,
                //             visible: true,
                //         });
                // }}
            />
            <Svg style={{
                position: 'absolute', top: 0,
                width: props.width,
                height: H,
                // backgroundColor: '#ff000033'
            }}>
                <Line x1={originPos.x} y1={12} x2={originPos.x} y2={Y_origin(originPos.y)} strokeLinecap="round"
                    style={{
                        stroke: 'white',
                        strokeWidth: 1,
                    }}
                />
                <Line x1={originPos.x} y1={Y_origin(originPos.y)} x2={props.width} y2={Y_origin(originPos.y)} strokeLinecap="round"
                    style={{
                        stroke: 'white',
                        strokeWidth: 1,
                    }}
                />
                <Line strokeDasharray="5, 5" x1={originPos.x} y1={Y_origin(originPos.y + goalLineY * 3)} x2={props.width} y2={Y_origin(originPos.y + goalLineY * 3)} strokeLinecap="round"
                    style={{
                        stroke: '#ffffff77',
                        strokeWidth: 1,
                    }}
                />
                <Line strokeDasharray="5, 5" x1={originPos.x} y1={Y_origin(originPos.y + goalLineY)} x2={props.width} y2={Y_origin(originPos.y + goalLineY)} strokeLinecap="round"
                    style={{
                        stroke: '#4FE44C77',
                        strokeWidth: 1,
                    }}
                />
                <ForeignObject x={startPos().x - 17} y={Y_origin(originPos.y + startPos().y) - 34}>
                    <SVG_StartPos width={34} height={34} />
                </ForeignObject>
                <ForeignObject x={nowPos().x - 17} y={Y_origin(originPos.y + nowPos().y) - 34}>
                    <SVG_NowPos width={34} height={34} />
                </ForeignObject>
                <ForeignObject x={props.width - 45} y={Y_origin(originPos.y + goalLineY) - 34}>
                    <SVG_GoalPos width={34} height={34} />
                </ForeignObject>

            </Svg>
            <View style={{position: 'absolute', top : 12, right : 16, padding : 5, borderRadius: 4, borderWidth : 1, borderColor : '#fff'}}>
                <Text style={{fontSize :14, fontWeight: '500', color : '#fff'}}>Unit: {props.unit}</Text>
            </View>
        </View>

    )
}

export default LineGraph;