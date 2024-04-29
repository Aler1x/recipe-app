import Svg, { Path } from 'react-native-svg';

type HomeIconProps = {
  color?: string;
};

const HomeIcon = ({ color = '#323232' }: HomeIconProps) => {
  return (
    <>
      <Svg
        width="26"
        height="29"
        viewBox="0 0 26 29"
        fill="none"
      >
        <Path
          d="M1 12.4454C1 10.9024 1.71236 9.4459 2.9303 8.49862L9.9303 3.05417C11.7358 1.64985 14.2642 1.64985 16.0697 3.05417L23.0697 8.49862C24.2876 9.4459 25 10.9024 25 12.4454V24.6666C25 25.3739 24.719 26.0521 24.219 26.5522C23.7189 27.0523 23.0406 27.3333 22.3333 27.3333H3.66667C2.95942 27.3333 2.28115 27.0523 1.78105 26.5522C1.28095 26.0521 1 25.3739 1 24.6666V12.4454Z"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M9 27.3333V18C9 15.7909 10.7909 14 13 14V14C15.2091 14 17 15.7909 17 18V27.3333"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </>
  );
};

export default HomeIcon;
