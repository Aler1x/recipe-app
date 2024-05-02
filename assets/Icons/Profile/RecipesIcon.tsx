import { ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type RecipeIconProps = {
  color?: string;
  style?: ViewStyle;
};

const RecipeIcon = ({ color = '#181818', style }: RecipeIconProps) => {
  return (
    <>
      <Svg
        width="20"
        height="19"
        viewBox="0 0 20 19"
        fill="none"
        style={style}
      >
        <Path
          d="M10 9.23413H0.75C0.75 13.8419 6.5485 17.8038 6.5485 17.8038H10"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M3.44215 10.2869C3.44215 13.6831 7.25605 16.1889 7.25605 16.1889"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M10 9.23413H19.25C19.25 13.8419 13.4515 17.8038 13.4515 17.8038H10"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M5.0471 9.23421C4.37405 6.71461 8.87415 4.98251 12.9123 4.44756L13.3069 3.72046L14.899 5.65546L14.0253 5.79781C13.5982 7.20216 11.4579 9.23421 11.4579 9.23421"
          fill={color}
        />
        <Path
          d="M5.0471 9.23421C4.37405 6.71461 8.87415 4.98251 12.9123 4.44756L13.3069 3.72046L14.899 5.65546L14.0253 5.79781C13.5982 7.20216 11.4579 9.23421 11.4579 9.23421"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M14.5384 5.22668L18.614 1.92383C18.8954 1.69578 18.9387 1.28283 18.7106 1.00148C18.4826 0.720077 18.0696 0.676827 17.7883 0.904877L13.7127 4.20773"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M12.9124 4.44751L14.0253 5.79776"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </>
  );
};

export default RecipeIcon;
