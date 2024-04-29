import Svg, { Path } from 'react-native-svg';

type HearthIconProps = {
  color?: string;
  size?: number;
  isFilled?: boolean;
};

const HearthIcon = ({
  color = '#323232',
  size = 26,
  isFilled = false,
}: HearthIconProps) => {
  const fillColor = isFilled ? color : 'none';
  return (
    <>
      <Svg
        width={size}
        height={(size * 24) / 26}
        viewBox="0 0 26 24"
        fill={fillColor}
      >
        <Path
          d="M3.50986 13.2743L11.0028 21.7428C12.0641 22.9423 13.9359 22.9423 14.9972 21.7428L22.4901 13.2743C24.7207 10.7532 25.8795 7.58284 24.2036 4.5596C22.2673 1.0666 18.7193 0.352682 15.6361 2.69838C14.576 3.50486 13.7059 4.42583 13.2809 4.90366C13.1333 5.0697 12.8667 5.0697 12.7191 4.90366C12.2941 4.42583 11.424 3.50486 10.3639 2.69838C7.2807 0.352682 3.7326 1.0666 1.79637 4.5596C0.12053 7.58284 1.27929 10.7532 3.50986 13.2743Z"
          stroke={color}
          stroke-width="2"
          stroke-linejoin="round"
        />
      </Svg>
    </>
  );
};

export default HearthIcon;
