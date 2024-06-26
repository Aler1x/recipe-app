import Svg, { Path, G } from 'react-native-svg';

type AddIconProps = {
  color?: string;
};

const AddIcon = ({ color = '#323232' }: AddIconProps) => {
  return (
    <Svg width="28" height="28" viewBox="2 2 20 20" fill="none">
      <Path
        d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default AddIcon;
