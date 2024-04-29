import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';

type BackgroundCircleProps = {
  color?: string;
  size?: number[];
  style?: StyleProp<ViewStyle>;
};

const BackgroundCircle = ({
  color = 'rgba(147, 190, 103, 0.12)',
  size = [373, 429.5, 473, 429.5],
  style,
}: BackgroundCircleProps) => {
  const [cx, cy, rx, ry] = size;
  const viewBox = `0 0 ${cx + rx} ${cy + ry}`;
  return (
    <Svg
      width={cx + rx}
      height={cy + ry}
      viewBox={viewBox}
      fill="none"
      style={style}
    >
      <Ellipse
        cx={cx.toString()}
        cy={cy.toString()}
        rx={rx.toString()}
        ry={ry.toString()}
        fill={color}
        fillOpacity="1"
      />
    </Svg>
  );
};

export default BackgroundCircle;
