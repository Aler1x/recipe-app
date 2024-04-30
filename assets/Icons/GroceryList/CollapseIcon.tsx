import Svg, { Path } from 'react-native-svg';

type CollapseClosedIconProps = {
  color?: string;
  open?: boolean;
};

const CollapseIcon = ({ color = '#F3F3F3', open = false }: CollapseClosedIconProps) => {
  return (
    <>
      <Svg
        rotation={open ? 0 : 270}
        width="13"
        height="7"
        viewBox="0 0 13 7"
        fill="none"
      >
        <Path
          d="M7.17585 6.38027C6.79349 6.73088 6.20651 6.73088 5.82415 6.38027L1.03312 1.98704C0.360988 1.37072 0.797034 0.25 1.70896 0.25L11.291 0.25C12.203 0.25 12.639 1.37072 11.9669 1.98704L7.17585 6.38027Z"
          fill={color}
        />
      </Svg>
    </>
  );
};

export default CollapseIcon;
