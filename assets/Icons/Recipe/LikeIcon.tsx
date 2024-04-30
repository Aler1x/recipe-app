import Svg, { Path } from 'react-native-svg';

type BackIconProps = {
  color?: string;
  filled?: boolean;
};

const BackIcon = ({ color = '#323232', filled = false }: BackIconProps) => {
  return (
    <>
      <Svg
        width="23"
        height="21"
        viewBox="0 0 23 21"
        fill={filled ? color : 'none'}
      >
        <Path
          d="M3.19613 11.6151L9.75245 19.025C10.6811 20.0746 12.3189 20.0746 13.2475 19.025L19.8039 11.6151C21.7556 9.40913 22.7695 6.63503 21.3031 3.9897C19.6089 0.933323 16.5044 0.308643 13.8066 2.36112C12.879 3.06679 12.1176 3.87265 11.7458 4.29074C11.6167 4.43603 11.3833 4.43603 11.2542 4.29074C10.8824 3.87265 10.121 3.06679 9.19338 2.36112C6.49562 0.308643 3.39102 0.933323 1.69682 3.9897C0.230464 6.63503 1.24438 9.40913 3.19613 11.6151Z"
          stroke={color}
          stroke-width="2"
          stroke-linejoin="round"
        />
      </Svg>
    </>
  );
};

export default BackIcon;
