import { ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type MailIconProps = {
  color?: string;
  style?: ViewStyle;
};

const MailIcon = ({ color = '#181818', style }: MailIconProps) => {
  return (
    <>
      <Svg
        width="21"
        height="17"
        viewBox="0 0 21 17"
        fill="none"
        style={style}
      >
        <Path
          d="M11 2H4.2C3.0799 2 2.51984 2 2.09202 2.21799C1.71569 2.40973 1.40973 2.71569 1.21799 3.09202C1 3.51984 1 4.0799 1 5.2V12.8C1 13.9201 1 14.4802 1.21799 14.908C1.40973 15.2843 1.71569 15.5903 2.09202 15.782C2.51984 16 3.0799 16 4.2 16H15.8C16.9201 16 17.4802 16 17.908 15.782C18.2843 15.5903 18.5903 15.2843 18.782 14.908C19 14.4802 19 13.9201 19 12.8V10M1 5L6.45036 8.6336C7.73296 9.4886 8.3743 9.9162 9.0674 10.0824C9.6804 10.2293 10.3196 10.2293 10.9326 10.0824C11.6257 9.9162 12.267 9.4886 13.5496 8.6336M20 3.5C20 4.88071 18.8807 6 17.5 6C16.1193 6 15 4.88071 15 3.5C15 2.11929 16.1193 1 17.5 1C18.8807 1 20 2.11929 20 3.5Z"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </>
  );
};

export default MailIcon;
