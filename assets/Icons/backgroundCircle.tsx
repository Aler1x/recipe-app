import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';

type BackgroundCircleProps = {
  color?: string;
  style?: StyleProp<ViewStyle>;
};

const BackgroundCircle = ({
  color = 'rgba(147, 190, 103, 0.12)',
  style,
}: BackgroundCircleProps) => {
  return (
    <Svg
      width="430"
      height="507"
      viewBox="0 0 430 507"
      fill="none"
      style={style}
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
