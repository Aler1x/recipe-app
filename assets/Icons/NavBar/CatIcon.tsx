import { View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type CatIconProps = {
  color?: string;
  style?: ViewStyle;
};

const CatIcon = ({ color = '#323232', style }: CatIconProps) => {
  return (
    <>
      <Svg
        width="21"
        height="27"
        viewBox="0 0 21 27"
        fill="none"
        style={style}
      >
        <Path
          d="M14.506 8.17736C18.7055 3.00063 12.259 3.7073 11.3234 3.23906C10.9946 3.07476 10.6712 1.48848 9.9395 1.85478C8.81279 2.41844 8.90851 5.35256 8.78627 6.33136C8.71991 6.86411 7.97607 7.62693 7.73158 8.17736C7.34133 9.05572 6.91254 10.1005 6.19565 11.1916C5.47885 12.2828 3.98077 13.1287 3.23092 13.9626C0.0396481 17.5098 1.40787 21.6799 4.91159 24.3765C8.45534 27.1039 23.2562 26.086 19.0729 19.8076"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M12.8494 10.5804C13.8894 14.3871 12.3965 18.3625 12.3965 22.09C12.3965 22.5189 13.2477 22.105 13.6648 22.1817"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M7.42114 14.5806C8.2583 14.7038 9.02232 15.3184 9.6149 15.8929C12.5645 18.7528 8.79646 20.6748 8.58777 21.6858C8.54064 21.9144 9.513 22.0719 9.7083 22.0928"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M11.6162 2.05704C12.1849 1.52356 12.2934 2.45732 12.3966 2.97075"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </>
  );
};

export default CatIcon;
