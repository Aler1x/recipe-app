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
          d="M1.87369 11.6308C1.87369 17.4298 6.5747 22.1308 12.3737 22.1308C16.7921 22.1308 20.573 19.4017 22.1229 15.5374C20.9136 16.0234 19.5902 16.2974 18.207 16.2974C12.408 16.2974 7.70702 11.5964 7.70702 5.79738C7.70702 4.42067 7.97692 3.08974 8.45861 1.88501C4.59872 3.43705 1.87369 7.2157 1.87369 11.6308Z"
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
