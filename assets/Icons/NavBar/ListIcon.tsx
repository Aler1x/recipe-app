import Svg, { Path } from 'react-native-svg';

type ListIconProps = {
  color?: string;
};

const ListIcon = ({ color = '#323232' }: ListIconProps) => {
  return (
    <>
      <Svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
      >
        <Path
          d="M22.3333 1H8.99996C6.4858 1 5.22872 1 4.44768 1.78105C3.66663 2.56209 3.66663 3.81917 3.66663 6.33333V11V19.6667"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M15.6666 19.6667V22.3333C15.6666 23.8061 16.8605 25 18.3333 25C19.8061 25 21 23.8061 21 22.3333V9V3C21 1.89543 21.8954 1 23 1C24.1045 1 25 1.89543 25 3C25 4.10457 24.1045 5 23 5H21.6666"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M18.3333 25H3.66667C2.19391 25 1 23.8061 1 22.3333C1 20.8605 2.19391 19.6666 3.66667 19.6666H15.6667"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M9 6.33337H15.6667"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M9 11.6666H15.6667"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </>
  );
};

export default ListIcon;
