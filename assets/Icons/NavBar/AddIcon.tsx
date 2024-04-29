import Svg, { Path } from 'react-native-svg';

type AddIconProps = {
  color?: string;
};

const AddIcon = ({ color = '#323232' }: AddIconProps) => {
  return (
    <>
      <Svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
      >
        <Path
          d="M7.66667 13H13M13 13H18.3333M13 13V18.3333M13 13V7.66667M13 25C6.37259 25 1 19.6275 1 13C1 6.37259 6.37259 1 13 1C19.6275 1 25 6.37259 25 13C25 19.6275 19.6275 25 13 25Z"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </>
  );
};

export default AddIcon;
