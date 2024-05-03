import React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

type DoneIconProps = {
  color?: string;
};

const DoneIcon = ({ color }: DoneIconProps) => {
  return (
    <Svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" >
      <Circle cx="12" cy="12" r="8" fill={color} fill-opacity="0.24"/>
      <Path d="M8.5 11L10.7929 13.2929C11.1834 13.6834 11.8166 13.6834 12.2071 13.2929L19.5 6" stroke="#222222" stroke-width="1.2" stroke-linecap="round"/>
    </Svg>
  )
}

export default DoneIcon;
