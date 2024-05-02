import { ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type BookmarkIconProps = {
  color?: string;
  style?: ViewStyle;
};

const BookmarkIcon = ({ color = '#181818', style }: BookmarkIconProps) => {
  return (
    <>
      <Svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
        style={style}
      >
        <Path
          d="M14.8199 1H5.17995C3.04995 1 1.31995 2.74 1.31995 4.86V18.95C1.31995 20.75 2.60995 21.51 4.18995 20.64L9.0699 17.93C9.5899 17.64 10.4299 17.64 10.9399 17.93L15.8199 20.64C17.3999 21.52 18.6899 20.76 18.6899 18.95V4.86C18.6799 2.74 16.9499 1 14.8199 1Z"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M7.58997 10L9.09 11.5L13.09 7.5"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </>
  )
};

export default BookmarkIcon;
