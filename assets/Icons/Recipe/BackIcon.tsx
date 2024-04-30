import Svg, { Path } from 'react-native-svg';

type BackIconProps = {
  color?: string;
};

const BackIcon = ({ color = '#323232' }: BackIconProps) => {
  return (
    <>
      <Svg
        width="9"
        height="15"
        viewBox="0 0 9 15"
        fill="none"
      >
        <Path
          d="M7.7893 1.20696C7.3988 0.81643 6.7657 0.81643 6.3751 1.20696L1.48768 6.09918C0.70729 6.88038 0.7076 8.14618 1.48837 8.92688L6.3787 13.8173C6.7693 14.2078 7.4024 14.2078 7.793 13.8173C8.1835 13.4268 8.1835 12.7936 7.793 12.4031L3.6073 8.21738C3.21678 7.82688 3.21678 7.19378 3.6073 6.80318L7.7893 2.62117C8.1799 2.23065 8.1799 1.59748 7.7893 1.20696Z"
          fill={color}
        />
      </Svg>
    </>
  );
};

export default BackIcon;
