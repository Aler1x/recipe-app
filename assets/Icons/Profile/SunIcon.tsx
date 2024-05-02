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
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={style}
      >
        <Path
          d="M12 1.5V2.66667M12 21.3333V22.5M2.66667 12H1.5M5.36647 5.36647L4.41667 4.41667M18.6335 5.36647L19.5833 4.41667M5.36647 18.6383L4.41667 19.5834M18.6335 18.6383L19.5833 19.5834M22.5 12H21.3333M16.6667 12C16.6667 14.5773 14.5773 16.6667 12 16.6667C9.42267 16.6667 7.33333 14.5773 7.33333 12C7.33333 9.42267 9.42267 7.33333 12 7.33333C14.5773 7.33333 16.6667 9.42267 16.6667 12Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </>
  );
};

export default MailIcon;
