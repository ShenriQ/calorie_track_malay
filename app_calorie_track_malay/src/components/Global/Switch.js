import React from 'react';
import { Switch } from 'react-native-switch';
import {constant} from '../../utils';
 
export const SwitchItem = (props) => (
  <Switch
    value={props.value}
    onValueChange={(val) => props.onValueChange(val)}
    disabled={false}
    activeText={'On'}
    inActiveText={'Off'}
    renderActiveText={false}
    renderInActiveText={false}
    circleSize={24}
    barHeight={28}
    circleBorderWidth={0}
    backgroundActive={constant.C_BLUE_50}
    backgroundInactive={'#A5BEF8'}
    circleActiveColor={constant.C_BLACK_0}
    circleInActiveColor={constant.C_BLACK_0}
    changeValueImmediately={true}
    useNativeDriver={true}
    // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
    innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
    outerCircleStyle={{}} // style for outer animated circle
    switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
    switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
    switchWidthMultiplier={2.2} // multipled by the `circleSize` prop to calculate total width of the Switch
    // switchBorderRadius={26} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
  />
)