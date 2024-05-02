import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';

type BackgroundCircleProps = {
  color?: string;
  style?: StyleProp<ViewStyle>;
};

const BackgroundCircle = ({
  color = 'rgba(147, 190, 103, 0.12)',
  style,
}: BackgroundCircleProps) => {
  const defaults = StyleSheet.create({
    circle : {
      position: 'absolute',
      zIndex: -1,
    }
  });

  return (
    <Svg
      width="946"
      height="859"
      viewBox="0 0 946 859"
      fill="none"
      style={[defaults.circle, style]}
    >
      <Ellipse
        cx="373"
        cy="429.5"
        rx="473"
        ry="429.5"
        fill={color}
        fillOpacity="1"
      />
    </Svg>
  );
};

export default BackgroundCircle;
